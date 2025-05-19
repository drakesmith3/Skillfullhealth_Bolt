import { useState, useEffect } from "react"; // Added useEffect
// import Header from "@/components/Header"; // Removed old Header
import PreHeader from "@/components/PreHeader"; // Added
import Footer from "@/components/Footer"; // Added
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownLeft, ArrowUpRight, CheckCircle, DollarSign, EyeOff, UploadCloud, Clock } from "lucide-react";

const TransactionItem = ({ type, amount, date, status, description }) => {
  return (
    <div className="flex items-center py-4 border-b last:border-b-0">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
        type === "credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
      }`}>
        {type === "credit" ? (
          <ArrowDownLeft className="h-5 w-5" />
        ) : (
          <ArrowUpRight className="h-5 w-5" />
        )}
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center">
          <p className="font-medium">{description}</p>
          {status === "pending" && (
            <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center">
              <Clock className="h-3 w-3 mr-1" /> Pending
            </span>
          )}
          {status === "completed" && (
            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" /> Completed
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      
      <div className={`font-bold ${type === "credit" ? "text-green-600" : "text-red-600"}`}>
        {type === "credit" ? "+" : "-"}₦{amount.toLocaleString()}
      </div>
    </div>
  );
};

const WalletTransaction = () => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [withdrawing, setWithdrawing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showFooter, setShowFooter] = useState(false); // Added

  useEffect(() => { // Added
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 1000); // Delay of 1 second
    return () => clearTimeout(timer);
  }, []);

  const transactions = [
    { 
      id: 1, 
      type: "credit", 
      amount: 500000, 
      date: "May 4, 2025", 
      status: "completed", 
      description: "Locum payment - St. Mary's Hospital" 
    },
    { 
      id: 2, 
      type: "credit", 
      amount: 350000, 
      date: "Apr 28, 2025", 
      status: "completed", 
      description: "Locum payment - City Medical Center" 
    },
    { 
      id: 3, 
      type: "debit", 
      amount: 200000, 
      date: "Apr 20, 2025", 
      status: "completed", 
      description: "Withdrawal to GTBank ****1234" 
    },
    { 
      id: 4, 
      type: "credit", 
      amount: 450000, 
      date: "Apr 15, 2025", 
      status: "completed", 
      description: "Locum payment - University Hospital" 
    },
    { 
      id: 5, 
      type: "debit", 
      amount: 300000, 
      date: "Apr 10, 2025", 
      status: "completed", 
      description: "Withdrawal to Access Bank ****5678" 
    },
    { 
      id: 6, 
      type: "credit", 
      amount: 150000, 
      date: "Apr 02, 2025", 
      status: "pending", 
      description: "Tutor payment - Medical Ethics Course" 
    },
  ];

  const handleWithdraw = (e) => {
    e.preventDefault();
    setWithdrawing(true);
    
    // Simulate API call
    setTimeout(() => {
      setWithdrawing(false);
      setSuccess(true);
      
      // Reset form
      setTimeout(() => {
        setSuccess(false);
        setBankName("");
        setAccountNumber("");
        setAmount("");
      }, 3000);
    }, 1500);
  };

  // Calculate wallet balance
  const balance = transactions.reduce((acc, curr) => {
    return curr.type === "credit" 
      ? acc + curr.amount 
      : acc - curr.amount;
  }, 0);

  return (
    <div className="min-h-screen bg-f5f5f5 flex flex-col"> {/* Added flex flex-col */}
      {/* <Header /> */}
      <PreHeader currentPage="wallet transactions" /> {/* Removed userName="Hospital Y" */}
      <main className="flex-grow container mx-auto px-4 py-8 pt-20"> {/* Added flex-grow and pt-20 */}
        <h1 className="text-3xl font-bold mb-8 text-center">Wallet Transactions</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Wallet Balance Card */}
          <Card className="md:col-span-1 p-6 shadow-lg border-2 border-[#D4AF37]/20 bg-gradient-to-br from-[#F5F5F5] to-white">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold">Wallet Balance</h2>
              <Button variant="ghost" size="sm" className="h-8 px-3">
                <EyeOff className="h-4 w-4 mr-1" /> Hide
              </Button>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-d4af37" />
              </div>
              <h3 className="text-3xl font-bold mb-1">₦{balance.toLocaleString()}</h3>
              <p className="text-gray-500 text-sm mb-6">Available for withdrawal</p>
              
              <form onSubmit={handleWithdraw} className="text-left">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bank">Bank Name</Label>
                    <Select value={bankName} onValueChange={setBankName} required>
                      <SelectTrigger id="bank">
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gtb">GTBank</SelectItem>
                        <SelectItem value="firstbank">First Bank</SelectItem>
                        <SelectItem value="uba">UBA</SelectItem>
                        <SelectItem value="zenith">Zenith Bank</SelectItem>
                        <SelectItem value="access">Access Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="account-number">Account Number</Label>
                    <Input 
                      id="account-number"
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      maxLength={10}
                      minLength={10}
                      placeholder="10 digit account number"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">Amount (₦)</Label>
                    <Input 
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min={1000}
                      placeholder="Minimum: ₦1,000"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full button-3d bg-[#D4AF37] text-white border-none"
                    disabled={withdrawing}
                  >
                    {withdrawing ? (
                      <>Processing...</>
                    ) : (
                      <>Withdraw Funds</>
                    )}
                  </Button>
                  
                  {success && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md mt-4 text-center text-green-700">
                      Withdrawal request submitted successfully!
                    </div>
                  )}
                </div>
              </form>
            </div>
          </Card>
          
          {/* Transactions History */}
          <Card className="md:col-span-2 p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
            
            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="credit">Credits</TabsTrigger>
                <TabsTrigger value="debit">Debits</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-1">
                {transactions.map(transaction => (
                  <TransactionItem key={transaction.id} {...transaction} />
                ))}
                
                <div className="text-center mt-8">
                  <Button variant="outline" className="text-d4af37 border-[#D4AF37]">
                    Load More
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="credit" className="space-y-1">
                {transactions
                  .filter(t => t.type === "credit")
                  .map(transaction => (
                    <TransactionItem key={transaction.id} {...transaction} />
                  ))
                }
              </TabsContent>
              
              <TabsContent value="debit" className="space-y-1">
                {transactions
                  .filter(t => t.type === "debit")
                  .map(transaction => (
                    <TransactionItem key={transaction.id} {...transaction} />
                  ))
                }
              </TabsContent>
            </Tabs>
            
            {/* Document upload section for tax purposes */}
            <div className="mt-8 p-4 border border-gray-200 rounded-md bg-gray-50">
              <h3 className="font-medium mb-2">Tax Documents</h3>
              <p className="text-sm text-gray-600 mb-4">Upload tax-related documents for official payment records</p>
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-8 rounded-md bg-white">
                <div className="text-center">
                  <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Drag and drop files here or click to browse</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Select Files
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
      {showFooter && <Footer isActive={false} />} {/* Added conditional rendering */}
    </div>
  );
};

export default WalletTransaction;
