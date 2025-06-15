
import React, { useEffect, useRef } from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import Tus from '@uppy/tus';

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
  const uppyRef = useRef<Uppy.Uppy | null>(null);
  const dashboardId = 'uppy-dashboard-root';

  useEffect(() => {
    if (!userId) return;

    // Clean up any existing instance first
    if (uppyRef.current) uppyRef.current.close();

    const uppy = Uppy<Uppy.StrictTypes>({
      restrictions: {
        maxNumberOfFiles: 1,
        maxFileSize: maxFileSizeMB * 1024 * 1024, // bytes
        allowedFileTypes: ['video/*', '.mp4', '.mov', '.avi', '.webm', '.mkv', '.flv', '.wmv', '.m4v', '.3gp'],
      },
      autoProceed: false
    })
    .use(Dashboard, {
      trigger: `#${dashboardId}`,
      inline: true,
      target: `#${dashboardId}`,
      showProgressDetails: true,
      hideUploadButton: false,
      proudlyDisplayPoweredByUppy: false,
      note: `Max video size: ${maxFileSizeMB} MB`,
      disabled,
    })
    .use(Tus, {
      endpoint,
      chunkSize: 6 * 1024 * 1024, // 6MB
      retryDelays: [0, 1000, 3000, 5000],
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBta3hwb2hzb3hvZ3R2ZHlvcG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MDg3OTEsImV4cCI6MjA2NTQ4NDc5MX0.Nm4IOIE9RQggrL42h2qAhj-y52hXhE_aZeoaXCs9qxo`,
      },
      // Set meta for the storage API
      allowedMetaFields: ['bucketName', 'objectName', 'contentType'],
      // Mandatory: add bucket/object meta on file add!
    });

    uppy.on('file-added', (file) => {
      // Set correct metadata for Supabase Storage on the fly
      uppy.setFileMeta(file.id, {
        bucketName,
        objectName: `${userId}/${Date.now()}_${file.name}`,
        contentType: file.type,
      });
    });

    uppy.on('upload-progress', (file, progress) => {
      if (progress && progress.percentage !== undefined) {
        onProgress(Math.floor(progress.percentage));
      }
    });

    uppy.on('complete', (result) => {
      if (result.successful.length > 0) {
        // The objectName format above is what Supabase uses for the object path
        const successfulFile = result.successful[0];
        const key = successfulFile.meta.objectName;
        // Construct the public URL
        const publicUrl = `https://pmkxpohsoxogtvdyopmc.supabase.co/storage/v1/object/public/videos/${key}`;
        // Emit to parent
        onUploadSuccess(publicUrl, successfulFile.data as File);
      } else {
        onUploadError('Upload did not complete successfully');
      }
    });

    uppy.on('error', (err) => {
      onUploadError(typeof err === 'string' ? err : err.message || 'Unknown upload error');
    });

    uppyRef.current = uppy;

    return () => {
      uppy.close();
    };
  }, [userId, disabled, maxFileSizeMB]);

  return (
    <div id={dashboardId} />
  );
};

export default ResumableVideoUploader;
