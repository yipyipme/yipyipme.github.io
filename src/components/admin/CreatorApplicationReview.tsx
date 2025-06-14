import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock, User, Calendar, MessageSquare } from 'lucide-react';

interface Application {
  id: string;
  user_id: string;
  channel_name: string;
  channel_description: string;
  content_type: string;
  ministry_background: string | null;
  sample_content_urls: string[] | null;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  review_notes: string | null;
}

const CreatorApplicationReview = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewNotes, setReviewNotes] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('creator_applications')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;

      // Filter out suspended status and only keep the valid statuses
      const validApplications = data?.map(app => ({
        ...app,
        status: app.status === 'suspended' ? 'pending' : app.status
      })) || [];

      setApplications(validApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch creator applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (applicationId: string, status: 'approved' | 'rejected') => {
    try {
      const notes = reviewNotes[applicationId] || '';
      
      // Update application status
      const { error: updateError } = await supabase
        .from('creator_applications')
        .update({
          status,
          reviewed_at: new Date().toISOString(),
          review_notes: notes,
        })
        .eq('id', applicationId);

      if (updateError) throw updateError;

      // If approved, update user role and create creator profile
      if (status === 'approved') {
        const application = applications.find(app => app.id === applicationId);
        if (application) {
          // Update user role to creator
          const { error: roleError } = await supabase
            .from('profiles')
            .update({ role: 'creator' })
            .eq('id', application.user_id);

          if (roleError) throw roleError;

          // Create creator profile
          const { error: profileError } = await supabase
            .from('creator_profiles')
            .insert({
              id: application.user_id,
              channel_name: application.channel_name,
              channel_description: application.channel_description,
            });

          if (profileError) throw profileError;
        }
      }

      toast({
        title: "Success",
        description: `Application ${status} successfully`,
      });

      // Refresh applications
      fetchApplications();
    } catch (error) {
      console.error('Error reviewing application:', error);
      toast({
        title: "Error",
        description: "Failed to review application",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Creator Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="h-8 w-8 animate-spin border-4 border-[#FDBD34] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading applications...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="h-5 w-5" />
          Creator Applications
          {applications.filter(app => app.status === 'pending').length > 0 && (
            <Badge className="bg-[#FDBD34] text-black">
              {applications.filter(app => app.status === 'pending').length} pending
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {applications.length === 0 ? (
          <div className="text-center py-8">
            <User className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No creator applications yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {application.channel_name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(application.status)}
                      <Badge className={getStatusColor(application.status)}>
                        {application.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(application.submitted_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {application.content_type}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-1">Channel Description</h4>
                    <p className="text-gray-400 text-sm">{application.channel_description}</p>
                  </div>

                  {application.ministry_background && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Ministry Background</h4>
                      <p className="text-gray-400 text-sm">{application.ministry_background}</p>
                    </div>
                  )}

                  {application.sample_content_urls && application.sample_content_urls.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-1">Sample Content</h4>
                      <div className="space-y-1">
                        {application.sample_content_urls.map((url, index) => (
                          <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FDBD34] hover:underline text-sm block"
                          >
                            {url}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {application.status === 'pending' && (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Add review notes (optional)"
                      value={reviewNotes[application.id] || ''}
                      onChange={(e) => setReviewNotes(prev => ({
                        ...prev,
                        [application.id]: e.target.value
                      }))}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleReview(application.id, 'approved')}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReview(application.id, 'rejected')}
                        variant="destructive"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                )}

                {application.review_notes && (
                  <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-300 mb-1">Review Notes</h4>
                    <p className="text-gray-400 text-sm">{application.review_notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreatorApplicationReview;
