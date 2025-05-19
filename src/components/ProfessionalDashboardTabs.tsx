import React, { useState } from "react";
import { Award, FileText, Briefcase, Inbox, User, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";

// Tab definitions
const TABS = [
  { key: "overview", label: "OVERVIEW", icon: <ChartBar className="inline w-4 h-4 mr-1" /> },
  { key: "jobs", label: "MY JOBS HISTORY/APPLICATIONS", icon: <Briefcase className="inline w-4 h-4 mr-1" /> },
  { key: "transactions", label: "MY TRANSACTION HISTORY", icon: <FileText className="inline w-4 h-4 mr-1" /> },
  { key: "profile", label: "MY PROFILE", icon: <User className="inline w-4 h-4 mr-1" /> },
];

export const ProfessionalDashboardTabs = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Replace these with your real data or props
  const certificates = [
    { name: "MBBS", url: "#" },
    { name: "MSc", url: "#" },
    { name: "EMR PROFICIENCY", url: "#" },
    { name: "Medicals", url: "#" },
  ];
  const resumeUrl = "#";
  const badges = ["Top Performer", "Long Service"];
  const payments = [{ desc: "Locum at St. Mary’s", amount: "₦50,000", date: "2024-05-01" }];
  const withdrawals = [{ desc: "Bank Transfer", amount: "₦30,000", date: "2024-05-03" }];
  const jobsHistory = [
    { hospital: "St. Mary’s", role: "Locum Doctor", status: "Completed" },
    { hospital: "City Clinic", role: "Locum Nurse", status: "Unaccepted" },
  ];
  const jobsApplied = [
    { hospital: "General Hospital", role: "Locum Doctor", status: "Applied" },
  ];
  const locumBackup = [{ info: "Available weekends" }];
  const messages = [
    { from: "Employer", subject: "Job Offer", date: "2024-05-06" },
    { from: "Admin", subject: "Welcome!", date: "2024-05-01" },
  ];
  const activities = [
    { text: "Completed: Advanced Cardiology CME", time: "2 hours ago" },
    { text: "Commented on “Best Practices in Telemedicine”", time: "5 hours ago" },
    { text: "Joined the Oncology Group", time: "Yesterday" },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-8">
      {/* Modern glass-effect container */}
      <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        {/* Quick Scroll Tabs with hover effects */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-200 flex overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center px-6 py-4 text-sm font-semibold transition-all duration-300 border-b-2 hover:bg-gray-50/50 ${
                activeTab === tab.key
                  ? "border-[#D4AF37] text-d4af37 bg-[#fffbe6]/50 backdrop-blur"
                  : "border-transparent text-gray-600 hover:text-[#B22222]"
              }`}
              type="button"
              aria-selected={activeTab === tab.key}
              tabIndex={0}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content with Modern UI */}
        <div className="p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Professional Summary */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/50 backdrop-blur rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">GLOHSEN Score</span>
                      <span className="font-semibold text-[#D4AF37]">87/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profile Completion</span>
                      <span className="font-semibold text-green-600">95%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/50 backdrop-blur rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Applications</span>
                      <span className="font-semibold text-blue-600">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending Reviews</span>
                      <span className="font-semibold text-orange-600">2</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/50 backdrop-blur rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Earnings</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">This Month</span>
                      <span className="font-semibold text-green-600">₦250,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-semibold text-yellow-600">₦100,000</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Recent Activities */}
              <section className="bg-white/50 backdrop-blur rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {activities.map((activity, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-white/40 rounded-lg hover:bg-white/60 transition-colors">
                      <span className="text-gray-700">{activity.text}</span>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="space-y-8">
              {/* Financial Overview */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/50 backdrop-blur rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Earnings</h3>
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-[#D4AF37]">₦750,000</div>
                    <div className="text-sm text-gray-500">Since May 2024</div>
                  </div>
                </div>

                <div className="bg-white/50 backdrop-blur rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Balance</h3>
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-green-600">₦150,000</div>
                    <Button variant="outline" className="w-full">Withdraw</Button>
                  </div>
                </div>

                <div className="bg-white/50 backdrop-blur rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Payments</h3>
                  <div className="space-y-3">
                    <div className="text-3xl font-bold text-yellow-600">₦200,000</div>
                    <div className="text-sm text-gray-500">Expected within 7 days</div>
                  </div>
                </div>
              </section>

              {/* Recent Transactions */}
              <section className="bg-white/50 backdrop-blur rounded-xl shadow-lg overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Filter</Button>
                    <Button variant="outline" size="sm">Export</Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50">
                      {[...payments, ...withdrawals].map((transaction, idx) => (
                        <tr key={idx} className="hover:bg-white/40 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-900">{transaction.desc}</td>
                          <td className="px-6 py-4 text-sm font-medium">
                            <span className={transaction.amount.includes("-") ? "text-red-600" : "text-green-600"}>
                              {transaction.amount}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Completed
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{transaction.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-8">
              {/* Personal Information */}
              <section className="bg-white/50 backdrop-blur rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <div className="text-gray-900">Dr. Oredola Adeola</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Medical License</label>
                      <div className="text-gray-900">ML-2025-1234</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                      <div className="text-gray-900">General Practice</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <div className="text-gray-900">Lagos, Nigeria</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                      <div className="text-gray-900">8 years</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="text-gray-900">dr.oredola@example.com</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Skills & Certifications */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 backdrop-blur rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Certifications</h3>
                  <div className="space-y-4">
                    {certificates.map((cert, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white/40 rounded-lg hover:bg-white/60 transition-colors">
                        <div className="flex items-center">
                          <Award className="w-4 h-4 text-[#D4AF37] mr-2" />
                          <span className="font-medium">{cert.name}</span>
                        </div>
                        <a href={cert.url} className="text-sm text-[#D4AF37] hover:underline">View</a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/50 backdrop-blur rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Badges & Recognition</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {badges.map((badge, idx) => (
                      <div key={idx} className="flex items-center p-3 bg-[#D4AF37]/10 rounded-lg">
                        <Award className="w-5 h-5 text-[#D4AF37] mr-2" />
                        <span className="text-sm font-medium">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "jobs" && (
            <div className="space-y-8">
              {/* Jobs Analytics */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/50 backdrop-blur rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Jobs Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Jobs</span>
                      <span className="font-semibold text-[#D4AF37]">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-semibold text-green-600">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Applications</span>
                      <span className="font-semibold text-blue-600">3</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/50 backdrop-blur rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Period</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jobs Applied</span>
                      <span className="font-semibold text-[#D4AF37]">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interviews</span>
                      <span className="font-semibold text-purple-600">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Offers</span>
                      <span className="font-semibold text-green-600">2</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/50 backdrop-blur rounded-xl shadow-lg p-6 transform transition-all hover:scale-105">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Availability</span>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Immediate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Lagos</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Job Applications Table */}
              <section className="bg-white/50 backdrop-blur rounded-xl shadow-lg overflow-hidden">
                <h3 className="text-lg font-semibold text-gray-900 p-6 border-b">Recent Applications</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50">
                      {jobsHistory.map((job, idx) => (
                        <tr key={idx} className="hover:bg-white/40 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-900">{job.hospital}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{job.role}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              job.status === "Completed" 
                                ? "bg-green-100 text-green-800"
                                : job.status === "Applied"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">May 1, 2024</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {activeTab === "inbox" && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-primary-dark">Messages</h2>
              <ul className="mb-6">
                {messages.map((m, i) => (
                  <li key={i} className="flex justify-between border-b py-2">
                    <span>
                      <span className="font-semibold">{m.from}:</span> {m.subject}
                    </span>
                    <span className="text-xs text-gray-500">{m.date}</span>
                  </li>
                ))}
              </ul>
              <h2 className="text-xl font-bold mb-2 text-primary-dark">Recent Activities</h2>
              <ul>
                {activities.map((a, i) => (
                  <li key={i} className="flex justify-between border-b py-2">
                    <span>{a.text}</span>
                    <span className="text-xs text-gray-500">{a.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboardTabs;
