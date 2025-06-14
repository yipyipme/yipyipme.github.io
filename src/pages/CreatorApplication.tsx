
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import CreatorApplicationForm from '@/components/creator/CreatorApplicationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

const CreatorApplication = () => {
  const { user, profile } = useAuth();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchExistingApplication();
    }
  }, [user]);

  const fetchExistingApplication = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('creator_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching application:', error);
      } else {
        setApplication(data);
      }
    } catch (error) {
      console.error('Error fetching application:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
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

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  // If user is already a creator, redirect them
  if (profile?.role === 'creator' || profile?.role === 'admin') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>You're Already a Creator!</CardTitle>
              <CardDescription>
                You have creator access and can start uploading content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a 
                href="/creator-studio"
                className="inline-block bg-[#FDBD34] text-black px-6 py-3 rounded-lg hover:bg-[#FDBD34]/80 transition-colors"
              >
                Go to Creator Studio
              </a>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {application ? (
          <Card className="max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(application.status)}
                Application Status
              </CardTitle>
              <CardDescription>
                Your creator application submitted on {new Date(application.submitted_at).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <Badge className={getStatusColor(application.status)}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
              </div>
              
              <div>
                <span className="font-medium">Channel Name:</span>
                <p className="text-gray-600 dark:text-gray-400">{application.channel_name}</p>
              </div>
              
              <div>
                <span className="font-medium">Content Type:</span>
                <p className="text-gray-600 dark:text-gray-400">{application.content_type}</p>
              </div>

              {application.review_notes && (
                <div>
                  <span className="font-medium">Review Notes:</span>
                  <p className="text-gray-600 dark:text-gray-400">{application.review_notes}</p>
                </div>
              )}

              {application.status === 'pending' && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Your application is being reviewed. We'll notify you via email once a decision has been made.
                  </p>
                </div>
              )}

              {application.status === 'rejected' && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Your application was not approved. You can submit a new application after addressing the feedback above.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <CreatorApplicationForm />
        )}
      </div>
    </Layout>
  );
};

export default CreatorApplication;
