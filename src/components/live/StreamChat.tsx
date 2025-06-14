
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  message_type: string;
  donation_amount?: number;
  is_moderator?: boolean;
  is_highlighted?: boolean;
  created_at: string;
  profiles?: {
    full_name?: string;
    username?: string;
  };
}

interface StreamChatProps {
  streamId: string;
  isCreator?: boolean;
}

const StreamChat = ({ streamId, isCreator = false }: StreamChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load existing messages
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('stream_chat_messages')
        .select(`
          *,
          profiles:user_id (
            full_name,
            username
          )
        `)
        .eq('stream_id', streamId)
        .eq('status', 'active')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) {
        console.error('Error loading messages:', error);
        return;
      }

      setMessages(data || []);
    };

    loadMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel('stream-chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'stream_chat_messages',
          filter: `stream_id=eq.${streamId}`
        },
        async (payload) => {
          const newMessage = payload.new as ChatMessage;
          
          // Get profile info for the new message
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, username')
            .eq('id', newMessage.user_id)
            .single();

          setMessages(prev => [...prev, {
            ...newMessage,
            profiles: profile
          }]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [streamId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to chat.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('stream_chat_messages')
        .insert({
          stream_id: streamId,
          user_id: user.id,
          message: newMessage,
          message_type: 'chat'
        });

      if (error) throw error;

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'donation':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'follow':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const formatUserName = (message: ChatMessage) => {
    const profile = message.profiles;
    return profile?.full_name || profile?.username || `User ${message.user_id.slice(0, 8)}`;
  };

  return (
    <Card className="bg-gray-900 border-gray-800 h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#FDBD34]" />
          Live Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-3">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-2 mb-4 max-h-96">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`p-2 rounded-lg ${
                message.is_highlighted ? 'bg-yellow-500/20 border border-yellow-500/50' : 'bg-gray-800/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {getMessageTypeIcon(message.message_type)}
                <span className={`text-sm font-medium ${
                  message.is_moderator ? 'text-green-400' : 'text-[#FDBD34]'
                }`}>
                  {formatUserName(message)}
                  {message.is_moderator && (
                    <span className="ml-1 text-xs bg-green-500 text-black px-1 rounded">MOD</span>
                  )}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(message.created_at).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-white text-sm">{message.message}</p>
              {message.donation_amount && (
                <div className="mt-1 text-xs text-green-400">
                  Donated ${message.donation_amount}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="bg-gray-800 border-gray-700 text-white"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !newMessage.trim()}
            className="bg-[#FDBD34] text-black hover:bg-[#FDBD34]/80"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StreamChat;
