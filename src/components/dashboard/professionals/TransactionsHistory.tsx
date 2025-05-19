import { Card } from "@/components/ui/card";

const TransactionsHistory = () => (
  <Card className="p-6">
    <h2 className="text-xl font-bold mb-4">Transactions Analytics</h2>
    <div className="mb-4">
      Payments from Jobs: <b>₦250,000</b>
    </div>
    <div className="mb-4">
      Salary Payments Awaited: <b>₦50,000</b>
    </div>
    <div className="mb-4">
      Withdrawals: <b>₦100,000</b>
    </div>
    <div className="mb-4">
      Other Transactions: <b>₦20,000</b>
    </div>
    {/* Add transaction tables/charts as needed */}
  </Card>
);

export default TransactionsHistory;
