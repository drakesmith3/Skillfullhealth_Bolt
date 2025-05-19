import { Card } from "@/components/ui/card";

interface Feedback {
  hospital: string;
  feedback: string;
  name: string;
  email: string;
  date: string;
  professional: string;
}

interface ProfessionalFeedbackListProps {
  feedbacks: Feedback[];
  professionalName: string;
}

const ProfessionalFeedbackList = ({
  feedbacks,
  professionalName,
}: ProfessionalFeedbackListProps) => {
  // Filter feedbacks for this professional
  const filtered = feedbacks.filter(
    (fb) => fb.professional === professionalName
  );

  if (filtered.length === 0) {
    return (
      <div className="text-gray-500">No feedback for this professional yet.</div>
    );
  }

  return (
    <div className="space-y-4">
      {filtered.map((fb, idx) => (
        <Card key={idx} className="p-4 border border-gray-200">
          <div className="text-sm text-gray-500">
            {new Date(fb.date).toLocaleDateString()} - {fb.hospital}
          </div>
          <div className="text-lg font-semibold text-primary-dark">{fb.name}</div>
          <div className="text-sm text-gray-500 mb-2">{fb.email}</div>
          <div className="text-base text-[#333]">{fb.feedback}</div>
        </Card>
      ))}
    </div>
  );
};

export default ProfessionalFeedbackList;
