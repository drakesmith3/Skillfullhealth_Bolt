import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const sections = [
  'What is GLOHSEN and THE GLOHSEN STANDARD?',
  'Why join GLOHSEN as a student?',
  'Terms and Agreement, Privacy policy, Data protection/HIPAA and other legal requirements',
  'Ways you can make money on the GLOHSEN online platform- moderate community discussions, win competitions, etc',
  'How to become a Creator/Tutor on the platform',
  'How to participate in Games/Quizzes/Competitions',
  'Can a student get kicked off the platform?',
  'Making the most of the GLOHSEN community as a student- offline and online',
];

export default function StudentsHandbook() {
  return (
    <div className="min-h-screen bg-white text-gray-900 print:bg-white print:text-black">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="mb-8 text-center">
          <img src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80" alt="Student Handbook" className="w-full max-h-64 object-cover rounded-lg shadow mb-4" />
          <h1 className="text-4xl font-bold text-[#ea384c] mb-2">STUDENTS’ HANDBOOK</h1>
          <p className="text-lg text-gray-700">A comprehensive guide for students and learners on the GLOHSEN platform.</p>
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
        <section id="section1" className="mb-12">
          <h3 className="text-xl font-bold mb-2 text-[#d12e42]">1. What is GLOHSEN and THE GLOHSEN STANDARD?</h3>
          <div className="text-gray-800 text-base leading-relaxed">
            <ul className="list-disc ml-6 mb-4">
              <li>GLOHSEN (21st Century Global Health Services Network) is a global training and staffing/HR network for African health professionals, focused on skill-building, career growth, and health sector leadership.</li>
              <li>Emphasizes preventive, perfect-health-maintenance-oriented medicine and personal entrepreneurship for all members.</li>
              <li>Offers a supportive ecosystem for students, professionals, employers, and tutors to learn, grow, and connect.</li>
            </ul>
            <img src="https://source.unsplash.com/800x200/?global,health,students" alt="GLOHSEN Standard" className="my-4 rounded shadow print:hidden" />
          </div>
        </section>
        <section id="section2" className="mb-12">
          <h3 className="text-xl font-bold mb-2 text-[#d12e42]">2. Why join GLOHSEN as a student?</h3>
          <div className="text-gray-800 text-base leading-relaxed">
            <ul className="list-disc ml-6 mb-4">
              <li>Access a marketplace of skill acquisition, training, and mentorship from top professionals and tutors.</li>
              <li>Participate in interactive games, quizzes, and competitions to reinforce learning and win prizes.</li>
              <li>Connect with mentors, join study communities, and get support for your academic and career journey.</li>
              <li>Earn badges and certificates to showcase your skills and progress.</li>
            </ul>
            <img src="https://source.unsplash.com/800x200/?student,mentor,learning" alt="Why Join GLOHSEN" className="my-4 rounded shadow print:hidden" />
          </div>
        </section>
        <section id="section3" className="mb-12">
          <h3 className="text-xl font-bold mb-2 text-[#d12e42]">3. Terms and Agreement, Privacy policy, Data protection/HIPAA and other legal requirements</h3>
          <div className="text-gray-800 text-base leading-relaxed">
            <ul className="list-disc ml-6 mb-4">
              <li>By joining, you agree to GLOHSEN’s Terms of Service and Privacy Policy, which protect your data and privacy in line with global standards (including HIPAA where applicable).</li>
              <li>All members must respect the platform’s code of conduct and data protection rules.</li>
              <li>Certificates and licenses are tracked for validity, and you’ll be notified of expirations.</li>
            </ul>
            <img src="https://source.unsplash.com/800x200/?privacy,policy,student" alt="Policy" className="my-4 rounded shadow print:hidden" />
          </div>
        </section>
        <section id="section4" className="mb-12">
          <h3 className="text-xl font-bold mb-2 text-[#d12e42]">4. Ways you can make money on the GLOHSEN online platform</h3>
          <div className="text-gray-800 text-base leading-relaxed">
            <ul className="list-disc ml-6 mb-4">
              <li>Moderate community discussions and earn rewards for valuable contributions.</li>
              <li>Win competitions, quizzes, and games with cash prizes and scholarships.</li>
              <li>Participate in research, surveys, and platform activities for incentives.</li>
            </ul>
            <img src="https://source.unsplash.com/800x200/?student,competition,prize" alt="Earn on GLOHSEN" className="my-4 rounded shadow print:hidden" />
          </div>
        </section>
        <section id="section5" className="mb-12">
          <h3 className="text-xl font-bold mb-2 text-[#d12e42]">5. How to become a Creator/Tutor on the platform</h3>
          <div className="text-gray-800 text-base leading-relaxed">
            <ul className="list-disc ml-6 mb-4">
              <li>Apply to become a content-adviser (tutor) and share your expertise with peers.</li>
              <li>Meet the guidelines for quality course content and update your materials annually.</li>
              <li>Earn recognition, badges, and even revenue for your contributions.</li>
            </ul>
            <img src="https://source.unsplash.com/800x200/?teaching,student,mentor" alt="Become a Tutor" className="my-4 rounded shadow print:hidden" />
          </div>
        </section>
        <section id="section6" className="mb-12">
          <h3 className="text-xl font-bold mb-2 text-[#d12e42]">6. How to participate in Games/Quizzes/Competitions</h3>
          <div className="text-gray-800 text-base leading-relaxed">
            <ul className="list-disc ml-6 mb-4">
              <li>Join platform-hosted games and quizzes to test your knowledge and win prizes.</li>
              <li>Compete with peers, climb leaderboards, and earn badges for top performance.</li>
              <li>Use these activities to reinforce learning and gain practical skills.</li>
            </ul>
            <img src="https://source.unsplash.com/800x200/?quiz,competition,student" alt="Games and Quizzes" className="my-4 rounded shadow print:hidden" />
          </div>
        </section>
        <section id="section7" className="mb-12">
          <h3 className="text-xl font-bold mb-2 text-[#d12e42]">7. Can a student get kicked off the platform?</h3>
          <div className="text-gray-800 text-base leading-relaxed">
            <ul className="list-disc ml-6 mb-4">
              <li>Yes. Students who violate the platform’s code of conduct, engage in dishonest behavior, or sabotage the network may have their membership revoked.</li>
              <li>Respect, honesty, and professionalism are required at all times.</li>
            </ul>
            <img src="https://source.unsplash.com/800x200/?student,discipline,policy" alt="Platform Policy" className="my-4 rounded shadow print:hidden" />
          </div>
        </section>
        <section id="section8" className="mb-12">
          <h3 className="text-xl font-bold mb-2 text-[#d12e42]">8. Making the most of the GLOHSEN community as a student- offline and online</h3>
          <div className="text-gray-800 text-base leading-relaxed">
            <ul className="list-disc ml-6 mb-4">
              <li>Engage in study groups, forums, and community events to build your network and skills.</li>
              <li>Seek mentorship, participate in outreach, and contribute to discussions for personal and professional growth.</li>
              <li>Take advantage of both online and offline opportunities for learning and collaboration.</li>
            </ul>
            <img src="https://source.unsplash.com/800x200/?student,community,networking" alt="Community" className="my-4 rounded shadow print:hidden" />
          </div>
        </section>
        <div className="mt-12 text-center">
          <Link to="/" className="inline-block px-6 py-3 bg-[#ea384c] text-white rounded shadow hover:bg-[#d12e42]">Return to Home</Link>
        </div>
      </div>
      <Footer isActive={true} />
    </div>
  );
}
