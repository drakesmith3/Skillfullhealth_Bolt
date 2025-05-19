import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useTranslation } from "react-i18next";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Component, ErrorInfo, ReactNode } from 'react';

// Type definitions for better maintainability
type CertificateType = "license" | "emr" | "other";

type Certificate = {
  name: string;
  type: "expires" | "permanent";
  expiryDate?: string;
  certificateType?: CertificateType;
  isVerified?: boolean;
};
type License = {
  name: string;
  expiryDate: string;
};
type AdvancedSkill = {
  name: string;
  status: string;
};

type ProfileAnalytics = {
  feedbackCount: number;
  licenses: License[];
  certificates: Certificate[];
  coursesRecommended: number;
  coursesTaken: number;
  resumeUploaded: boolean;
  badges: string[];
  awards: string[];
  platformActivity: string;
  glohsenScore: number;
  advancedSkills: AdvancedSkill[];
  personalInfo: {
    name: string;
    specialty: string;
    email: string;
    phone: string;
  };
};

const today = new Date();

// Helper: returns days until expiry (negative if expired)
function daysUntil(dateStr?: string) {
  if (!dateStr) return NaN;
  const expiry = new Date(dateStr);
  if (isNaN(expiry.getTime())) return NaN;
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

// Helper: get certificate status
function getCertificateStatus(cert: Certificate) {
  if (cert.type === "permanent") return "PERMANENT";
  if (cert.type === "expires" && cert.expiryDate) {
    const expiry = new Date(cert.expiryDate);
    const isExpired = expiry < today;
    
    if (cert.certificateType === "emr") {
      if (isExpired) return "EMR_EXPIRED";
      if (!cert.isVerified) return "EMR_PENDING_VERIFICATION";
      return "EMR_CURRENT";
    }
    
    return isExpired ? "EXPIRED" : "CURRENT";
  }
  return "";
}

// Helper: get license status
function getLicenseStatus(license: License) {
  const expiry = new Date(license.expiryDate);
  return expiry < today ? "EXPIRED" : "CURRENT";
}

// Helper: Calculate days until a given date
function calculateDaysUntil(dateStr: string): number {
  const expiry = new Date(dateStr);
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

// Helper: Generate notification message for a certificate
function generateNotification(cert: Certificate, daysUntil: number): string | null {
  if (daysUntil < 0) {
    return `Certificate "${cert.name}" has EXPIRED on ${cert.expiryDate}.`;
  } else if (daysUntil <= 30) {
    return `Certificate "${cert.name}" will expire in ${daysUntil} day(s) (${cert.expiryDate}).`;
  }
  return null;
}

// Add type for notification sorting
type NotificationSorter = (a: string, b: string) => number;

const sortNotifications: NotificationSorter = (a, b) => {
  const aExpired = a.includes("EXPIRED");
  const bExpired = b.includes("EXPIRED");
  
  if (aExpired && !bExpired) return -1;
  if (!aExpired && bExpired) return 1;
  
  const aDays = parseInt(a.match(/expire in (\d+) day/)?.[1] || "0");
  const bDays = parseInt(b.match(/expire in (\d+) day/)?.[1] || "0");
  
  return aDays - bDays;
}

const MyProfileAnalytics = () => {
  type TranslationKeys = {
    loading: string;
    error_loading_profile: string;
    profile_analytics: string;
    // ...add all used translation keys
  };

  const { t } = useTranslation<keyof TranslationKeys>("dashboard", {
    fallbackLng: "en",
    defaultNS: "dashboard"
  });
  const { data: profileAnalytics, isLoading, error } = useUserProfile<ProfileAnalytics, Error>();
  const notifications = useMemo(() => {
    if (!profileAnalytics?.certificates) return [];
    
    return profileAnalytics.certificates
      .filter(cert => cert.type === "expires" && cert.expiryDate)
      .map(cert => {
        const daysUntil = calculateDaysUntil(cert.expiryDate!);
        return generateNotification(cert, daysUntil);
      })
      .filter(Boolean)
      .sort((a, b) => sortNotifications(a, b));
  }, [profileAnalytics?.certificates]);

  const coursesData = useMemo(() => [
    { month: t("jan"), taken: 2 },
    { month: t("feb"), taken: 1 },
    { month: t("mar"), taken: 4 },
  ], [t]);

  const licenseStatuses = useMemo(() => 
    profileAnalytics?.licenses.map(license => ({
      ...license,
      status: getLicenseStatus(license)
    })) || [],
    [profileAnalytics?.licenses]
  );

  if (isLoading) return (
    <Card className="p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    </Card>
  );
  if (error || !profileAnalytics) return <div role="alert">{t("error_loading_profile")}</div>;

  return (
    <Card 
      className="p-6" 
      aria-label={t("profile_analytics")} 
      role="region"
      tabIndex={0}
    >
      <h2 className="text-xl font-bold mb-4">{t("profile_analytics")}</h2>

      {/* Expiry Notifications */}
      {notifications.length > 0 && (
        <Card
          className="p-4 mb-4 bg-yellow-50 border border-yellow-300"
          role="alert"
          aria-live="polite"
          aria-label={t("important_notifications")}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold mb-2 text-yellow-800">{t("important_notifications")}</h3>              <ul className="list-disc ml-5 text-yellow-900 text-sm">
                {notifications.map((note, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{note}</span>
                    {(note.includes("EXPIRED") || note.includes("renew")) && (
                      <button
                        className={`ml-2 px-2 py-1 text-xs ${
                          note.includes("EMR") ? 'bg-orange-500' : 'bg-blue-600'
                        } text-white rounded`}
                        aria-label={t("renew_now")}
                      >
                        {note.includes("EMR") ? "Renew EMR Certificate" : t("renew_now")}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>            <Link
              to={{
                pathname: "/account-settings",
                search: "?tab=notifications"
              }}
              className="ml-4 text-blue-600 hover:text-blue-800 underline text-sm font-semibold"
            >
              {t("manage_notification_privacy_settings")}
            </Link>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="mb-2">
            {t("professional_feedback")}: <b>{profileAnalytics.feedbackCount}</b>
          </div>
          <div className="mb-2">
            <b>{t("licenses")}</b>
            <ul className="ml-4 list-disc">
              {licenseStatuses.map((license, idx) => {
                const status = getLicenseStatus(license);
                return (
                  <li key={idx}>
                    {license.name}:{" "}
                    <span className={status === "EXPIRED" ? "text-red-600" : "text-green-600"}>
                      {t(status.toLowerCase())}
                    </span>
                    {license.expiryDate && (
                      <span className="text-xs text-gray-500 ml-2">
                        ({t("expires")}: {license.expiryDate})
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mb-2">
            <b>{t("certificates")}</b>
            <ul className="ml-4 list-disc">
              {profileAnalytics.certificates.map((cert, idx) => {
                const status = getCertificateStatus(cert);
                return (
                  <li key={idx}>
                    {cert.name}:{" "}
                    <span
                      className={
                        status === "EXPIRED"
                          ? "text-red-600"
                          : status === "CURRENT"
                          ? "text-green-600"
                          : "text-gray-700"
                      }
                    >
                      {t(status.toLowerCase())}
                    </span>
                    {cert.expiryDate && (
                      <span className="text-xs text-gray-500 ml-2">
                        ({t("expires")}: {cert.expiryDate})
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mb-2">
            {t("courses_recommended")}: <b>{profileAnalytics.coursesRecommended}</b>
          </div>
          <div className="mb-2">
            {t("courses_taken")}: <b>{profileAnalytics.coursesTaken}</b>
          </div>
          <div className="mb-2">
            {t("resume_uploaded")}: <b>{profileAnalytics.resumeUploaded ? t("yes") : t("no")}</b>
          </div>
        </div>
        <div>
          <div className="mb-2">
            {t("badges_awards")}: <b>{profileAnalytics.badges.join(", ")}</b>
          </div>
          <div className="mb-2">
            {t("awards")}: <b>{profileAnalytics.awards.join(", ")}</b>
          </div>
          <div className="mb-2">
            {t("platform_activity")}: <b>{profileAnalytics.platformActivity}</b>
          </div>
          <div className="mb-2">
            {t("glohsen_score")}: <b>{profileAnalytics.glohsenScore}</b>
          </div>
          <div className="mb-2">
            <b>{t("advanced_skills_certificates_in_view")}</b>
            <ul className="ml-4 list-disc">
              {profileAnalytics.advancedSkills.map((skill, idx) => (
                <li key={idx}>
                  {skill.name}:{" "}
                  <span className="text-blue-700">{t(skill.status.toLowerCase().replace(/ /g, "_"))}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Card className="p-4 mt-4 bg-gray-50" aria-label={t("personal_information")} role="region">
        <h3 className="font-semibold mb-2">{t("personal_information")}</h3>
        <div>
          {t("name")}: <b>{profileAnalytics.personalInfo.name}</b>
        </div>
        <div>
          {t("specialty")}: <b>{profileAnalytics.personalInfo.specialty}</b>
        </div>
        <div>
          {t("email")}: <b>{profileAnalytics.personalInfo.email}</b>
        </div>
        <div>
          {t("phone")}: <b>{profileAnalytics.personalInfo.phone}</b>
        </div>
      </Card>

      {/* Example: Add a bar chart for courses taken over time */}
      <div className="mt-4" aria-label={t("courses_taken_over_time")} role="region">
        <h3 className="font-semibold mb-2">{t("courses_taken_over_time")}</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={coursesData} aria-label={t("courses_chart")}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="taken" fill="#8884d8" role="graphics-symbol" aria-label={t("courses_bar")} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

// Error Boundary Component
class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Profile Analytics Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div role="alert">Something went wrong. Please try refreshing.</div>;
    }

    return this.props.children;
  }
}

export default function ProfileAnalyticsPage() {
  return (
    <ErrorBoundary>
      <MyProfileAnalytics />
    </ErrorBoundary>
  );
}
