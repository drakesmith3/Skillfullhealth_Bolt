import React, { useState } from 'react';
import PreHeader from '../components/PreHeader';
import Footer from '../components/Footer';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your server/API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    
    // Reset submission status after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <PreHeader currentPage="contact us" />
      
      <main className="container mx-auto px-4 py-8 mt-16 mb-12 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center gradient-text">Contact Us</h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact information */}
            <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="mb-6">
                We're here to help! Whether you have questions about our services, need technical support, 
                or want to explore partnership opportunities, our team is ready to assist you.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                    <FaMapMarkerAlt className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Our Location</h3>
                    <p className="mt-1">
                      123 Healthcare Avenue<br />
                      Medical District<br />
                      Boston, MA 02115
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                    <FaPhone className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Phone</h3>
                    <p className="mt-1">
                      Main: (555) 123-4567<br />
                      Support: (555) 987-6543
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                    <FaEnvelope className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Email</h3>
                    <p className="mt-1">
                      General: info@glohsen.com<br />
                      Support: support@glohsen.com<br />
                      Careers: careers@glohsen.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                    <FaClock className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">Business Hours</h3>
                    <p className="mt-1">
                      Monday - Friday: 9:00 AM - 5:00 PM EST<br />
                      Saturday: 10:00 AM - 2:00 PM EST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
              
              {submitted ? (
                <div className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 p-4 rounded-md mb-6">
                  <p className="font-medium">Thank you for your message!</p>
                  <p>We have received your inquiry and will get back to you as soon as possible.</p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Your Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Billing Question">Billing Question</option>
                    <option value="Partnership Opportunity">Partnership Opportunity</option>
                    <option value="Career Inquiry">Career Inquiry</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Google Maps placeholder */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
            <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-center text-gray-500 dark:text-gray-400">
                Google Maps would be integrated here in a production environment.<br />
                For privacy and security reasons, it's displayed as a placeholder in this demo.
              </p>
            </div>
          </div>
          
          {/* FAQ section */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Contact Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-medium mb-2">What is your typical response time?</h3>
                <p>We aim to respond to all inquiries within 24-48 business hours. For urgent technical issues, 
                our support team prioritizes responses and typically replies within a few hours.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Do you offer phone support?</h3>
                <p>Yes, our customer service team is available by phone during regular business hours. 
                For technical issues, we recommend starting with an email or support ticket for better tracking.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">How can I request a demo?</h3>
                <p>You can request a demo by selecting "Partnership Opportunity" in the subject dropdown of our 
                contact form. A member of our sales team will reach out to schedule a personalized demonstration.</p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Where can I send press inquiries?</h3>
                <p>Media and press inquiries should be sent to press@glohsen.com. Please include your name, 
                organization, deadline, and a brief description of your request.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer isActive={false} />
    </div>
  );
};

export default ContactUs;
