
# GLOHSEN - Global Health Services Solutions Network - Health Portal

![GLOHSEN](https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400)

## Overview
GLOHSEN is a revolutionary healthcare professional network that connects patients, healthcare professionals, employers, students, and tutors/advisers in an integrated platform. The platform features a cutting-edge UI with a Sudden Shift Parallax Storytelling Effect to provide an immersive user experience.

## Features

### For Healthcare Professionals
- Calculate your GLOHSEN Score across 10 key parameters
- Create a professional profile to showcase skills and certifications
- Connect with employers for job opportunities
- Access training resources and certification programs
- Financial tracking with wallet functionality

### For Patients
- Provide feedback on healthcare services
- Find qualified healthcare professionals
- Track your healthcare journey

### For Students
- Access games and quizzes for healthcare education
- Connect with mentors and tutors
- Purchase courses from healthcare educators
- Track learning progress

### For Tutors/Advisers
- Create and sell courses
- Mentor students
- Use AI to enhance teaching capabilities

### For Employers
- Find qualified healthcare professionals using the Employer Criteria Score
- Track performance metrics of employees
- Streamline recruitment processes
- Manage payments and HR workflows

## Technical Features
- Book-like page turning animations
- Smooth visual transitions between sections
- Interactive progress indicators
- Dust particle effects and sound effects
- Responsive design for all device sizes
- Wallet functionality for financial transactions

## GLOHSEN Score System
The GLOHSEN Score is calculated based on 10 key parameters:
1. Years of experience
2. Skills and certifications
3. Locum jobs executed
4. Platform activity
5. Willingness to volunteer or work in diverse conditions
6. Location
7. Communication skills and languages
8. Availability for extended work periods
9. Short-term availability
10. Immediate availability to work

## Employer Criteria Score
The platform features a 9-parameter Employer Criteria Score:
1. Years of experience requirements
2. Basic skills certificates needed
3. Advanced skills certificates needed
4. Job-related experience requirements
5. Flexibility in terms
6. Location preferences
7. Communication skill requirements
8. Remote work requirements
9. Availability requirements

## Vision
GLOHSEN aims to create a HIGH-VALUE 21st CENTURY NETWORK of healthcare professionals equipped with skills 'FIT FOR THE (AFRICAN) MARKETPLACE'. Our platform serves as a marketplace for the trading of medical skills (training, learning, sharing) and networking in an environment of mutual respect and benefits.

## Our Maxim
OBSERVE/SEE one, PERFORM/DO one, TEACH one!

## Getting Started
To get started with GLOHSEN:
1. Sign up for an account as a professional, employer, student, or tutor
2. Complete your profile
3. Explore the features relevant to your role
4. Connect with other users in the GLOHSEN community

## Development
This project is built using:
- React with TypeScript for the frontend
- Tailwind CSS for styling
- GSAP for animations
- Framer Motion for UI interactions
- Shadcn UI components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

For questions or support, please contact the GLOHSEN team at info@glohsen.com





GLOHSEN Health Portal


## Features

- **Professional Dashboard:** A central dashboard for healthcare professionals to manage their profile, jobs, earnings, and professional activities
- **GLOHSEN Score System:** A proprietary scoring algorithm to evaluate healthcare professionals and track student academic progress
- **Locum Job Board:** Find and apply for locum positions that match your skills and preferences
- **CME Courses:** Access continuing medical education courses to enhance your professional skills
- **Student Learning:** Comprehensive educational platform for medical students with course purchasing and tracking
- **Games & Quizzes:** Interactive medical games and quizzes for learning and assessment with reward opportunities
- **Wallet & Transactions:** Manage earnings, purchases, and withdrawals for professionals, students, and tutors
- **Profile Management:** Manage your professional or student profile, certificates, and skills
- **Community Forum:** Connect with peers in your medical specialty and earn rewards through moderation
- **Feedback System:** Multi-stakeholder feedback collection for continuous improvement
- **Employer Dashboard:** Tools for healthcare facilities to post jobs and find qualified professionals
- **Enhanced Security:** HIPAA-compliant data protection with end-to-end encryption
- **Accessibility:** WCAG 2.0 AA compliant for inclusive user experience
- **Hackathons & Rewards:** Opportunities for students to create educational content and earn prizes

