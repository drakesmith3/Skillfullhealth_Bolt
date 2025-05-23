
interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  testimonial: string;
  rating: number;
  source: string;
  dateAdded: string;
  featured?: boolean;
  isManuallyFeatured?: boolean;
}

class AIActivityAgent {
  private static instance: AIActivityAgent;
  private updateInterval: NodeJS.Timeout | null = null;
  private isActive: boolean = false;
  private lastAutomatedUpdate: string | null = null;
  private lastManualUpdate: string | null = null;

  private constructor() {}

  public static getInstance(): AIActivityAgent {
    if (!AIActivityAgent.instance) {
      AIActivityAgent.instance = new AIActivityAgent();
    }
    return AIActivityAgent.instance;
  }

  // Start the AI activity agent
  public start(): void {
    if (this.isActive) return;
    
    this.isActive = true;
    console.log('AI Activity Agent started - monitoring testimonials');
    
    // Check for new testimonials every 30 minutes
    this.updateInterval = setInterval(() => {
      this.checkAndUpdateTestimonials();
    }, 30 * 60 * 1000); // 30 minutes

    // Initial check
    this.checkAndUpdateTestimonials();
    this.loadInitialTestimonialsFromStorage();
  }

  // Stop the AI activity agent
  public stop(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.isActive = false;
    console.log('AI Activity Agent stopped');
  }

  // Get agent status
  public getStatus() {
    const featuredTestimonials = this.getCurrentFeaturedTestimonials();
    return {
      active: this.isActive,
      lastAutomatedUpdate: this.lastAutomatedUpdate,
      lastManualUpdate: this.lastManualUpdate,
      featuredCount: featuredTestimonials.length,
      featuredTestimonials,
      allTestimonials: this.getAllTestimonialsFromStorage()
    };
  }

  // Force update testimonials
  public async forceUpdate(): Promise<void> {
    await this.checkAndUpdateTestimonials(true);
    this.lastManualUpdate = new Date().toISOString();
  }

  // Main function to check and update testimonials
  private async checkAndUpdateTestimonials(force: boolean = false): Promise<void> {
    try {
      const allTestimonials = this.getAllTestimonialsFromStorage();
      const currentFeatured = this.getCurrentFeaturedTestimonials();
      
      // Separate manually featured testimonials
      const manuallyFeatured = allTestimonials.filter(t => t.isManuallyFeatured);
      const nonManuallyFeatured = allTestimonials.filter(t => !t.isManuallyFeatured);

      // AI selects from non-manually featured testimonials
      const aiSelectedTestimonials = this.selectFeaturedTestimonials(nonManuallyFeatured, currentFeatured.filter(t => !t.isManuallyFeatured));
      
      // Combine manually featured and AI selected, ensuring no duplicates and respecting limits
      let newFeaturedSet = [...manuallyFeatured];
      for (const aiSelected of aiSelectedTestimonials) {
        if (newFeaturedSet.length < 6 && !newFeaturedSet.find(t => t.id === aiSelected.id)) {
          newFeaturedSet.push(aiSelected);
        }
      }
      // Ensure all in newFeaturedSet have featured = true
      newFeaturedSet = newFeaturedSet.map(t => ({ ...t, featured: true }));

      if (force || this.shouldUpdateFeatured(currentFeatured, newFeaturedSet)) {
        await this.updateFeaturedTestimonialsInStorage(newFeaturedSet);
        this.lastAutomatedUpdate = new Date().toISOString();
        console.log(`AI Agent: Updated featured testimonials. Total: ${newFeaturedSet.length}`);
      }
    } catch (error) {
      console.error('AI Activity Agent: Error updating testimonials:', error);
    }
  }

  // Get current featured testimonials from storage
  private getCurrentFeaturedTestimonials(): Testimonial[] {
    try {
      const stored = localStorage.getItem('glohsen_featured_testimonials');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading current featured testimonials:', error);
      return [];
    }
  }

  // Get all testimonials from storage
  private getAllTestimonialsFromStorage(): Testimonial[] {
    try {
      const stored = localStorage.getItem('glohsen_all_testimonials');
      if (stored) {
        return JSON.parse(stored);
      } else {
        // Return initial seed data if nothing in storage
        return this.getInitialTestimonials();
      }
    } catch (error) {
      console.error('Error loading testimonials from storage:', error);
      return this.getInitialTestimonials();
    }
  }

  // Get initial testimonials data
  private getInitialTestimonials(): Testimonial[] {
    return [
      {
        id: 1,
        name: "Dr. Adunni Olatunji",
        role: "Emergency Medicine Physician",
        location: "Lagos, Nigeria",
        testimonial: "GLOHSEN transformed my career! I've completed 8 locum jobs this year and increased my income by 40%. The platform's scoring system helped me stand out to top employers.",
        rating: 5,
        source: "General Feedback Form",
        dateAdded: "2024-01-15",
        featured: true,
        isManuallyFeatured: false,
      },
      {
        id: 2,
        name: "Nurse Fatima Bello",
        role: "Registered Nurse",
        location: "Abuja, Nigeria",
        testimonial: "GLOHSEN's job board is fantastic. I found a great position in a new city within weeks. The resources for professionals are top-notch.",
        rating: 4,
        source: "General Feedback Form",
        dateAdded: "2023-11-20",
        featured: false,
        isManuallyFeatured: false,
      }
    ];
  }

  // Load initial testimonials and save to storage
  private loadInitialTestimonialsFromStorage(): void {
    const existing = this.getAllTestimonialsFromStorage();
    if (existing.length === 0) {
      const initial = this.getInitialTestimonials();
      localStorage.setItem('glohsen_all_testimonials', JSON.stringify(initial));
    }
  }

  // Select featured testimonials using AI logic
  private selectFeaturedTestimonials(availableTestimonials: Testimonial[], currentFeatured: Testimonial[]): Testimonial[] {
    // Simple AI selection logic - prioritize recent, high-rated testimonials
    return availableTestimonials
      .filter(t => t.rating >= 4)
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      .slice(0, 3);
  }

  // Check if featured testimonials should be updated
  private shouldUpdateFeatured(current: Testimonial[], proposed: Testimonial[]): boolean {
    if (current.length !== proposed.length) return true;
    
    const currentIds = new Set(current.map(t => t.id));
    const proposedIds = new Set(proposed.map(t => t.id));
    
    return !this.setsEqual(currentIds, proposedIds);
  }

  // Helper function to compare sets
  private setsEqual(a: Set<number>, b: Set<number>): boolean {
    return a.size === b.size && [...a].every(value => b.has(value));
  }

  // Update featured testimonials in storage
  private async updateFeaturedTestimonialsInStorage(testimonials: Testimonial[]): Promise<void> {
    try {
      localStorage.setItem('glohsen_featured_testimonials', JSON.stringify(testimonials));
      console.log('Featured testimonials updated in storage');
    } catch (error) {
      console.error('Error updating featured testimonials in storage:', error);
    }
  }
}

export default AIActivityAgent;
