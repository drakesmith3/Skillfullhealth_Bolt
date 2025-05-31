import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const sections = [
  'What is GLOHSEN, THE GLOHSEN STANDARD and the GLOHSEN SCORE?',
  'Understanding and using our evaluating metrics- the GLOHSEN Employer Criteria Score, Staffing/HR activity KPIs, EQ assessment, and the Feedback system?',
  'How Employers are using GLOHSEN to bridge their HR/Staffing need gaps and to ease their workflow.',
  'Terms and Agreement, Privacy policy, Data protection/HIPAA and other legal requirements',
  'How to contact prospective employee candidates on the GLOHSEN online platform',
  'The role of the Job Board',
  'What is a QUID? And what are the Transactions/Purse, Escrow, Returns and Withdrawal policies?',
  'Can employers be barred from the platform?',
  'Making the most of the GLOHSEN community as an employer- offline and online',
];

export default function EmployersHandbook() {
  return (
    <div className="min-h-screen bg-white text-gray-900 print:bg-white print:text-black">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="mb-8 text-center">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Employer Handbook" className="w-full max-h-64 object-cover rounded-lg shadow mb-4" />
          <h1 className="text-4xl font-bold text-[#ea384c] mb-2">EMPLOYERS’ HANDBOOK</h1>
          <p className="text-lg text-gray-700">A comprehensive guide for employers and organizations on the GLOHSEN platform.</p>
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
          <ol className="list-decimal ml-6 space-y-2">
            {sections.map((title, idx) => (
              <li key={idx}>
                <a href={`#section${idx+1}`} className="text-[#ea384c] hover:underline">{title}</a>
              </li>
            ))}
          </ol>
        </div>
        {/* Handbook Sections */}
        {sections.map((title, idx) => (
          <section key={idx} id={`section${idx+1}`} className="mb-12">
            <h3 className="text-xl font-bold mb-2 text-[#d12e42]">{idx+1}. {title}</h3>
            <div className="text-gray-800 text-base leading-relaxed">
              {(() => {
                switch(idx) {
                  case 0:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>GLOHSEN is a global healthcare platform connecting employers, professionals, students, and tutors for staffing, training, and HR solutions.</li>
                          <li>The GLOHSEN Standard ensures quality, ethical practice, and continuous improvement in healthcare delivery.</li>
                          <li>Employers benefit from a trusted network and advanced evaluation tools for hiring and workforce management.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?employer,healthcare,network" alt="GLOHSEN Standard" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 1:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>The GLOHSEN Employer Criteria Score and KPIs help you evaluate candidates objectively and efficiently.</li>
                          <li>EQ assessments and feedback systems ensure you hire professionals with the right skills and attitude.</li>
                          <li>Track your HR and staffing activities with analytics and performance dashboards.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?score,assessment,employer" alt="Employer Metrics" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 2:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Streamline recruitment and fill staffing gaps with pre-verified, high-quality professionals.</li>
                          <li>Save time and resources by using AI-powered matching and automated candidate screening.</li>
                          <li>Enhance your organization’s reputation and patient outcomes with better hiring decisions.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?hospital,staffing,workflow" alt="Employer Benefits" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 3:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>By using GLOHSEN, you agree to our Terms of Service and Privacy Policy, which protect your data and ensure compliance with legal standards (including HIPAA).</li>
                          <li>Employers must provide fair, objective feedback and follow all data protection rules.</li>
                          <li>All transactions and communications are secure and confidential.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?privacy,policy,employer" alt="Policy" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 4:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Contact candidates directly through the platform’s secure messaging and job board features.</li>
                          <li>Review candidate profiles, GLOHSEN Scores, and feedback before making hiring decisions.</li>
                          <li>All communications are logged for transparency and compliance.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?employer,contact,healthcare" alt="Contact Candidates" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 5:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Post job vacancies, set criteria, and manage applications through the Job Board.</li>
                          <li>Use advanced filters to find the best candidates for your needs.</li>
                          <li>Track job postings, interviews, and hiring outcomes in your dashboard.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?job,board,healthcare" alt="Job Board" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 6:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>QUID is the platform’s digital currency for payments, escrow, and withdrawals.</li>
                          <li>All transactions are protected by escrow until job completion and satisfaction.</li>
                          <li>Refunds and returns are handled according to platform policy; see your dashboard for details.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?finance,transaction,employer" alt="QUID and Transactions" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 7:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Employers who violate platform rules, provide false information, or act unethically may be barred from the platform.</li>
                          <li>All users must maintain professionalism and respect in all interactions.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?employer,discipline,policy" alt="Platform Policy" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 8:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Engage in community events, forums, and outreach to build your network and reputation.</li>
                          <li>Share feedback, participate in discussions, and contribute to the GLOHSEN ecosystem.</li>
                          <li>Leverage both online and offline opportunities for organizational growth and collaboration.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?employer,community,networking" alt="Community" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  default:
                    return null;
                }
              })()}
            </div>
          </section>
        ))}
        <div className="mt-12 text-center">
          <Link to="/" className="inline-block px-6 py-3 bg-[#ea384c] text-white rounded shadow hover:bg-[#d12e42]">Return to Home</Link>
        </div>
      </div>
      <Footer isActive={true} />
    </div>
  );
}