## Technology Stack

- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Router DOM
- Tanstack Query
- Lucide React Icons
- Recharts for data visualization

## Project Structure

- `/src`: Source files
  - `/components`: Reusable UI components
    - `/ui`: Shadcn UI components
  - `/pages`: Page components for each route
  - `/hooks`: Custom React hooks
  - `/lib`: Utility functions and configuration
  - `/constants`: Constants used throughout the application
- `/docs`: Documentation
  - `ACCESSIBILITY.md`: Accessibility guidelines and standards
  - `COMPONENT-ACCESSIBILITY.md`: Accessible component patterns
  - `TAILWIND-ACCESSIBILITY.md`: Tailwind CSS accessibility practices  - `ACCESSIBILITY-TESTING.md`: Accessibility testing procedures  - `ACCESSIBILITY-WORKFLOW.md`: Accessibility-first development workflow
  - `ACCESSIBILITY-CI.md`: CI/CD configuration for accessibility
  - `CONTRAST-FIXES.md`: Guidelines for fixing contrast issues
  - `SVG-ACCESSIBILITY.md`: Accessible SVG and icon guidelines
  - `CHART-ACCESSIBILITY.md`: Accessible charts and data visualizations

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/glohsen-health-portal.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Accessibility Testing

The GLOHSEN Health Portal is committed to maintaining WCAG 2.0 AA compliance. Use these commands to test accessibility:

```bash
# Run automated accessibility tests
npm run test:a11y

# Generate accessibility report
npm run test:a11y:report

# Test color contrast specifically
npm run test:contrast

# Run Lighthouse CI for performance and accessibility
npm run lighthouse
```

Read our [Accessibility Workflow](./docs/ACCESSIBILITY-WORKFLOW.md) guide to learn how to integrate accessibility testing into your development process.

## Color Theme

The GLOHSEN Health Portal uses the following color theme:
- Gold: #F9D75D (Primary brand color, updated for better accessibility)
- Off-white: #F5F5F5 (Background)
- Red: #ea384c (Accent/Alert)
- Black: #000000 (Text)
- Gray: Various shades for UI elements

For accessibility guidelines and contrast requirements, see the [ACCESSIBILITY.md](./ACCESSIBILITY.md) document.

## Key Pages

### Professional User Pages
- **Home**: Landing page with key features and information
- **Professional Dashboard**: Main user dashboard with professional information
- **GLOHSEN Score**: Details about the user's professional score
- **Job Board**: Available locum positions
- **Wallet Transaction**: Manage earnings and withdrawals
- **Games & Quizzes**: Interactive learning content

### Employer Pages
- **Employer Dashboard**: Manage job postings and applicants
- **Employer KPI**: Track key performance indicators
- **Employer Payment**: Fund wallet and manage payments
- **Employer Criteria**: Set criteria for candidate selection
- **Employer Feedback**: View and manage feedback about the facility and submit feedback about professionals

### Tutor Pages
- **Tutor Dashboard**: Manage courses and students
- **Tutor Wallet**: Track earnings and withdrawals
- **Tutor Feedback**: Access student feedback and course ratings

### Student Pages
- **Student Dashboard**: Main dashboard with academic overview
- **Courses**: Browse, purchase, and access enrolled courses
- **Exams & Assessments**: Schedule and track upcoming exams
- **Progress Tracker**: Monitor academic progress and skill development
- **Study Planner**: Set and track study goals
- **Medical Library**: Access study materials and resources
- **Community Forum**: Participate in healthcare discussions
- **Find a Tutor**: Connect with tutors, mentors, and advisers
- **Practice Quizzes**: Interactive learning assessments
- **Student Wallet**: Manage course purchases and earned rewards
- **Hackathons**: Join events to create educational content for prizes

