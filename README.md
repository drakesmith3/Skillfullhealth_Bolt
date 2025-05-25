
# GLOHSEN Application

## About GLOHSEN
GLOHSEN is a comprehensive healthcare professional platform designed to connect healthcare professionals (especially locums) with employers, provide continuing medical education, and offer an innovative scoring system for professional evaluation.

## 🚀 Features

### For Professionals
- Professional profile management with GLOHSEN Score tracking
- Job application tracking and matching system
- Continuing Medical Education (CME) courses with certifications
- Interactive game-based learning and quizzes
- MLM referral system with multi-level rewards
- Wallet and transaction history management
- Community forum access and networking
- KPI tracking and analytics dashboard

### For Employers
- Facility profile management and verification
- Job vacancy management with AI-powered matching
- Candidate tracking and evaluation system
- Criteria score matching with weighted preferences
- Key Performance Indicators (KPI) analytics
- Payment portal and subscription management
- Transaction history and invoicing

### For Tutors
- Course creation and content management
- Student analytics and progress tracking
- Game and quiz development tools
- Community engagement features
- Revenue tracking and MLM earnings
- Interactive teaching tools

### For Students
- Course enrollment and progress tracking
- Performance analytics and certification management
- Game-based learning platform
- Community access and peer interaction
- Digital wallet for transactions
- Achievement tracking

### For Clients
- Professional search and matching
- Game and quiz participation
- Community discussion access
- Feedback and rating system
- Service booking and management

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive, utility-first styling
- **Shadcn/UI** component library for consistent design
- **GSAP** for advanced animations and interactions
- **Recharts** for data visualization and analytics
- **React Router DOM** for navigation
- **Zustand** for state management

### Key Libraries & Tools
- **Lucide React** for icons
- **React Hook Form** with Zod validation
- **Tanstack React Query** for data fetching
- **Date-fns** for date manipulation
- **Framer Motion** for complex animations
- **HTML2Canvas** for screenshot functionality

### Design System
- **Primary Red**: #ea384c
- **Gold Accent**: #D4AF37
- **Off-White**: #eee
- **Dark Background**: #1A1F2C
- **Card Background**: #232836

## 🎯 Core Systems

### 1. GLOHSEN Score System
Comprehensive evaluation system for healthcare professionals:
- Years of experience and specialization
- Employer match score and feedback ratings
- Skills, certifications, and continuing education
- Platform activity and community engagement
- Volunteer work and professional achievements
- Location proximity and availability
- Remote work capability assessment

### 2. AI Agent System
Three intelligent agents power the platform:

#### Recommendation Agent
- Personalized course and job recommendations
- Skill gap analysis and career progression
- Peer-based collaborative filtering
- Dynamic content curation

#### Feedback Routing Agent
- Intelligent user matching for feedback
- Automated routing to appropriate dashboards
- Unregistered user handling
- Quality assurance and verification

#### Activity Tracking Agent
- Real-time user engagement monitoring
- Performance analytics and insights
- Behavioral pattern recognition
- Automated testimonial curation

### 3. MLM Referral System
Multi-level marketing system with:
- **Level 1**: 25% commission on direct referrals
- **Level 2**: 10% commission on second-level referrals
- **Level 3**: 5% commission on third-level referrals
- **Bonus Tiers**: Bronze (5 refs), Silver (15 refs), Gold (30 refs), Platinum (50 refs)
- Real-time tracking and payment processing

## 🛡️ Security & Accessibility

### Security Features
- Session timeout management (30-minute default)
- Input validation and sanitization
- Role-based permission system
- XSS and injection attack prevention
- Secure authentication guards
- Activity monitoring and logging

### Accessibility Features
- WCAG 2.1 AA compliance
- Screen reader optimization with ARIA labels
- Keyboard navigation support
- High contrast mode option
- Adjustable font sizes (small, medium, large)
- Reduced motion preferences
- Focus management and skip links

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

