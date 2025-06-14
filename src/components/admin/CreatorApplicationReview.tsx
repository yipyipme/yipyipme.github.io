
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock, ExternalLink, User } from 'lucide-react';

interface Application {
  id: string;
  user_id: string;
  channel_name: string;
  channel_description: string;
  content_type: string;
  ministry_background: string;
  sample_content_urls: string[];
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  review_notes?: string;
}

const CreatorApplicationReview = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewNotes, setReviewNotes] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchApplications();
    }
  }, [profile]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('creator_applications')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch applications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (applicationId: string, status: 'approved' | 'rejected') => {
    if (!user) return;

    try {
      const notes = reviewNotes[applicationId] || '';
      
      // Update application status
      const { error: updateError } = await supabase
        .from('creator_applications')
        .update({
          status,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id,
          review_notes: notes
        })
        .eq('id', applicationId);

      if (updateError) throw updateError;

      // If approved, update user role to creator
      if (status === 'approved') {
        const application = applications.find(app => app.id === applicationId);
        if (application) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ role: 'creator' })
            .eq('id', application.user_id);

          if (profileError) throw profileError;

          // Create creator profile
          const { error: creatorProfileError } = await supabase
            .from('creator_profiles')
            .insert({
              id: application.user_id,
              channel_name: application.channel_name,
              channel_description: application.channel_description,
              verification_status: 'approved'
            });

          if (creatorProfileError) throw creatorProfileError;
        }
      }

      toast({
        title: "Success",
        description: `Application ${status} successfully`,
      });

      // Refresh applications
      fetchApplications();
      
      // Clear review notes
      setReviewNotes(prev => {
        const updated = { ...prev };
        delete updated[applicationId];
        return updated;
      });
    } catch (error) {
      console.error('Error reviewing application:', error);
      toast({
        title: "Error",
        description: "Failed to review application",
        variant: "destructive"
      });
    }
  };

  if (profile?.role !== 'admin') {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-8">Loading applications...</div>;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Creator Application Review</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Review and approve creator applications
        </p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">No applications found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {applications.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {application.channel_name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(application.status)}
                    <Badge className={getStatusColor(application.status)}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Submitted on {new Date(application.submitted_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Channel Description</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {application.channel_description}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Content Type</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {application.content_type}
                    </p>
                  </div>
                </div>

                {application.ministry_background && (
                  <div>
                    <h4 className="font-medium mb-2">Ministry Background</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {application.ministry_background}
                    </p>
                  </div>
                )}

                {application.sample_content_urls && application.sample_content_urls.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Sample Content</h4>
                    <div className="space-y-2">
                      {application.sample_content_urls.map((url, index) => (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Sample {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {application.status === 'pending' && (
                  <div className="space-y-4 border-t pt-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Review Notes</label>
                      <Textarea
                        value={reviewNotes[application.id] || ''}
                        onChange={(e) => setReviewNotes(prev => ({
                          ...prev,
                          [application.id]: e.target.value
                        }))}
                        placeholder="Add notes about your decision..."
                        className="min-h-[80px]"
                      />
                    </div>
                    <div className="flex gap-3">
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
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Review Notes</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {application.review_notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatorApplicationReview;
