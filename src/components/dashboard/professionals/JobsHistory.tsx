import { Card } from "@/components/ui/card";

const JobsHistory = () => (
  <Card className="p-6">
    <h2 className="text-xl font-bold mb-4">Jobs Analytics</h2>
    <div className="mb-4">Qualified Locum Jobs: <b>4</b></div>
    <div className="mb-4">Jobs Applied (Awaiting Response): <b>2</b></div>
    <div className="mb-4">Employer Requests Not Accepted: <b>1</b></div>
    <div className="mb-4">Back-up Locum Opportunities: <b>2</b></div>
    {/* Add job listings/analytics as needed */}
  </Card>
);

export default JobsHistory;