### Common Pages
- **Account Settings**: User account management
- **Notifications**: System notifications
- **Feedback**: 
  - Multi-tab interface for collecting stakeholder-specific feedback
  - Professionals tab for healthcare professional feedback
  - Hospitals/Health Facilities tab for facility feedback
  - Tutors/Advisers tab for educational resource feedback
  - Community forum link section for related discussions
  - Feedback routing to relevant user dashboards for registered members
  - Unmatched feedback categorization for non-registered entities
- **Terms of Service & Agreement**:
  - Comprehensive user agreement outlining platform usage rules
  - Specific sections for each user type (professionals, employers, tutors)
  - Feedback submission policies and verification requirements
  - Dispute resolution procedures for contested feedback
  - Account termination conditions and data retention policies
  - Professional conduct standards for healthcare providers
  - Payment terms and escrow system rules
  - Intellectual property rights for educational content
  - Platform liability limitations and disclaimers
  - Regular updates with change notification procedures
- **Privacy Policy**: Platform privacy guidelines
- **FAQ**: Frequently asked questions
- **About Us**: Information about the platform
- **Contact Us**: Contact information and form
- **Community**: Discussion forums for healthcare professionals
- **Blog**: Industry insights and updates
- **Testimonials**: Success stories from platform users

## User Flows

1. **Healthcare Professional Flow**:
   - Sign up and create profile
   - Complete verification process
   - Receive GLOHSEN Score
   - Browse and apply for jobs
   - Get hired and complete locum assignments
   - Receive payment in wallet
   - Withdraw funds
   - Provide feedback on platform experience

2. **Employer Flow**:
   - Sign up as healthcare facility
   - Fund wallet
   - Post job openings
   - Review applicants and their GLOHSEN Scores
   - Interview and hire professionals
   - Place payment in escrow
   - Release payment upon job completion
   - Provide feedback on professionals and platform

3. **Tutor Flow**:
   - Sign up as medical educator
   - Create courses, games, and quizzes
   - Earn from student enrollments
   - Withdraw earnings from wallet
   - Provide feedback on educational resources

4. **Student Flow**:
   - Sign up and create student profile
   - Browse and purchase courses using wallet system
   - Connect with tutors, mentors, and advisers for personalized learning
   - Access and complete interactive quizzes and games for skill development
   - Track academic progress and GLOHSEN score
   - Participate in community forum discussions with healthcare professionals
   - Join hackathons to create educational games and quizzes for prizes
   - Earn rewards through forum moderation and content creation
   - Manage earnings and prizes through integrated wallet functionality
   - Submit feedback on courses, tutors, and platform experience
   - Access study materials and resources in the medical library
   - View personalized course recommendations based on academic progress
   - Schedule and track exams and assessments
   - Monitor study time and set learning goals
   - Download progress reports and achievement certificates

5. **Feedback System Flow**:
   - Users access feedback forms via multiple entry points:
     - Home page feedback buttons
     - Scanning entity-specific QR codes in healthcare facilities
     - Following QR code links received via email after services
     - Direct links from dashboards
   - Accept Privacy Policy and Terms & Conditions with explicit verification clause
   - Select appropriate stakeholder category (Professional, Hospital/Health Facility, Tutor/Adviser)
   - Submit feedback through category-specific form (can be anonymous)
   - Feedback is directed to relevant user dashboards if the subject is a registered member
   - Unmatched feedback is categorized separately for review
   - Users can access Community Forum through links on the feedback page
   - If feedback is disputed, submitter may be contacted to provide evidence
   - Failure to provide evidence when requested results in feedback removal

6. **Security & Privacy Flow**:
   - New users complete security setup during onboarding
   - Set up two-factor authentication
   - Customize privacy and data sharing preferences
   - Regular security health check notifications
   - Automated suspicious activity detection and alerting
   - Security audit logging for all sensitive operations
   - Simplified data access and export request process

