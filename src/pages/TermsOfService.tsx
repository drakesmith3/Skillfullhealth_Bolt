import React from 'react';
import PreHeader from '../components/PreHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Footer from '../components/Footer';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <PreHeader currentPage="terms of service" />
      
      <main className="container mx-auto px-4 py-8 mt-16 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Terms of Service & Agreement</h1>
        
        <Tabs defaultValue="general" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="professionals">Professionals</TabsTrigger>
            <TabsTrigger value="employers">Employers</TabsTrigger>
            <TabsTrigger value="tutors">Tutors</TabsTrigger>
          </TabsList>

          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <TabsContent value="general">
              <h2 className="text-2xl font-semibold mb-4">General Terms</h2>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  <section>
                    <h3 className="text-xl font-medium mb-2">1. Acceptance of Terms</h3>
                    <p>By accessing or using the GLOHSEN Health Portal (the "Platform"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">2. Platform Description</h3>
                    <p>GLOHSEN is a comprehensive healthcare professional network that connects patients, healthcare professionals, employers, students, and tutors/advisers in an integrated platform.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">3. User Accounts</h3>
                    <p>3.1. You must register with a valid email address and phone number to use certain features of the Platform.</p>
                    <p>3.2. Each email address and phone number combination can only be used once to create a unique identification number (UNIS).</p>
                    <p>3.3. You are responsible for maintaining the confidentiality of your account information.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">4. Feedback Submission Policies</h3>
                    <p>4.1. Users may submit feedback about professionals, facilities, or tutors.</p>
                    <p>4.2. Feedback must be truthful, objective, and based on actual experiences.</p>
                    <p>4.3. If feedback is disputed, you may be required to provide evidence to support your claims.</p>
                    <p>4.4. Failure to provide evidence when requested may result in feedback removal.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">5. Dispute Resolution</h3>
                    <p>5.1. In case of disputes between users, GLOHSEN will act as a neutral intermediary.</p>
                    <p>5.2. GLOHSEN reserves the right to make final decisions regarding contested feedback or disputes.</p>
                    <p>5.3. Users agree to participate in the dispute resolution process in good faith.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">6. Account Termination</h3>
                    <p>6.1. GLOHSEN reserves the right to suspend or terminate accounts that violate these terms.</p>
                    <p>6.2. Users may delete their account at any time, but certain data may be retained as required by law.</p>
                    <p>6.3. Data retention policies apply even after account termination.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">7. Intellectual Property</h3>
                    <p>7.1. All content on the Platform is owned by or licensed to GLOHSEN.</p>
                    <p>7.2. Users retain ownership of content they create but grant GLOHSEN a non-exclusive license to use it.</p>
                    <p>7.3. Educational content created by tutors is subject to specific licensing terms.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">8. Limitation of Liability</h3>
                    <p>8.1. GLOHSEN is not liable for any indirect, incidental, or consequential damages.</p>
                    <p>8.2. GLOHSEN does not verify the accuracy of all user-submitted content.</p>
                    <p>8.3. Users rely on Platform information at their own risk.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">9. Changes to Terms</h3>
                    <p>9.1. GLOHSEN may modify these terms at any time.</p>
                    <p>9.2. Users will be notified of significant changes.</p>
                    <p>9.3. Continued use after changes constitutes acceptance of the new terms.</p>
                  </section>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="professionals">
              <h2 className="text-2xl font-semibold mb-4">Professional Terms</h2>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  <section>
                    <h3 className="text-xl font-medium mb-2">1. Professional Conduct Standards</h3>
                    <p>1.1. Healthcare professionals must adhere to the ethical standards of their profession.</p>
                    <p>1.2. Professionals must provide accurate information about their qualifications, experience, and skills.</p>
                    <p>1.3. Professionals must fulfill their commitments to employers and patients.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">2. GLOHSEN Score</h3>
                    <p>2.1. Professionals agree to have their profile evaluated according to the GLOHSEN Score system.</p>
                    <p>2.2. The GLOHSEN Score is calculated based on 10 parameters including experience, skills, and platform activity.</p>
                    <p>2.3. Professionals can improve their score by completing training, gaining certificates, and fulfilling locum jobs.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">3. Locum Job Requirements</h3>
                    <p>3.1. Professionals must complete at least 3 locum jobs through the platform to maintain certain benefits.</p>
                    <p>3.2. Professionals must provide notice if they cannot fulfill a locum commitment.</p>
                    <p>3.3. Professionals agree to be evaluated by employers after completing locum assignments.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">4. Skill Certification</h3>
                    <p>4.1. Professionals must complete at least 2 skills through the network.</p>
                    <p>4.2. To earn basic certification, professionals must correctly answer 10 questions per selected skill.</p>
                    <p>4.3. Advanced certification requires completion of relevant courses and certificate upload.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">5. Revenue Sharing</h3>
                    <p>5.1. Eligible professionals may receive annual revenue incentives (10%).</p>
                    <p>5.2. Revenue sharing is subject to active participation and good standing on the platform.</p>
                    <p>5.3. Payment terms and schedules are specified in the Professional Dashboard.</p>
                  </section>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="employers">
              <h2 className="text-2xl font-semibold mb-4">Employer Terms</h2>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  <section>
                    <h3 className="text-xl font-medium mb-2">1. Job Posting Requirements</h3>
                    <p>1.1. Employers must provide accurate and complete information about job opportunities.</p>
                    <p>1.2. Job postings must include clear requirements, compensation details, and duration.</p>
                    <p>1.3. Employers may not discriminate based on factors unrelated to job requirements.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">2. Candidate Selection</h3>
                    <p>2.1. Employers may use the Employer Criteria Score to evaluate candidates.</p>
                    <p>2.2. Employers agree to review candidates fairly based on qualifications and GLOHSEN Score.</p>
                    <p>2.3. Employers must notify selected and rejected candidates in a timely manner.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">3. Payment Terms</h3>
                    <p>3.1. Employers must fund their wallet before posting job opportunities.</p>
                    <p>3.2. Funds for professional services will be held in escrow until job completion.</p>
                    <p>3.3. Payment will be released to professionals upon satisfactory completion of services.</p>
                    <p>3.4. Platform fees apply to all transactions and are non-refundable.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">4. Professional Evaluation</h3>
                    <p>4.1. Employers must provide feedback on professionals after job completion.</p>
                    <p>4.2. Feedback must be fair, objective, and based on professional performance.</p>
                    <p>4.3. Employers may be required to substantiate negative feedback.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">5. Backup Professionals</h3>
                    <p>5.1. Every locum job must have two doctors assigned (primary and secondary).</p>
                    <p>5.2. The secondary doctor will be activated if the primary doctor withdraws.</p>
                    <p>5.3. Employers agree to accept the secondary professional if the primary is unavailable.</p>
                  </section>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="tutors">
              <h2 className="text-2xl font-semibold mb-4">Tutor Terms</h2>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  <section>
                    <h3 className="text-xl font-medium mb-2">1. Content Creation</h3>
                    <p>1.1. Tutors must create original educational content or properly cite sources.</p>
                    <p>1.2. Content must be accurate, up-to-date, and comply with medical standards.</p>
                    <p>1.3. Tutors are responsible for maintaining and updating their content.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">2. Intellectual Property Rights</h3>
                    <p>2.1. Tutors retain ownership of their created content but grant GLOHSEN a license to use it.</p>
                    <p>2.2. Tutors may not use copyrighted materials without permission.</p>
                    <p>2.3. GLOHSEN reserves the right to remove content that violates intellectual property rights.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">3. Revenue Sharing</h3>
                    <p>3.1. Tutors receive compensation based on course sales and user engagement.</p>
                    <p>3.2. Payment terms and schedules are specified in the Tutor Dashboard.</p>
                    <p>3.3. Platform fees apply to all transactions and are deducted automatically.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">4. Content Standards</h3>
                    <p>4.1. Educational content must meet quality standards set by GLOHSEN.</p>
                    <p>4.2. Content must not contain discriminatory, offensive, or inappropriate material.</p>
                    <p>4.3. Tutors must respond to student questions and provide support for their courses.</p>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-medium mb-2">5. Student Interaction</h3>
                    <p>5.1. Tutors must maintain professional relationships with students.</p>
                    <p>5.2. Communication must be conducted through platform channels.</p>
                    <p>5.3. Tutors must respect student privacy and confidentiality.</p>
                  </section>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">Last Updated: May 17, 2025</p>
          <p className="mt-2">
            <a href="/" className="text-amber-500 hover:text-amber-600">Return to Home</a>
          </p>
        </div>
      </main>
      <Footer isActive={false} />
    </div>
  );
};

export default TermsOfService;
