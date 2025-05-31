import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const sections = [
  'What is GLOHSEN AND THE GLOHSEN STANDARD?',
  'What are our evaluating metrics- the GLOHSEN Score, Professional Candidate KPIs, EQ assessment, and the Feedback system?',
  'Why join GLOHSEN as a professional?',
  'Terms and Agreement, Privacy policy, Data protection/HIPAA and other legal requirements',
  'What is a QUID? And what are the MLM/Affiliate marketing, Transactions/Purse, Escrow and Withdrawal policies?',
  'Ways you can make money on the GLOHSEN online platform – Locum, Job offers, Games/Quizzes/Competitions, etc.',
  'How to become a Creator/Tutor on the platform',
  'How to participate in Games/Quizzes/Competitions',
  'Can people get kicked off the platform/organisation?',
  'Making the most of the GLOHSEN community as a professional- offline and online',
];

export default function ProfessionalsHandbook() {
  return (
    <div className="min-h-screen bg-white text-gray-900 print:bg-white print:text-black">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="mb-8 text-center">
          <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80" alt="Professional Handbook" className="w-full max-h-64 object-cover rounded-lg shadow mb-4" />
          <h1 className="text-4xl font-bold text-[#ea384c] mb-2">PROFESSIONALS’ HANDBOOK</h1>
          <p className="text-lg text-gray-700">A comprehensive guide for healthcare professionals on the GLOHSEN platform.</p>
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
                          <li>GLOHSEN is a global healthcare professional network connecting professionals, employers, students, and tutors for career growth, education, and job opportunities.</li>
                          <li>The GLOHSEN Standard emphasizes ethical practice, continuous learning, and preventive, patient-centered care.</li>
                          <li>Professionals benefit from a supportive ecosystem for skill-building, networking, and leadership development.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?healthcare,professional,network" alt="GLOHSEN Standard" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 1:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>The GLOHSEN Score is a comprehensive evaluation of your experience, skills, certifications, and platform activity.</li>
                          <li>Professional Candidate KPIs and EQ assessments help you track and improve your performance.</li>
                          <li>The feedback system ensures transparency and helps you build a strong professional reputation.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?score,assessment,feedback" alt="GLOHSEN Score" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 2:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Access exclusive job opportunities, locum positions, and continuing education resources.</li>
                          <li>Showcase your verified skills and credentials to employers using your GLOHSEN Score.</li>
                          <li>Join a trusted community of healthcare professionals and grow your career with support and recognition.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?doctor,career,opportunity" alt="Why Join GLOHSEN" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 3:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>By joining, you agree to GLOHSEN’s Terms of Service and Privacy Policy, which protect your data and privacy in line with global standards (including HIPAA where applicable).</li>
                          <li>All professionals must provide accurate information and uphold ethical standards.</li>
                          <li>Data protection, intellectual property, and dispute resolution policies apply to all users.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?privacy,policy,doctor" alt="Policy" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 4:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>QUID is the platform’s digital currency for transactions, rewards, and withdrawals.</li>
                          <li>MLM/Affiliate marketing lets you earn commissions for referrals (up to 3 levels deep).</li>
                          <li>All transactions are managed securely with escrow and withdrawal policies for your protection.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?finance,transaction,doctor" alt="QUID and Transactions" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 5:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Earn through locum jobs, permanent job offers, and participating in games, quizzes, and competitions.</li>
                          <li>Contribute to the community, moderate discussions, and receive rewards for valuable input.</li>
                          <li>Refer colleagues and earn multi-level commissions via the MLM system.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?doctor,earnings,competition" alt="Earning on GLOHSEN" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 6:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Apply to become a Creator/Tutor and share your expertise with the community.</li>
                          <li>Create courses, quizzes, and educational content to help others and earn recognition or revenue.</li>
                          <li>Meet quality standards and update your materials regularly to maintain your status.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?doctor,teaching,mentor" alt="Become a Tutor" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 7:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Join platform-hosted games, quizzes, and competitions to test your knowledge and win prizes.</li>
                          <li>Compete with peers, climb leaderboards, and earn badges for top performance.</li>
                          <li>Use these activities to reinforce learning and gain practical skills.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?quiz,competition,doctor" alt="Games and Quizzes" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 8:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Yes. Professionals who violate the platform’s code of conduct, provide false information, or act unethically may be removed from the platform.</li>
                          <li>Respect, honesty, and professionalism are required at all times.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?doctor,discipline,policy" alt="Platform Policy" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 9:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Engage in forums, events, and community activities to expand your network and skills.</li>
                          <li>Mentor others, participate in outreach, and contribute to discussions for professional growth.</li>
                          <li>Leverage both online and offline opportunities for learning and collaboration.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?doctor,community,networking" alt="Community" className="my-4 rounded shadow print:hidden" />
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