### Features
- Mobile-first approach
- Touch-friendly interactions
- Optimized for various screen sizes
- Progressive Web App capabilities

## 🎨 Advanced Animations

### GSAP Animations
- Parallax scrolling effects
- 3D transformations and rotations
- Morphing SVG animations
- Scroll-triggered animations
- Interactive hover effects

### Micro-interactions
- Button hover states
- Loading animations
- Transition effects
- Feedback animations
- Progress indicators

## 📊 Analytics & Performance

### Performance Optimization
- Code splitting and lazy loading
- Image optimization and compression
- Bundle size optimization
- Caching strategies
- Performance monitoring

### Analytics Features
- Real-time user engagement tracking
- Course completion rates
- Platform usage statistics
- Revenue analytics
- User behavior insights

## 🗂️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/UI components
│   ├── dashboard/       # Dashboard layouts
│   ├── analytics/       # Analytics components
│   ├── accessibility/   # Accessibility utilities
│   ├── security/        # Security components
│   └── storybook/       # Storybook stories
├── pages/               # Route components
├── services/            # AI agents and services
├── hooks/               # Custom React hooks
├── contexts/            # React contexts
├── utils/               # Utility functions
└── assets/              # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Modern web browser
- Git

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
bun install
# or
npm install

# Start development server
bun dev
# or
npm run dev
```

### Environment Setup
Create a `.env.local` file:
```env
VITE_APP_NAME=GLOHSEN
VITE_API_URL=your-api-url
```

## 📱 Dashboard Architecture

All user dashboards follow a consistent architecture:
1. **Dark-themed sidebar** with user information and navigation
2. **Header** with page title and user actions
3. **Tab navigation** for different dashboard views
4. **Content area** with role-specific information

### Dashboard Types
- **Professional**: Portfolio, jobs, courses, transactions
- **Employer**: Candidates, analytics, payments, postings
- **Tutor**: Courses, students, analytics, revenue
- **Student**: Enrolled courses, progress, community
- **Client**: Services, feedback, community
- **Admin**: System management, AI agents, analytics

## 🔧 Development

### Code Standards
- TypeScript strict mode enabled
- ESLint and Prettier configuration
- Component-first architecture
- Responsive design principles
- Accessibility-first development

### Testing
- Storybook for component testing
- Unit tests with Jest
- Integration testing
- Accessibility testing

### Performance Guidelines
- Lazy load components
- Optimize images and assets
- Minimize bundle size
- Use React.memo for expensive components
- Implement proper error boundaries

## 🌐 Deployment

### Build Process
```bash
# Production build
bun run build
# or
npm run build

# Preview build
bun run preview
# or
npm run preview
```

### Deployment Options
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- Traditional web hosting

## 📋 Available Routes

### Public Routes
- `/` - Home page with interactive storytelling
- `/about-us` - About GLOHSEN platform
- `/contact-us` - Contact information and form
- `/blog` - Healthcare industry insights
- `/courses` - Available courses and certifications
- `/job-board` - Healthcare job opportunities
- `/community-forum` - Professional networking
- `/games-quizzes` - Interactive learning activities
- `/signup` - User registration
- `/login` - User authentication

### Authenticated Routes
- `/dashboard/{userType}` - Role-specific dashboards
- `/score/calculate` - GLOHSEN Score calculator
- `/score` - Score results and analytics
- `/kpi-tracking` - Performance tracking
- `/kpi-dashboard` - Visual analytics
- `/wallet/{userType}` - Financial management
- `/account-settings` - User preferences
- `/feedback` - Platform feedback

### Admin Routes
- `/admin/dashboard` - System administration
- `/sitemap` - Site structure overview

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For technical support or questions:
- Email: support@glohsen.com
- Documentation: [Project Wiki]
- Community: [Discord/Slack Channel]

## 📄 License

This project is proprietary software. All rights reserved.

---

Built with ❤️ for the healthcare community by the GLOHSEN team.
