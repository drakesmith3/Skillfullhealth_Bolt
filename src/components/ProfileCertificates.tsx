import React, { useEffect, useState } from "react";

// Example certificate/license data structure
type CertType = "LICENSE" | "CERTIFICATE" | "EXAM";
type InViewStatus = "IN VIEW - NONE" | "IN VIEW - ATTEMPTED" | "PASSED/COMPLETED";

interface Certificate {
  id: string;
  name: string;
  type: CertType;
  expires?: boolean;
  expiryDate?: string; // ISO date string
  permanent?: boolean;
  inViewStatus?: InViewStatus;
}

const getStatus = (cert: Certificate) => {
  if (cert.type === "LICENSE") {
    if (cert.expiryDate) {
      return new Date(cert.expiryDate) < new Date() ? "EXPIRED" : "CURRENT";
    }
    return "CURRENT";
  }
  if (cert.type === "CERTIFICATE") {
    if (cert.permanent) return "PERMANENT";
    if (cert.expiryDate) {
      return new Date(cert.expiryDate) < new Date() ? "EXPIRED" : "CURRENT";
    }
    return "EXPIRES";
  }
  if (cert.type === "EXAM" && cert.inViewStatus) {
    return cert.inViewStatus;
  }
  return "";
};

const ProfileCertificates = ({ certificates }: { certificates: Certificate[] }) => {
  // Notification logic
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const soon = (date: string) => {
      const d = new Date(date);
      const now = new Date();
      const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return diff < 30 && diff > 0; // expires in less than 30 days
    };
    const notes: string[] = [];
    certificates.forEach(cert => {
      if ((cert.type === "LICENSE" || (cert.type === "CERTIFICATE" && !cert.permanent)) && cert.expiryDate) {
        if (new Date(cert.expiryDate) < new Date()) {
          notes.push(`${cert.name} is EXPIRED.`);
        } else if (soon(cert.expiryDate)) {
          notes.push(`${cert.name} will expire soon.`);
        }
      }
    });
    setNotifications(notes);
  }, [certificates]);

  return (
    <div>
      <h2 className="font-bold text-lg mb-2">Licenses, Certificates & Certifications</h2>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Type</th>
            <th className="text-left">Status</th>
            <th className="text-left">Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map(cert => (
            <tr key={cert.id}>
              <td>{cert.name}</td>
              <td>{cert.type}</td>
              <td>
                <span className={
                  getStatus(cert) === "EXPIRED"
                    ? "text-red-600 font-semibold"
                    : getStatus(cert) === "CURRENT"
                    ? "text-green-600 font-semibold"
                    : "text-gray-700"
                }>
                  {getStatus(cert)}
                </span>
              </td>
              <td>{cert.expiryDate ? new Date(cert.expiryDate).toLocaleDateString() : cert.permanent ? "Permanent" : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 mb-4">
          <ul>
            {notifications.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileCertificates;
