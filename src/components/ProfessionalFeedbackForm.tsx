import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProfessionalFeedbackFormProps {
  onSubmit?: (data: any) => void;
}

const ProfessionalFeedbackForm = ({ onSubmit }: ProfessionalFeedbackFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      hospital: formData.get("hospital"),
      feedback: formData.get("feedback"),
      name: formData.get("name"),
      email: formData.get("email"),
    };

    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Feedback submitted",
        description: "Thank you for sharing your feedback!",
      });
      if (onSubmit) onSubmit(data);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <Card className="p-6 shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 border-[#D4AF37]">
        Leave Feedback About a Hospital or the Healthcare Industry
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="hospital">Hospital / Healthcare Facility</Label>
          <Input
            id="hospital"
            name="hospital"
            placeholder="Enter hospital or facility name"
            className="mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="feedback">Your Feedback</Label>
          <textarea
            id="feedback"
            name="feedback"
            placeholder="Share your experience or suggestions..."
            className="w-full rounded-md border border-input bg-background p-2 mt-1 h-32"
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Full Name"
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              className="mt-1"
              required
            />
          </div>
        </div>
        <Button
          type="submit"
          className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </Button>
      </form>
      <div className="mt-6 text-center">
        <a
          href="/community/discussions"
          className="text-link-blue underline hover:text-[#0a2342] transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit the Community Discussion Page for Comments & Engagement
        </a>
      </div>
    </Card>
  );
};

export default ProfessionalFeedbackForm;
