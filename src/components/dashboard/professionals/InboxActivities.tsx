import { Card } from "@/components/ui/card";

const InboxActivities = () => (
  <Card className="p-6">
    <h2 className="text-xl font-bold mb-4">Inbox & Activities</h2>
    <div className="mb-4">Messages from Users: <b>5</b></div>
    <div className="mb-4">Personalised Company Messages: <b>2</b></div>
    <div className="mb-4">Feedback Responses: <b>1</b></div>
    {/* Add inbox/messages/feedback UI as needed */}
  </Card>
);

export default InboxActivities;
