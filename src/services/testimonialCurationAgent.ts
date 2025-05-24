
export interface Testimonial {
  id: string;
  name: string;
  profession: string;
  content: string;
  rating: number;
  date: string;
  verified: boolean;
  location?: string;
  image?: string;
}

export interface CuratedTestimonial extends Testimonial {
  qualityScore: number;
  diversityScore: number;
  recencyScore: number;
  overallScore: number;
}

export class TestimonialCurationAgent {
  private testimonials: Testimonial[] = [];
  private manualTestimonials: Testimonial[] = [];

  constructor() {
    this.loadTestimonials();
  }

  private loadTestimonials(): void {
    // Mock testimonials - replace with actual data source
    this.testimonials = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        profession: 'Cardiologist',
        content: 'GLOHSEN has revolutionized how I find locum opportunities. The platform is intuitive and connects me with quality healthcare facilities.',
        rating: 5,
        date: '2024-05-20',
        verified: true,
        location: 'Lagos, Nigeria'
      },
      {
        id: '2',
        name: 'Nurse Mary Adebayo',
        profession: 'Registered Nurse',
        content: 'Thanks to GLOHSEN, I have been able to advance my career through continuous learning and professional networking.',
        rating: 5,
        date: '2024-05-18',
        verified: true,
        location: 'Abuja, Nigeria'
      }
    ];
  }

  public addManualTestimonial(testimonial: Omit<Testimonial, 'id'>): string {
    const id = `manual_${Date.now()}`;
    const newTestimonial: Testimonial = {
      ...testimonial,
      id,
      verified: true // Admin-added testimonials are pre-verified
    };
    
    this.manualTestimonials.push(newTestimonial);
    console.log('Manual testimonial added:', newTestimonial);
    return id;
  }

  public removeManualTestimonial(id: string): boolean {
    const index = this.manualTestimonials.findIndex(t => t.id === id);
    if (index > -1) {
      this.manualTestimonials.splice(index, 1);
      return true;
    }
    return false;
  }

  public validateAndFixTestimonial(testimonial: Testimonial): Testimonial {
    let fixedContent = testimonial.content;
    
    // Fix common issues
    if (fixedContent.length < 50) {
      console.warn(`Testimonial ${testimonial.id} is too short, flagging for review`);
    }
    
    if (!fixedContent.includes('GLOHSEN') && !fixedContent.includes('platform')) {
      fixedContent += ' This platform has truly made a difference in my professional journey.';
    }
    
    // Ensure proper capitalization
    fixedContent = fixedContent.charAt(0).toUpperCase() + fixedContent.slice(1);
    
    // Ensure proper ending punctuation
    if (!fixedContent.match(/[.!?]$/)) {
      fixedContent += '.';
    }

    return {
      ...testimonial,
      content: fixedContent,
      verified: testimonial.verified && fixedContent.length >= 50
    };
  }

  public calculateQualityScore(testimonial: Testimonial): number {
    let score = 0;
    
    // Content quality (40 points)
    if (testimonial.content.length >= 100) score += 20;
    else if (testimonial.content.length >= 50) score += 10;
    
    if (testimonial.content.includes('GLOHSEN')) score += 10;
    if (testimonial.rating >= 4) score += 10;
    
    // Verification status (30 points)
    if (testimonial.verified) score += 30;
    
    // Professional details (30 points)
    if (testimonial.profession) score += 15;
    if (testimonial.location) score += 15;
    
    return Math.min(score, 100);
  }

  public calculateDiversityScore(testimonial: Testimonial, existing: CuratedTestimonial[]): number {
    let score = 100;
    
    // Reduce score if profession is already represented
    const professionCount = existing.filter(t => t.profession === testimonial.profession).length;
    score -= professionCount * 20;
    
    // Reduce score if location is already represented
    const locationCount = existing.filter(t => t.location === testimonial.location).length;
    score -= locationCount * 10;
    
    return Math.max(score, 0);
  }

  public calculateRecencyScore(testimonial: Testimonial): number {
    const testimonialDate = new Date(testimonial.date);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - testimonialDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 7) return 100;
    if (daysDiff <= 30) return 80;
    if (daysDiff <= 90) return 60;
    if (daysDiff <= 180) return 40;
    return 20;
  }

  public getCuratedTestimonials(limit: number = 6): CuratedTestimonial[] {
    const allTestimonials = [...this.testimonials, ...this.manualTestimonials];
    const curated: CuratedTestimonial[] = [];
    
    for (const testimonial of allTestimonials) {
      const fixed = this.validateAndFixTestimonial(testimonial);
      const qualityScore = this.calculateQualityScore(fixed);
      const diversityScore = this.calculateDiversityScore(fixed, curated);
      const recencyScore = this.calculateRecencyScore(fixed);
      
      const overallScore = (qualityScore * 0.5) + (diversityScore * 0.3) + (recencyScore * 0.2);
      
      curated.push({
        ...fixed,
        qualityScore,
        diversityScore,
        recencyScore,
        overallScore
      });
    }
    
    return curated
      .sort((a, b) => b.overallScore - a.overallScore)
      .slice(0, limit);
  }

  public getManualTestimonials(): Testimonial[] {
    return [...this.manualTestimonials];
  }

  public getAllTestimonials(): Testimonial[] {
    return [...this.testimonials, ...this.manualTestimonials];
  }
}

export const testimonialCurationAgent = new TestimonialCurationAgent();
