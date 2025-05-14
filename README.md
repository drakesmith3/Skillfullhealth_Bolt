
# GLOHSEN - Global Health Services Solutions Network

![GLOHSEN](https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400)

## Project Overview

GLOHSEN (Global Health Services Solutions Network) is a comprehensive platform revolutionizing healthcare through connection, education, and excellence. This web application employs cutting-edge parallax scrolling and page-turning animations to create an immersive storytelling experience that guides users through the GLOHSEN ecosystem.

### Live Demo

Visit the live site at [https://lovable.dev/projects/1325d032-51e8-4199-9c93-f623a143a4a2](https://lovable.dev/projects/1325d032-51e8-4199-9c93-f623a143a4a2)

## Key Features

- **Immersive Storytelling Experience**: Book-like page turning animations and smooth transitions between content sections
- **GLOHSEN Score Calculator**: Proprietary algorithm that measures healthcare professionals against global standards
- **Feedback System**: Platform for patients to share their healthcare experiences and help improve services
- **Professional Development**: Resources for healthcare students and professionals to enhance their skills
- **Employment Marketplace**: Connecting qualified healthcare professionals with employers
- **Educational Games & Quizzes**: Interactive learning resources for healthcare education

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Animation Libraries**: GSAP with ScrollTrigger for parallax and page transitions
- **Styling**: Tailwind CSS with responsive design principles
- **Component Library**: shadcn/ui for consistent, accessible UI components
- **State Management**: TanStack Query for data fetching and state management
- **Routing**: React Router for navigation between pages
- **Development Environment**: Vite for fast builds and development experience

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   ├── storybook/     # Component documentation and testing
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and helpers
├── pages/             # Page components for routing
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Key Sections

1. **Header**: Main navigation for the website
2. **Hero (GLOHSEN STANDARD)**: Introduction to GLOHSEN with the GLOHSEN Score calculator
3. **How It Works**: Explanation of the GLOHSEN platform functionality
4. **Feedback**: Patient experience sharing system
5. **Employers**: Resources for healthcare facilities and recruiters
6. **Tutors/Advisers**: Platform for healthcare education professionals
7. **Games & Quizzes**: Interactive learning resources
8. **Success Stories**: Testimonials and case studies
9. **Join The GLOHSEN Community**: Call-to-action for user registration
10. **Footer**: Site-wide links and information

## Development Setup

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd glohsen-website

# Install dependencies
npm install

# Start development server
npm run dev
```

## Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## Accessibility Features

- Semantic HTML structure
- ARIA attributes where appropriate
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## Performance Optimizations

- Component memoization
- Lazy loading of page components
- Image optimization
- Efficient animations with GSAP
- TypeScript for code reliability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use of any part of this codebase is strictly prohibited.

## Contact

For questions or support, please contact the GLOHSEN team at info@glohsen.com