## Responsive Design

The application is fully responsive and optimized for:
- Desktop: Full-featured experience
- Tablet: Adapted layout with all functionality
- Mobile: Streamlined interface for on-the-go access

## Feedback System

The GLOHSEN Health Portal features a comprehensive feedback system that serves multiple stakeholders:

### Feedback Collection

- **Home Page Integration**: Feedback buttons on the home page direct users to the General Feedback page
- **QR Code Access**: Scannable QR codes for quick feedback submission
  - Physical QR codes in healthcare facilities linked to the feedback system
  - Dynamically generated QR codes for specific professionals or services
  - Digital QR codes that can be shared via email after service completion
- **Stakeholder-Specific Forms**: Separate tabs for different user categories
  - PROFESSIONALS tab - For feedback about healthcare professionals
  - HOSPITALS/HEALTH FACILITY tab - For feedback about healthcare facilities
  - TUTORS/ADVISERS tab - For feedback about educational content providers

### Feedback Routing

- **Registered Member Feedback**: Automatically routed to relevant user dashboards
- **Unmatched Feedback**: Categorized separately when the subject is not a registered user
- **Community Integration**: Links to relevant Community Forum discussions below feedback forms

### Dashboard Integration

- **Professional Dashboard**: Dedicated feedback tab showing employer and patient ratings
- **Employer Dashboard**: Feedback section for professionals who have worked at the facility
- **Tutor Dashboard**: Student feedback and course ratings
- **Student Dashboard**: Course and tutor rating system with feedback history
- **Feedback Metrics**: Analytics on feedback trends for continuous improvement

### Quality Assurance

- **Feedback Moderation**: Review process to ensure constructive feedback
- **Response System**: Allows users to respond to feedback about them
- **Dispute Resolution**: Process for addressing contested feedback
- **Verification Requirements**: 
  - Anonymous feedback permitted but subject to verification if disputed
  - Submitters agree to provide evidence if called upon to defend feedback
  - Non-compliance with verification requests results in feedback removal
  - Agreement to Privacy Policy and Terms of Service required before submission

### Feedback Newsfeed

The GLOHSEN Health Portal includes a real-time Feedback Newsfeed feature that provides a social media-style experience for viewing and interacting with user feedback:

#### Key Capabilities

- **Real-Time Updates**: View feedback as it's submitted across the platform
- **Infinite Scroll**: Seamlessly load more feedback as you scroll, similar to popular social media platforms
- **Category Filtering**: Automatically filters based on the selected tab (Professionals, Facilities, or Tutors)
- **Interactive Cards**: Each feedback card links directly to relevant discussions in the Community Forum
- **Social Engagement**: Shows likes, verification status, and timestamps for all feedback

#### User Benefits

- **Transparency**: See authentic healthcare experiences from other users
- **Community Engagement**: Easily join discussions about specific feedback
- **Decision Support**: Make informed choices based on others' experiences
- **Seamless Experience**: Enjoy a familiar social media-like interface

#### Technical Implementation

- Built with React and TypeScript for optimal performance
- Uses Intersection Observer API for efficient infinite scrolling
- Fully responsive design works across all device sizes
- Comprehensive accessibility support with ARIA attributes
- Strict content security protocols for safe user interactions

To explore the Feedback Newsfeed, navigate to the Feedback page and scroll down past the feedback form to see real-time submissions.

## Student Experience & Rewards

The GLOHSEN Health Portal offers a comprehensive learning experience for medical students with integrated rewards and earning opportunities:

### Course Marketplace

- **Course Discovery**: Browse courses by specialty, topic, or instructor rating
- **Detailed Previews**: View course syllabus, instructor credentials, and student reviews before purchase
- **Flexible Payment Options**: Pay for courses using credit/debit cards or GLOHSEN wallet balance
- **Course Bundles**: Save by purchasing related courses as discounted bundles
- **Subscription Options**: Access premium course collections through monthly or annual subscriptions
- **Course Wishlist**: Save interesting courses for future purchase

