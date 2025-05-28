import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TutorPurse = () => {
  const [amount, setAmount] = useState(0);
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white flex flex-col items-center justify-center py-12">
      <Card className="w-full max-w-lg p-8 shadow-2xl border-2 border-[#D4AF37]/30">
        <h1 className="text-3xl font-bold text-center mb-6 text-d4af37 font-serif">Withdraw Your Tutor/Adviser Earnings</h1>
        <form onSubmit={handleWithdraw} className="space-y-6">
          <div>
            <Label htmlFor="amount" className="font-semibold">Amount (₦)</Label>
            <Input
              id="amount"
              type="number"
              min={1000}
              step={500}
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="mt-2"
              required
            />
          </div>
          <div>
            <Label htmlFor="bank" className="font-semibold">Bank Name</Label>
            <Input
              id="bank"
              type="text"
              value={bank}
              onChange={e => setBank(e.target.value)}
              className="mt-2"
              required
            />
          </div>
          <div>
            <Label htmlFor="account" className="font-semibold">Account Number</Label>
            <Input
              id="account"
              type="text"
              value={account}
              onChange={e => setAccount(e.target.value)}
              className="mt-2"
              required
            />
          </div>
          <Button type="submit" className="button-3d bg-[#D4AF37] text-white w-full py-4 text-lg font-bold" disabled={loading}>
            {loading ? "Processing..." : "Withdraw Funds"}
          </Button>
        </form>
        {success && (
          <div className="mt-6 text-center text-green-600 font-semibold">Withdrawal request submitted!</div>
        )}
      </Card>
    </div>
  );
};

export default TutorPurse;
