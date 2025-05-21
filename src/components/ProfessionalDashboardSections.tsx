
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Activity, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAsyncAction } from '@/hooks/use-async-action';
import type { 
  JoinTheConversationProps, 
  RecentActivityProps, 
  AdvancedSkillsCertificatesProps,
  Certificate
} from "@/types/dashboard";

const animationClasses = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  scaleIn: 'animate-scale-in'
};

export const JoinTheConversation: React.FC<JoinTheConversationProps> = ({
  onJoinForum,
  onStartDiscussion
}) => (
  <section className={`my-10 max-w-5xl mx-auto px-4 ${animationClasses.fadeIn}`}>
    <div className={`bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl transition-shadow duration-300`}>
      <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/20">
        <MessageCircle className="w-8 h-8 text-d4af37" />
      </div>
      <div className="flex-1">
        <h2 className="text-xl md:text-2xl font-bold text-primary-dark mb-1">Join the Conversation</h2>
        <p className="text-gray-600 mb-3">
          Connect with other professionals, ask questions, and share your insights in the community forum.
        </p>
        <div className="flex gap-3">
          <Button
            onClick={onJoinForum}
            className="bg-[#D4AF37] hover:bg-[#B22222] text-white font-semibold px-5 py-2 rounded-lg transition-all text-sm"
          >
            Go to Forum
          </Button>
          <Button
            onClick={onStartDiscussion}
            className="bg-[#1E2738] hover:bg-[#B22222] text-white font-semibold px-5 py-2 rounded-lg transition-all text-sm"
          >
            Start a Discussion
          </Button>
        </div>
      </div>
    </div>
  </section>
);

// --- RECENT ACTIVITY SECTION ---
export const RecentActivity: React.FC<RecentActivityProps> = ({ activities = [] }) => (
  <section className={`my-10 max-w-5xl mx-auto px-4 ${animationClasses.slideUp}`}>
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="w-7 h-7 text-d4af37" />
        <h2 className="text-xl md:text-2xl font-bold text-primary-dark">Recent Activity</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {(activities.length ? activities : [
          { text: 'Completed: Advanced Cardiology CME', time: '2 hours ago' },
          { text: 'Commented on "Best Practices in Telemedicine"', time: '5 hours ago' },
          { text: 'Joined the Oncology Group', time: 'Yesterday' }
        ]).map((item, idx) => (
          <li key={idx} className="py-3 flex items-center justify-between">
            <span className="text-gray-700">{item.text}</span>
            <span className="text-xs text-gray-500">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// --- ADVANCED SKILLS/CERTIFICATES SECTION ---
export const AdvancedSkillsCertificates: React.FC<AdvancedSkillsCertificatesProps> = ({
  certificates = [],
  onUpload,
  onUpdateExpiry
}) => {
  const uploadAction = useAsyncAction({
    action: async (file: File, certificateType: string) => {
      if (!onUpload) return;
      await onUpload(file, certificateType);
    },
    successMessage: 'Certificate uploaded successfully',
    errorMessage: 'Failed to upload certificate'
  });

  const expiryAction = useAsyncAction({
    action: async (certificateId: string, date: string) => {
      if (!onUpdateExpiry) return;
      await onUpdateExpiry(certificateId, date);
    },
    successMessage: 'Expiry date updated successfully',
    errorMessage: 'Failed to update expiry date'
  });

  const [fileState, setFileState] = useState<Record<string, File | null>>({});
  const [uploadState, setUploadState] = useState<Record<string, boolean>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  const handleFileUpload = async (certificateType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileState(prev => ({ ...prev, [certificateType]: file }));
    setUploading(prev => ({ ...prev, [certificateType]: true }));

    try {
      await uploadAction.execute(file, certificateType);
      setUploadState(prev => ({ ...prev, [certificateType]: true }));
    } catch (error) {
      setUploadState(prev => ({ ...prev, [certificateType]: false }));
    } finally {
      setUploading(prev => ({ ...prev, [certificateType]: false }));
    }
  };

  const handleExpiryUpdate = async (certificateId: string, date: string) => {
    try {
      await expiryAction.execute(certificateId, date);
    } catch (error) {
      // Error handled by useAsyncAction
    }
  };

  return (
    <div 
      className="bg-white/50 backdrop-blur rounded-xl shadow-lg p-6"
      role="region"
      aria-label="Advanced Skills and Certificates section"
    >
      <h3 id="certificates-heading" className="text-xl font-semibold text-gray-900 mb-6">
        Advanced Skills & Certificates
      </h3>
      <div className="space-y-6">
        {certificates.map((cert) => {
          // Create a valid ID by removing spaces and special characters
          const certId = `cert-${cert.name.toLowerCase().replace(/\s+/g, '-')}`;
          
          return (
            <div 
              key={cert.name}
              className="border-b border-gray-200 pb-6 last:border-0"
              role="article"
              aria-labelledby={certId}
            >
              <h4 id={certId} className="font-medium text-gray-900">
                {cert.name}
              </h4>
              {cert.status && (
                <Badge 
                  className={
                    cert.status === 'CURRENT' ? 'bg-green-100 text-green-800' :
                    cert.status === 'EXPIRED' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }
                  role="status"
                  aria-label={`Certificate status: ${cert.status}`}
                >
                  {cert.status}
                </Badge>
              )}
              {cert.url && (
                <a 
                  href={cert.url}
                  className="text-[#D4AF37] hover:text-[#B22222] text-sm font-medium transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${cert.name} certificate (opens in new tab)`}
                >
                  View Certificate
                </a>
              )}

              {!uploadState[cert.name] ? (
                <form 
                  onSubmit={(e) => e.preventDefault()} 
                  className="flex items-center gap-4"
                  aria-label={`Upload form for ${cert.name}`}
                >
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(cert.name, e)}
                    disabled={uploading[cert.name]}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                             file:rounded file:border-0 file:text-sm file:font-semibold
                             file:bg-[#D4AF37]/80 file:text-white hover:file:bg-[#B22222]
                             disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Choose ${cert.name} certificate file`}
                  />
                  <Button
                    type="submit"
                    disabled={!fileState[cert.name] || uploading[cert.name]}
                    className="bg-[#D4AF37] hover:bg-[#B22222] text-white disabled:opacity-50"
                    aria-busy={uploading[cert.name]}
                  >
                    {uploading[cert.name] ? (
                      <span className="flex items-center gap-2">
                        <Upload className="w-4 h-4 animate-spin" aria-hidden="true" />
                        Uploading...
                      </span>
                    ) : 'Upload'}
                  </Button>
                </form>
              ) : (
                <div 
                  className="flex items-center gap-4"
                  role="group"
                  aria-label={`Expiry date settings for ${cert.name}`}
                >
                  <input
                    type="date"
                    value={cert.expiryDate || ''}
                    onChange={(e) => handleExpiryUpdate(cert.name, e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    aria-label={`Set expiry date for ${cert.name}`}
                  />
                  {cert.expiryDate && (
                    <span className="text-sm text-gray-500" role="status">
                      Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