### Learning Experience

- **Interactive Content**: Engage with multimedia learning materials optimized for retention
- **Progress Tracking**: Visual progress indicators across enrolled courses
- **Self-Assessment**: Regular knowledge checks with instant feedback
- **Study Planning**: Tools to schedule study sessions and track learning goals
- **Mobile Access**: Continue learning on-the-go with responsive mobile design
- **Offline Downloads**: Save course materials for offline study sessions

### Quiz & Game Platform

- **Skill-Based Quizzes**: Test and improve medical knowledge through interactive assessments
- **Competitive Games**: Participate in timed challenges against peers on medical topics
- **Leaderboards**: Track your performance against other students in your specialty
- **Knowledge Maps**: Visualize your strengths and areas for improvement
- **Adaptive Difficulty**: Questions that adjust based on your performance level
- **Instant Feedback**: Detailed explanations for all questions to reinforce learning

### Community Engagement

- **Specialty Forums**: Join discussions specific to your medical specialty
- **Study Groups**: Create or join virtual study groups with peers
- **Expert Panels**: Participate in Q&A sessions with healthcare professionals
- **Case Discussions**: Analyze and discuss real-world medical cases
- **Peer Support**: Connect with students facing similar challenges
- **Professional Networking**: Build connections with potential mentors and employers

### Tutor Connections

- **Tutor Matching**: Find tutors specializing in your areas of interest or difficulty
- **Session Booking**: Schedule one-on-one or group tutoring sessions 
- **Video Conferencing**: Attend virtual tutoring sessions with screen sharing capabilities
- **Resource Sharing**: Exchange study materials with tutors during sessions
- **Progress Reports**: Receive personalized improvement recommendations from tutors
- **Mentor Relationships**: Develop ongoing relationships with healthcare professionals

### Earning Opportunities

- **Forum Moderation**: Earn rewards by maintaining quality discussions in community forums
- **Content Creation**: Develop and submit quizzes or educational games for approval and compensation
- **Hackathon Events**: Participate in timed challenges to create innovative learning tools
- **Prize Competitions**: Win monetary awards for top-performing educational content
- **Peer Tutoring**: Earn by helping fellow students in areas where you excel
- **Research Participation**: Receive compensation for joining approved medical research studies

### Wallet Functionality

- **Unified Balance**: Single wallet for course purchases, earnings, and prizes
- **Transaction History**: Detailed record of all financial activities
- **Multiple Funding Sources**: Add funds via bank transfer, credit/debit cards, or mobile payment
- **Spending Analytics**: Track educational spending by category and time period
- **Reward Tracking**: Monitor earnings from different platform activities
- **Withdrawal Options**: Transfer earnings to bank accounts or payment cards
- **Gift Credits**: Purchase wallet credits as gifts for other students
- **Promotional Bonuses**: Receive special offers and discounts in wallet
- **Recurring Payments**: Set up automatic wallet funding for subscription courses
- **Security Controls**: Two-factor authentication for all financial transactions

## Data Privacy & User Security

The GLOHSEN Health Portal prioritizes data privacy and educates users on security best practices:

### Data Minimization & Retention

- Collection of only necessary information for platform functionality
- Clear data retention policies with automated data purging
- User control over personal data with export and deletion options
- Anonymization techniques for analytical data usage

### User Security Education

- Interactive security tutorials for new users
- Regular security notifications and updates
- Phishing awareness training materials
- Proactive notification of suspicious account activities
- Two-factor authentication setup guidance

### Security By Design

- Privacy impact assessments for new features
- Regular vulnerability scanning and patching
- Secure coding practices and code reviews
- Defense-in-depth architecture
- Regular security drills and incident response testing

### Third-Party Integration Security

- Strict vetting process for third-party services
- Data processing agreements with all vendors
- Regular security assessments of integrated services
- Limited data sharing with clear boundaries

