import { updateSuccessStories } from '@/components/SuccessStories';

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
  isManuallyFeatured?: boolean; // New flag for admin-pinned testimonials
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
    this.loadInitialTestimonialsFromStorage(); // Load all testimonials initially
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

  // Main function to check and update testimonials
  private async checkAndUpdateTestimonials(force: boolean = false): Promise<void> {
    try {
      const allTestimonials = this.getAllTestimonialsFromStorage(); // Use storage as the source of truth
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

  // Get all testimonials (simulate database fetch)
  private getAllTestimonials(): Testimonial[] {
    // This is the initial seed data. Subsequent operations should use storage.
    // In a real implementation, this would fetch from your database
    const initialTestimonials: Testimonial[] = [
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
      },
      {
        id: 3,
        name: "Mr. David Akpan",
        role: "Healthcare Administrator",
        location: "Accra, Ghana",
        testimonial: "The KPI tracking tools on GLOHSEN have helped our clinic improve efficiency by 15%. The insights are invaluable for strategic planning.",
        rating: 5,
        source: "Employer Feedback",
        dateAdded: "2024-02-01",
        featured: false,
        isManuallyFeatured: false,
      },
      {
        id: 4,
        name: "Dr. Samuel Eze",
        role: "General Practitioner",
        location: "Kano, Nigeria",
        testimonial: "I appreciate the continuous learning opportunities provided by GLOHSEN. The platform keeps me updated with the latest medical advancements.",
        rating: 4,
        source: "Course Review",
        dateAdded: "2023-12-05",
        featured: false,
        isManuallyFeatured: false,
      },
      {
        id: 5,
        name: "Dr. Chioma Okafor",
        role: "Anesthesiologist",
        location: "Port Harcourt, Nigeria",
        testimonial: "The GLOHSEN platform helped me find specialized training opportunities that weren't available locally. Now I'm working at one of the top hospitals in the region.",
        rating: 5,
        source: "General Feedback Form",
        dateAdded: new Date().toISOString().split('T')[0], // Today's date
        featured: false,
        isManuallyFeatured: false,
      },
      {
        id: 6,
        name: "Nurse Patricia Mensah",
        role: "Pediatric Nurse",
        location: "Tamale, Ghana",
        testimonial: "Through GLOHSEN's training programs, I gained confidence and advanced my career. The community support is amazing, and I've made lifelong professional connections.",
        rating: 5,
        source: "Success Story Submission",
        dateAdded: new Date().toISOString().split('T')[0], // Today's date
        featured: false,
        isManuallyFeatured: false,
      },
      {
        id: 7,
        name: "Pharmacist John Doe",
        role: "Clinical Pharmacist",
        location: "Nairobi, Kenya",
        testimonial: "GLOHSEN's networking features connected me with peers across Africa, leading to collaborative research projects. Highly recommended!",
        rating: 5,
        source: "Community Forum",
        dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago
        featured: false,
        isManuallyFeatured: false,
      }
      // Add more testimonials as they come in from the feedback form
    ];
    // On first load, if storage is empty, populate it.
    if (!localStorage.getItem('glohsen_all_testimonials')) {
      localStorage.setItem('glohsen_all_testimonials', JSON.stringify(initialTestimonials));
    }
    return initialTestimonials; // This is mostly for initial seed.
  }

  private loadInitialTestimonialsFromStorage(): void {
    const stored = localStorage.getItem('glohsen_all_testimonials');
    if (!stored) {
      // If nothing in storage, seed it with initial data
      const initialData = this.getAllTestimonials(); // This will call the seeding logic if storage is empty
      localStorage.setItem('glohsen_all_testimonials', JSON.stringify(initialData));
      console.log('Initialized all_testimonials in localStorage with seed data.');
    } else {
      console.log('Found existing all_testimonials in localStorage.');
    }
    // Ensure featured testimonials are also loaded/initialized
    if (!localStorage.getItem('glohsen_featured_testimonials')) {
        this.checkAndUpdateTestimonials(true); // Run an initial selection if no featured exist
    }
  }

  public getAllTestimonialsFromStorage(): Testimonial[] {
    try {
      const stored = localStorage.getItem('glohsen_all_testimonials');
      if (stored) {
        return JSON.parse(stored);
      }
      // If storage is empty, initialize it and return the initial data
      const initialData = this.getAllTestimonials(); // This seeds if empty
      return initialData;
    } catch (error) {
      console.error('Error loading all testimonials from storage:', error);
      return [];
    }
  }

  // AI logic to select which testimonials should be featured
  private selectFeaturedTestimonials(allTestimonials: Testimonial[], currentFeatured: Testimonial[]): Testimonial[] {
    const currentFeaturedIds = currentFeatured.map(t => t.id);
    
    // AI criteria for selecting testimonials:
    const candidates = allTestimonials.filter(testimonial => {
      // Don't include already featured testimonials
      if (currentFeaturedIds.includes(testimonial.id)) return false;
      
      // AI scoring criteria
      const criteria = {
        rating: testimonial.rating >= 4, // High rating
        length: testimonial.testimonial.length >= 100 && testimonial.testimonial.length <= 500, // Good length
        recent: this.isRecentTestimonial(testimonial.dateAdded), // Recent submission
        diversity: this.checkRoleDiversity(testimonial.role, currentFeatured), // Role diversity
        source: this.isFromReliableSource(testimonial.source), // Reliable source
        keywords: this.hasPositiveKeywords(testimonial.testimonial) // Contains positive keywords
      };
      
      // Calculate AI score (0-100)
      const score = this.calculateTestimonialScore(criteria);
      
      return score >= 70; // Threshold for featuring
    });

    // Sort by AI score and recency, take top 4-6 testimonials
    return candidates
      .sort((a, b) => {
        const scoreA = this.calculateTestimonialScore(this.getTestimonialCriteria(a, currentFeatured));
        const scoreB = this.calculateTestimonialScore(this.getTestimonialCriteria(b, currentFeatured));
        
        if (scoreA === scoreB) {
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        }
        return scoreB - scoreA;
      })
      .slice(0, 6) // Keep maximum 6 featured testimonials
      .map(t => ({ ...t, featured: true }));
  }

  // Helper methods for AI decision making
  private isRecentTestimonial(dateAdded: string): boolean {
    const testimonialDate = new Date(dateAdded);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return testimonialDate >= thirtyDaysAgo;
  }

  private checkRoleDiversity(role: string, currentFeatured: Testimonial[]): boolean {
    const currentRoles = currentFeatured.map(t => t.role.toLowerCase());
    return !currentRoles.includes(role.toLowerCase());
  }

  private isFromReliableSource(source: string): boolean {
    const reliableSources = ['General Feedback Form', 'Success Story Submission', 'Employer Feedback'];
    return reliableSources.includes(source);
  }

  private hasPositiveKeywords(testimonial: string): boolean {
    const positiveKeywords = [
      'transformed', 'amazing', 'excellent', 'outstanding', 'incredible',
      'recommend', 'success', 'career', 'opportunity', 'growth', 'improved',
      'professional', 'quality', 'effective', 'valuable', 'helpful'
    ];
    
    const text = testimonial.toLowerCase();
    return positiveKeywords.some(keyword => text.includes(keyword));
  }

  private getTestimonialCriteria(testimonial: Testimonial, currentFeatured: Testimonial[]) {
    return {
      rating: testimonial.rating >= 4,
      length: testimonial.testimonial.length >= 100 && testimonial.testimonial.length <= 500,
      recent: this.isRecentTestimonial(testimonial.dateAdded),
      diversity: this.checkRoleDiversity(testimonial.role, currentFeatured),
      source: this.isFromReliableSource(testimonial.source),
      keywords: this.hasPositiveKeywords(testimonial.testimonial)
    };
  }

  // Calculate AI score for a testimonial
  private calculateTestimonialScore(criteria: any): number {
    let score = 0;
    if (criteria.rating) score += 30;
    if (criteria.length) score += 20;
    if (criteria.recent) score += 15;
    if (criteria.diversity) score += 15;
    if (criteria.source) score += 10;
    if (criteria.keywords) score += 10;
    return Math.min(score, 100); // Cap at 100
  }

  // Determine if featured testimonials should be updated
  private shouldUpdateFeatured(currentFeatured: Testimonial[], newPotentialFeatured: Testimonial[]): boolean {
    if (newPotentialFeatured.length === 0 && currentFeatured.length > 0) return false; // Don't clear if AI finds nothing new unless forced
    if (currentFeatured.length !== newPotentialFeatured.length) return true;
    const currentIds = currentFeatured.map(t => t.id).sort().join(',');
    const newIds = newPotentialFeatured.map(t => t.id).sort().join(',');
    return currentIds !== newIds;
  }

  // Update the featured testimonials in storage and call UI update
  private async updateFeaturedTestimonialsInStorage(testimonials: Testimonial[]): Promise<void> {
    try {
      const updatedTestimonials = testimonials.slice(0, 6).map(t => ({ ...t, featured: true }));
      localStorage.setItem('glohsen_featured_testimonials', JSON.stringify(updatedTestimonials));
      updateSuccessStories(updatedTestimonials); // Update UI
    } catch (error) {
      console.error('Error saving featured testimonials:', error);
    }
  }

  // Force an update of testimonials
  public forceUpdate(): void {
    console.log('AI Agent: Force update triggered for testimonials.');
    this.checkAndUpdateTestimonials(true);
  }

  // Get agent status for dashboard
  public getStatus() {
    const featured = this.getCurrentFeaturedTestimonials();
    const allTestimonials = this.getAllTestimonialsFromStorage();
    return {
      active: this.isActive,
      lastAutomatedUpdate: this.lastAutomatedUpdate,
      lastManualUpdate: this.lastManualUpdate,
      featuredCount: featured.length,
      featuredTestimonials: featured,
      allTestimonials: allTestimonials, // Include all testimonials
    };
  }

  // Manually feature or unfeature a testimonial
  public manuallyUpdateFeaturedStatus(testimonialId: number, makeFeatured: boolean): void {
    try {
      let allTestimonials = this.getAllTestimonialsFromStorage();
      const testimonialIndex = allTestimonials.findIndex(t => t.id === testimonialId);

      if (testimonialIndex === -1) {
        console.warn(`Testimonial with ID ${testimonialId} not found for manual update.`);
        return;
      }

      // Update the specific testimonial's manual status and featured status
      allTestimonials[testimonialIndex].isManuallyFeatured = makeFeatured;
      allTestimonials[testimonialIndex].featured = makeFeatured; // Directly reflect this change for now

      // Save all testimonials back to storage with the updated manual status
      localStorage.setItem('glohsen_all_testimonials', JSON.stringify(allTestimonials));

      // Re-evaluate the overall featured list
      // Manually featured items take precedence.
      let currentFeatured = this.getCurrentFeaturedTestimonials();
      if (makeFeatured) {
        // Add to featured if not already there, respecting the limit (remove one if needed)
        if (!currentFeatured.find(t => t.id === testimonialId)) {
          currentFeatured.push(allTestimonials[testimonialIndex]);
          // If over limit, remove one that is not manually featured or oldest manually featured if all are
          if (currentFeatured.length > 6) {
            const nonManualFeatured = currentFeatured.filter(t => !t.isManuallyFeatured);
            if (nonManualFeatured.length > 0) {
                // Sort by date or score to remove the "least" important one
                nonManualFeatured.sort((a,b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime() || (this.calculateTestimonialScore(this.getTestimonialCriteria(a,[]))) - (this.calculateTestimonialScore(this.getTestimonialCriteria(b,[]))));
                const idToRemove = nonManualFeatured[0].id;
                currentFeatured = currentFeatured.filter(t => t.id !== idToRemove);
            } else {
                // All are manually featured, remove the oldest added one
                currentFeatured.sort((a,b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
                currentFeatured.shift();
            }
          }
        }
      } else {
        // Remove from featured if it was there
        currentFeatured = currentFeatured.filter(t => t.id !== testimonialId);
        // The AI might pick a new one to fill the spot in the next cycle or if we call checkAndUpdateTestimonials
      }
      
      // Update the featured list in storage
      this.updateFeaturedTestimonialsInStorage(currentFeatured.map(t => ({...t, featured: true})));
      this.lastManualUpdate = new Date().toISOString();
      console.log(`Manually updated testimonial ID ${testimonialId} to featured: ${makeFeatured}.`);

      // Optionally, trigger AI re-evaluation to fill empty slots if unfeatured
      if (!makeFeatured) {
        this.checkAndUpdateTestimonials();
      }

    } catch (error) {
      console.error(`Error manually updating testimonial ID ${testimonialId}:`, error);
    }
  }

  // Method to add a new testimonial (e.g., from feedback form)
  public addNewTestimonial(testimonialData: Omit<Testimonial, 'id' | 'featured' | 'isManuallyFeatured' | 'dateAdded'>): void {
    try {
      let allTestimonials = this.getAllTestimonialsFromStorage();
      const newId = allTestimonials.length > 0 ? Math.max(...allTestimonials.map(t => t.id)) + 1 : 1;
      const newTestimonial: Testimonial = {
        ...testimonialData,
        id: newId,
        dateAdded: new Date().toISOString(),
        featured: false,
        isManuallyFeatured: false,
      };
      allTestimonials.push(newTestimonial);
      localStorage.setItem('glohsen_all_testimonials', JSON.stringify(allTestimonials));
      console.log('New testimonial added:', newTestimonial);
      // Trigger an update check as new content is available
      this.checkAndUpdateTestimonials();
    } catch (error) {
      console.error('Error adding new testimonial:', error);
    }
  }
}

export default AIActivityAgent;

// Ensure this function is exported if it's used by other modules directly for UI updates
// For now, it's called internally by the agent.
// export { updateSuccessStories };