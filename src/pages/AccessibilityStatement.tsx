
import React from 'react';
import PreHeader from '../components/PreHeader';
import { ScrollArea } from "@/components/ui/scroll-area";

const AccessibilityStatement: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <PreHeader currentPage="accessibility statement" />
      
      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Accessibility Statement</h1>
        
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">1. Our Commitment</h2>
                <p>GLOHSEN is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure we provide equal access to all users.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">2. Conformance Status</h2>
                <p>The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. GLOHSEN strives to conform to WCAG 2.1 Level AA standards. These guidelines explain how to make web content more accessible to people with a wide array of disabilities, including:</p>
                
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>Visual impairments</li>
                  <li>Hearing impairments</li>
                  <li>Physical limitations</li>
                  <li>Speech disabilities</li>
                  <li>Cognitive limitations</li>
                  <li>Language barriers</li>
                  <li>Photosensitivity</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">3. Accessibility Features</h2>
                <p className="mb-3">Our platform includes the following accessibility features:</p>
                
                <h3 className="text-xl font-medium mb-2">3.1. Navigation and Structure</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Consistent navigation across pages</li>
                  <li>Skip to content links</li>
                  <li>Logical tab order for keyboard navigation</li>
                  <li>ARIA landmarks for screen readers</li>
                  <li>Descriptive page titles</li>
                </ul>
                
                <h3 className="text-xl font-medium mb-2 mt-4">3.2. Visual Design</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>High contrast color ratios that meet WCAG 2.1 AA standards</li>
                  <li>Text resize functionality without loss of content</li>
                  <li>Alternative text for all informative images</li>
                  <li>Visual indicators for focused elements</li>
                  <li>Clear headings and content structure</li>
                </ul>
                
                <h3 className="text-xl font-medium mb-2 mt-4">3.3. Forms and Interactive Elements</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Properly labeled form controls</li>
                  <li>Error identification and suggestions</li>
                  <li>Adequate time to complete forms</li>
                  <li>No automatic submission on selection change</li>
                  <li>Focus control for user convenience</li>
                </ul>
                
                <h3 className="text-xl font-medium mb-2 mt-4">3.4. Media</h3>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Closed captions for video content</li>
                  <li>Transcripts for audio content</li>
                  <li>No auto-playing media</li>
                  <li>Audio description when necessary</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">4. Technology Used</h2>
                <p>GLOHSEN relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:</p>
                
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>HTML5</li>
                  <li>WAI-ARIA</li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                </ul>
                
                <p className="mt-3">These technologies are relied upon for conformance with the accessibility standards used.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">5. Assessment and Testing</h2>
                <p className="mb-3">Our approach to ensuring accessibility includes:</p>
                
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Regular automated testing using accessibility evaluation tools</li>
                  <li>Manual testing with screen readers (including NVDA and VoiceOver)</li>
                  <li>Keyboard navigation testing</li>
                  <li>User testing with people with disabilities</li>
                  <li>Continuous integration checks for accessibility in our development process</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">6. Known Limitations</h2>
                <p className="mb-3">While we strive to ensure the entire platform is accessible, some content may not yet be fully compliant with all accessibility standards. We are actively working to address the following known issues:</p>
                
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Some older PDF documents may not be fully accessible</li>
                  <li>Complex interactive charts may have limited accessibility for screen reader users</li>
                  <li>Third-party content and embedded resources may not meet all accessibility requirements</li>
                </ul>
                
                <p className="mt-3">We are working diligently to resolve these issues and improve accessibility throughout our platform.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">7. Feedback and Contact Information</h2>
                <p className="mb-3">We welcome your feedback on the accessibility of GLOHSEN. Please let us know if you encounter accessibility barriers:</p>
                
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Email: accessibility@glohsen.com</li>
                  <li>Phone: +1 (123) 456-7890</li>
                  <li>Feedback form: Available on our Contact page</li>
                </ul>
                
                <p className="mt-3">We aim to respond to accessibility feedback within 3 business days, and to propose a solution within 10 business days.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">8. Compatibility with User Tools</h2>
                <p className="mb-3">GLOHSEN is designed to be compatible with the following assistive technologies:</p>
                
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
                  <li>Screen magnification software</li>
                  <li>Speech recognition software</li>
                  <li>Keyboard-only navigation</li>
                </ul>
                
                <p className="mt-3">We support the latest versions of major browsers including Chrome, Firefox, Safari, and Edge.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">9. Additional Resources</h2>
                <p className="mb-3">For more information about web accessibility, we recommend the following resources:</p>
                
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><a href="https://www.w3.org/WAI/standards-guidelines/wcag/" className="text-amber-500 hover:text-amber-600">Web Content Accessibility Guidelines (WCAG)</a></li>
                  <li><a href="https://www.w3.org/WAI/" className="text-amber-500 hover:text-amber-600">Web Accessibility Initiative (WAI)</a></li>
                  <li><a href="https://www.a11yproject.com/" className="text-amber-500 hover:text-amber-600">The A11Y Project</a></li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">10. Ongoing Improvements</h2>
                <p>We are committed to continual improvement of our platform's accessibility. As part of this commitment, we regularly review our accessibility policies and procedures, conduct training for our team, and incorporate accessibility considerations into our design and development processes.</p>
              </section>
            </div>
          </ScrollArea>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">Last Updated: May 17, 2025</p>
          <p className="mt-2">
            <a href="/" className="text-amber-500 hover:text-amber-600">Return to Home</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default AccessibilityStatement;
