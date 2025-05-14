
import React, { useState, useEffect } from "react";
import { Loader2, Book } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

const Blog: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Healthcare Tips", "Professional Development", "Patient Stories", "Medical Research"];

  // Simulated blog posts
  const mockPosts: BlogPost[] = [
    {
      id: 1,
      title: "Understanding Your GLOHSEN Score",
      excerpt: "Learn how the GLOHSEN score is calculated and why it matters for your healthcare career.",
      author: "Dr. Sarah Johnson",
      date: "May 10, 2025",
      category: "Professional Development",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      title: "Patient Feedback: The Missing Link in Healthcare Improvement",
      excerpt: "How patient feedback creates accountability and drives meaningful change in healthcare institutions.",
      author: "Mark Williams",
      date: "May 5, 2025",
      category: "Patient Stories",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 3,
      title: "Latest Research on Healthcare Professional Well-being",
      excerpt: "New studies show the importance of mental health support for healthcare workers.",
      author: "Dr. Elena Martinez",
      date: "April 28, 2025",
      category: "Medical Research",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 4,
      title: "5 Ways to Prevent Burnout in Healthcare",
      excerpt: "Practical strategies for healthcare professionals to maintain work-life balance and prevent burnout.",
      author: "Dr. James Thompson",
      date: "April 20, 2025",
      category: "Healthcare Tips",
      image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=400"
    },
  ];

  useEffect(() => {
    // Simulate loading data from an API
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
      
      // Notify the user the blog has loaded
      toast({
        title: "Blog Loaded",
        description: "Latest healthcare articles have been loaded successfully."
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-red-600 to-amber-500 text-transparent bg-clip-text">
                GLOHSEN Blog
              </span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl text-center mb-8">
              Insights, news, and stories from the global healthcare community
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={activeCategory === category ? "bg-red-600 hover:bg-red-700" : "border-red-600 text-red-600 hover:bg-red-50"}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    
                    <CardHeader>
                      <div className="text-sm text-red-600 font-medium mb-1">{post.category}</div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>By {post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button className="bg-red-600 hover:bg-red-700 w-full">
                        <Book className="mr-2 h-4 w-4" />
                        Read Article
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-500">No articles found in this category.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
