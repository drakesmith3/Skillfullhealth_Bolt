import React, { useState, useEffect } from 'react';
import PreHeader from '@/components/PreHeader';
import Footer from '@/components/Footer';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQPage: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFooter(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-f5f5f5">
      <PreHeader currentPage="faq" />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center gradient-text">Frequently Asked Questions</h1>
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">General Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">What is GLOHSEN?</AccordionTrigger>
                    <AccordionContent>
                      GLOHSEN is a comprehensive healthcare education and career platform that connects 
                      professionals, employers, educators, and students. We provide skill assessment, 
                      job matching, educational resources, and community networking opportunities
                      specifically tailored to the healthcare sector.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left">What is the GLOHSEN Score?</AccordionTrigger>
                    <AccordionContent>
                      The GLOHSEN Score is our proprietary evaluation system that measures both technical 
                      knowledge and soft skills relevant to healthcare careers. It provides a holistic 
                      assessment of a professional's abilities and potential, helping employers identify 
                      qualified candidates and professionals understand their strengths and areas for development.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left">Who can use GLOHSEN?</AccordionTrigger>
                    <AccordionContent>
                      GLOHSEN is designed for healthcare professionals at all career stages, healthcare 
                      employers, educators, tutors, and students in healthcare fields. Whether you're 
                      a seasoned professional looking for new opportunities, an employer seeking qualified 
                      staff, or a student preparing for a healthcare career, our platform offers valuable 
                      resources and connections.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left">Is GLOHSEN available globally?</AccordionTrigger>
                    <AccordionContent>
                      Yes, GLOHSEN is accessible worldwide. However, job listings and some specific resources 
                      may be more concentrated in certain regions. We are continuously expanding our reach and 
                      building partnerships around the world to better serve the global healthcare community.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">For Professionals</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="pro-1">
                    <AccordionTrigger className="text-left">How do I calculate my GLOHSEN Score?</AccordionTrigger>
                    <AccordionContent>
                      To calculate your GLOHSEN Score, sign up for an account and complete our comprehensive 
                      assessment process. This includes technical knowledge tests, situational judgment scenarios, 
                      and skills verification. Once completed, you'll receive your score along with a detailed 
                      breakdown and personalized recommendations for improvement.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="pro-2">
                    <AccordionTrigger className="text-left">Will employers see my GLOHSEN Score?</AccordionTrigger>
                    <AccordionContent>
                      Yes, employers can see your GLOHSEN Score if you choose to make your profile visible in our 
                      job marketplace. You can control your privacy settings to determine what information is shared 
                      with employers. Your score can help you stand out to potential employers looking for candidates 
                      with your specific skill set.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="pro-3">
                    <AccordionTrigger className="text-left">How can I improve my GLOHSEN Score?</AccordionTrigger>
                    <AccordionContent>
                      After receiving your initial score, you'll get personalized recommendations for improvement. 
                      We offer targeted learning resources, practice assessments, and skill-building activities. 
                      You can retake the assessment after completing recommended development activities to see 
                      your improvement.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="pro-4">
                    <AccordionTrigger className="text-left">How do I find jobs on GLOHSEN?</AccordionTrigger>
                    <AccordionContent>
                      Visit our Job Board section where you can search for positions filtered by specialty, 
                      location, experience level, and more. Our matching algorithm also recommends jobs based 
                      on your GLOHSEN Score and profile information. You can apply directly through our platform 
                      to employers who are specifically looking for candidates with verified skills.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">For Employers</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="emp-1">
                    <AccordionTrigger className="text-left">How does GLOHSEN help with recruitment?</AccordionTrigger>
                    <AccordionContent>
                      GLOHSEN streamlines your recruitment process by providing access to pre-verified healthcare 
                      professionals with objectively measured skills. Our platform allows you to set specific criteria 
                      including minimum GLOHSEN Score requirements, specialty experience, and other qualifications. 
                      You'll receive applications only from candidates who meet your needs, saving time and resources.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="emp-2">
                    <AccordionTrigger className="text-left">How reliable is the GLOHSEN Score?</AccordionTrigger>
                    <AccordionContent>
                      The GLOHSEN Score is developed by healthcare and educational experts and regularly validated 
                      against industry standards. It combines objective knowledge assessments with evaluation of 
                      critical soft skills needed in healthcare environments. Our research shows strong correlation 
                      between higher GLOHSEN Scores and on-the-job performance measures.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="emp-3">
                    <AccordionTrigger className="text-left">How do I post job listings?</AccordionTrigger>
                    <AccordionContent>
                      After creating an employer account, you can post job listings through your dashboard. 
                      You'll be able to specify job details, required qualifications, preferred GLOHSEN Score range, 
                      and other criteria. Our system will help match your listing with appropriate candidates 
                      and provide tools to manage applications and communication.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="emp-4">
                    <AccordionTrigger className="text-left">What does it cost to use GLOHSEN as an employer?</AccordionTrigger>
                    <AccordionContent>
                      We offer various subscription plans for employers based on your organization's size and hiring needs. 
                      Plans range from basic job posting access to comprehensive recruitment solutions with advanced 
                      candidate filtering, bulk assessment options, and integration with your existing HR systems. 
                      Contact our sales team for current pricing or visit our pricing page.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">For Students</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="stu-1">
                    <AccordionTrigger className="text-left">Can students get a GLOHSEN Score?</AccordionTrigger>
                    <AccordionContent>
                      Yes, students can take a modified version of our assessment to receive a preliminary 
                      GLOHSEN Score. This helps identify strengths and areas for development before entering 
                      the job market. Student scores include additional educational recommendations and resources 
                      tailored to your career goals.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="stu-2">
                    <AccordionTrigger className="text-left">What resources does GLOHSEN offer for students?</AccordionTrigger>
                    <AccordionContent>
                      GLOHSEN provides students with educational games and quizzes, study resources, career planning 
                      tools, and networking opportunities with professionals and mentors. Our platform helps bridge 
                      the gap between academic learning and practical workplace skills, preparing you for a successful 
                      healthcare career.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="stu-3">
                    <AccordionTrigger className="text-left">How can I find a tutor on GLOHSEN?</AccordionTrigger>
                    <AccordionContent>
                      In the Tutors section of our platform, you can search for tutors based on specialty, 
                      availability, rating, and other criteria. Each tutor's profile displays their expertise, 
                      teaching approach, and reviews from other students. You can schedule sessions directly 
                      through our platform.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="stu-4">
                    <AccordionTrigger className="text-left">Are there discounts for students?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer special pricing for students with valid educational credentials. 
                      The student plan provides access to core assessment tools, learning resources, 
                      and community features at a reduced rate. Some institutions also partner with 
                      GLOHSEN to provide free or subsidized access to their students.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Technical Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="tech-1">
                    <AccordionTrigger className="text-left">How do I reset my password?</AccordionTrigger>
                    <AccordionContent>
                      To reset your password, click on the "Forgot Password" link on the login page. 
                      Enter your registered email address, and we'll send you a link to create a new password. 
                      For security, the link expires after 24 hours.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="tech-2">
                    <AccordionTrigger className="text-left">Is my data secure on GLOHSEN?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we take data security very seriously. We use industry-standard encryption, secure 
                      data storage practices, and regular security audits to protect your information. 
                      We comply with relevant data protection regulations and never share your personal 
                      information without your consent. For more details, please review our Privacy Policy.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="tech-3">
                    <AccordionTrigger className="text-left">Can I use GLOHSEN on mobile devices?</AccordionTrigger>
                    <AccordionContent>
                      Yes, GLOHSEN is fully responsive and works on smartphones and tablets. 
                      We also offer dedicated mobile apps for iOS and Android for an optimized 
                      mobile experience. You can access all core features, including assessments, 
                      job searching, and learning resources, on your mobile device.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="tech-4">
                    <AccordionTrigger className="text-left">How do I contact support?</AccordionTrigger>
                    <AccordionContent>
                      For technical support or any other questions, you can:
                      <ul className="list-disc list-inside mt-2">
                        <li>Use the live chat feature in the bottom right corner of any page</li>
                        <li>Email us at support@glohsen.com</li>
                        <li>Call our support line at (555) 123-4567 during business hours</li>
                        <li>Submit a help ticket through the Support section of your dashboard</li>
                      </ul>
                      Our support team is available Monday through Friday, 9am to 5pm EST.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
              
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                <p className="mb-4">We're here to help! Feel free to reach out to our team with any other questions or concerns.</p>
                <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300">
                  Contact Us
                </a>
              </div>
            </div>
          </ScrollArea>
        </div>
      </main>
      {showFooter && <Footer isActive={false} />}
    </div>
  );
};

export default FAQPage;
