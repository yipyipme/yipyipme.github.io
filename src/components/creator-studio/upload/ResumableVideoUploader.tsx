
import React, { useEffect, useRef } from 'react';
// Type import for Uppy (handles missing declarations gracefully)
let UppyCore: any = null, UppyDashboard: any = null, UppyTus: any = null;
try {
  UppyCore = require('@uppy/core').default;
  UppyDashboard = require('@uppy/dashboard').default;
  UppyTus = require('@uppy/tus').default;
} catch (e) {
  // If the types don't exist yet, Uppy will be available soon after install
}

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

interface ResumableVideoUploaderProps {
  userId: string;
  onUploadSuccess: (videoUrl: string, originalFile: File) => void;
  onUploadError: (errMsg: string) => void;
  onProgress: (percent: number) => void;
  disabled?: boolean;
  maxFileSizeMB?: number; // for max file size display/enforcement
}

const endpoint = 'https://pmkxpohsoxogtvdyopmc.supabase.co/storage/v1/upload/resumable';
const bucketName = 'videos';

const ResumableVideoUploader: React.FC<ResumableVideoUploaderProps> = ({
  userId,
  onUploadSuccess,
  onUploadError,
  onProgress,
  disabled = false,
  maxFileSizeMB = 51200 // 50 GB default if on paid plan, 50 MB on free plan
}) => {
  const uppyRef = useRef<any | null>(null);
  const dashboardId = 'uppy-dashboard-root';

  useEffect(() => {
    if (!userId || !UppyCore || !UppyDashboard || !UppyTus) return;

    if (uppyRef.current) uppyRef.current.close();

    const uppy = UppyCore({
      restrictions: {
        maxNumberOfFiles: 1,
        maxFileSize: maxFileSizeMB * 1024 * 1024,
        allowedFileTypes: [
          'video/*',
          '.mp4', '.mov', '.avi', '.webm', '.mkv', '.flv', '.wmv', '.m4v', '.3gp'
        ],
      },
      autoProceed: false,
    })
      .use(UppyDashboard, {
        trigger: `#${dashboardId}`,
        inline: true,
        target: `#${dashboardId}`,
        showProgressDetails: true,
        hideUploadButton: false,
        proudlyDisplayPoweredByUppy: false,
        note: `Max video size: ${maxFileSizeMB} MB`,
        disabled,
      })
      .use(UppyTus, {
        endpoint,
        chunkSize: 6 * 1024 * 1024, // 6MB
        retryDelays: [0, 1000, 3000, 5000],
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBta3hwb2hzb3hvZ3R2ZHlvcG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDg3OTEsImV4cCI6MjA2NTQ4NDc5MX0.Nm4IOIE9RQggrL42h2qAhj-y52hXhE_aZeoaXCs9qxo`,
        },
        allowedMetaFields: ['bucketName', 'objectName', 'contentType'],
      });

    uppy.on('file-added', (file: any) => {
      uppy.setFileMeta(file.id, {
        bucketName,
        objectName: `${userId}/${Date.now()}_${file.name}`,
        contentType: file.type,
      });
    });

    uppy.on('upload-progress', (file: any, progress: any) => {
      if (progress && progress.percentage !== undefined) {
        onProgress(Math.floor(progress.percentage));
      }
    });

    uppy.on('complete', (result: any) => {
      if (result.successful.length > 0) {
        const successfulFile = result.successful[0];
        const key = successfulFile.meta.objectName;
        const publicUrl = `https://pmkxpohsoxogtvdyopmc.supabase.co/storage/v1/object/public/videos/${key}`;
        onUploadSuccess(publicUrl, successfulFile.data as File);
      } else {
        onUploadError('Upload did not complete successfully');
      }
    });

    uppy.on('error', (err: any) => {
      onUploadError(typeof err === 'string' ? err : err.message || 'Unknown upload error');
    });

    uppyRef.current = uppy;

    return () => {
      uppy.close();
    };
  }, [userId, disabled, maxFileSizeMB, onProgress, onUploadError, onUploadSuccess]);

  return (
    <div>
      <div
        id={dashboardId}
        style={{ minHeight: 300, background: '#18181b', borderRadius: 10, padding: 6 }}
      />
      <div className="text-xs text-center mt-2 text-zinc-400">
        Paid plans support up to 50GB per video. Free plans are limited to 50MB max.
      </div>
    </div>
  );
};

export default ResumableVideoUploader;
