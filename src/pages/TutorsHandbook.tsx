import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const sections = [
  'What is GLOHSEN AND THE GLOHSEN STANDARD?',
  'Why join GLOHSEN as a Tutor/Adviser?',
  'Terms and Agreement, Privacy policy, Data protection/HIPAA and other legal requirements',
  'How to become a Creator/Tutor on the platform',
  'What is a QUID? And what are the Transactions/Purse, Escrow, Returns and Withdrawal policies?',
  'How to create a Course…then, create Games/Quizzes/Competitions from it.',
  'How to price courses',
  'Can a tutor have their course removed or, get kicked off the platform?',
  'Making the most of the GLOHSEN community as a tutor- offline and online',
];

export default function TutorsHandbook() {
  return (
    <div className="min-h-screen bg-white text-gray-900 print:bg-white print:text-black">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="mb-8 text-center">
          <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80" alt="Tutor Handbook" className="w-full max-h-64 object-cover rounded-lg shadow mb-4" />
          <h1 className="text-4xl font-bold text-[#ea384c] mb-2">TUTORS’ HANDBOOK</h1>
          <p className="text-lg text-gray-700">A comprehensive guide for tutors and creators on the GLOHSEN platform.</p>
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
                          <li>GLOHSEN is a global platform for healthcare education, staffing, and professional development.</li>
                          <li>The GLOHSEN Standard ensures high-quality, ethical, and up-to-date educational content for all users.</li>
                          <li>Tutors play a key role in shaping the next generation of healthcare professionals.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?tutor,education,standard" alt="GLOHSEN Standard" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 1:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Share your expertise, build your reputation, and earn revenue by teaching on GLOHSEN.</li>
                          <li>Access tools for course creation, student analytics, and interactive teaching.</li>
                          <li>Join a supportive community of educators and professionals.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?tutor,mentor,teaching" alt="Why Join GLOHSEN" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 2:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>By joining, you agree to GLOHSEN’s Terms of Service and Privacy Policy, which protect your data and intellectual property.</li>
                          <li>All tutors must provide accurate, original content and respect copyright laws.</li>
                          <li>Data protection and dispute resolution policies apply to all users.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?privacy,policy,tutor" alt="Policy" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 3:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Apply to become a Creator/Tutor by submitting your credentials and sample content.</li>
                          <li>Once approved, you can create courses, quizzes, and games for students and professionals.</li>
                          <li>Maintain high standards and update your materials regularly to keep your status.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?tutor,application,education" alt="Become a Tutor" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 4:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>QUID is the platform’s digital currency for course sales, rewards, and withdrawals.</li>
                          <li>All transactions are managed securely, with clear policies for escrow, returns, and withdrawals.</li>
                          <li>Revenue is tracked in your dashboard, and platform fees apply to all transactions.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?finance,transaction,tutor" alt="QUID and Transactions" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 5:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Create a course by outlining your content, uploading materials, and setting learning objectives.</li>
                          <li>Develop games, quizzes, and competitions to reinforce learning and engage students.</li>
                          <li>Monitor student progress and feedback to improve your offerings.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?course,creation,quiz" alt="Create a Course" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 6:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Set course prices based on content depth, duration, and market demand.</li>
                          <li>Offer discounts or bundles to attract more students.</li>
                          <li>Review platform guidelines for pricing and revenue sharing.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?pricing,education,tutor" alt="Price Courses" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 7:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Tutors who violate platform rules, provide false information, or submit low-quality content may have their courses removed or lose platform access.</li>
                          <li>Maintain professionalism and adhere to all guidelines to remain in good standing.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?tutor,discipline,policy" alt="Platform Policy" className="my-4 rounded shadow print:hidden" />
                      </>
                    );
                  case 8:
                    return (
                      <>
                        <ul className="list-disc ml-6 mb-4">
                          <li>Engage in community forums, events, and collaborations to expand your reach and impact.</li>
                          <li>Mentor students, participate in outreach, and contribute to educational discussions.</li>
                          <li>Leverage both online and offline opportunities for professional growth and networking.</li>
                        </ul>
                        <img src="https://source.unsplash.com/800x200/?tutor,community,networking" alt="Community" className="my-4 rounded shadow print:hidden" />
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