## Security Features

The GLOHSEN Health Portal implements robust security measures to protect sensitive healthcare information:

### Authentication & Authorization
- Multi-factor authentication (MFA) for all user accounts
- Role-based access control (RBAC) with principle of least privilege
- Session management with automatic timeout and secure token handling
- Anti-brute force mechanisms with progressive delays and account lockouts

### Data Protection
- End-to-end encryption for all personal health information
- Data masking for sensitive information in logs and displays
- Secure API endpoints with proper authentication and rate limiting
- Encrypted database with field-level encryption for sensitive data
- Regular automated backups with encryption at rest

### Application Security
- Protection against OWASP Top 10 vulnerabilities
- Content Security Policy (CSP) implementation
- Regular code scanning for security vulnerabilities
- Secure development lifecycle with security reviews
- Input validation and output encoding to prevent injection attacks
- Protection against cross-site scripting (XSS) and cross-site request forgery (CSRF)

### Compliance
- HIPAA compliance for health data protection
- GDPR-compliant data handling and user consent management
- Regular third-party security audits and penetration testing
- Comprehensive security logging and monitoring
- Incident response plan with defined procedures

### Best Practices
- Regular security training for all development team members
- Dependency scanning to identify and update vulnerable packages
- Server hardening following industry best practices
- Secure API design with proper authentication and authorization
- SSL/TLS implementation with modern cipher suites

## Contributing

Please refer to the project's style and contribution guidelines for submitting patches and additions. Always follow the code style and ensure proper testing.

## License

Copyright © 2025 GLOHSEN Health Portal. All rights reserved.

## Dashboard Components

The Professional Dashboard is built with modular, reusable components:

### Core Dashboard Elements
- **ProfessionalDashboardTabs**: Main navigation and content container
  - OVERVIEW tab - Professional summary and recent activities
  - MY JOBS HISTORY tab - Job applications and history
  - MY TRANSACTION HISTORY tab - Financial records
  - MY PROFILE tab - Professional information and certifications
  - MY FEEDBACK tab - Feedback received from employers and patients

### UI Features
- Glass-morphism effects for modern aesthetics
- Responsive grid layouts
- Interactive data visualization
- Real-time status updates
- Modern animations and transitions
- Integrated feedback notifications

### Dashboard Sections
- **JoinTheConversation**: Community engagement component
- **RecentActivity**: Activity timeline display
- **AdvancedSkillsCertificates**: Certificate management system
- **FeedbackPanel**: User-specific feedback display and management

### Feedback System Components
- **GeneralFeedbackForm**: Multi-tab form for different stakeholder categories
  - PROFESSIONALS tab - For feedback about healthcare professionals
  - HOSPITALS/HEALTH FACILITY tab - For feedback about healthcare facilities
  - TUTORS/ADVISERS tab - For feedback about educational resources
- **QRCodeGenerator**: System to create and manage feedback QR codes
  - Entity-specific code generation with embedded metadata
  - Printable QR template creation for physical distribution
  - QR analytics dashboard for tracking scan and submission rates
  - Integration with email systems for post-service feedback requests
- **FeedbackModeration**: Admin tool for reviewing and categorizing feedback
- **FeedbackDashboard**: User-specific view of relevant feedback
- **UnmatchedFeedback**: Repository for feedback about non-registered entities
- **FeedbackVerificationPortal**: Secure interface for submitting evidence during disputes

### Security & Privacy Components
- **SecurityDashboard**: User-facing security control center
  - Activity log with suspicious activity detection
  - Two-factor authentication management
  - Connected devices and active sessions management
  - Personal data visibility and export controls
- **PrivacyConsentManager**: Granular control of data sharing permissions
- **SecureMessaging**: End-to-end encrypted communication system
- **AccessAuditLog**: Transparent record of who accessed user data
- **SecurityAlertCenter**: Real-time notifications of security events

### Component Documentation
Detailed documentation for each component can be found in `/src/components/README.md`


