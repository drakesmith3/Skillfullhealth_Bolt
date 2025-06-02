
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { CreditCard, Download, Upload, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const TransactionsHistory = () => {
  const [filter, setFilter] = useState("all");
  
  const transactions = [
    {
      id: "TX-79082",
      date: "2025-05-15",
      type: "Payout",
      amount: "Q450,000",
      description: "Locum Job Payment - General Hospital Lagos",
      status: "Completed",
    },
    {
      id: "TX-65432",
      date: "2025-05-10",
      type: "Withdrawal",
      amount: "Q250,000",
      description: "Bank Transfer to Zenith Bank ****4532",
      status: "Completed",
    },
    {
      id: "TX-54321",
      date: "2025-05-02",
      type: "Payout",
      amount: "Q350,000",
      description: "Locum Job Payment - Mercy Medical Center",
      status: "Completed",
    },
    {
      id: "TX-43215",
      date: "2025-04-25",
      type: "Payout",
      amount: "Q200,000",
      description: "Short-term Locum - St. Mary's Clinic",
      status: "Completed",
    },
    {
      id: "TX-32154",
      date: "2025-04-18",
      type: "Withdrawal",
      amount: "Q400,000",
      description: "Bank Transfer to GTBank ****7865",
      status: "Completed",
    },
    {
      id: "TX-98765",
      date: "2025-05-18",
      type: "Payout",
      amount: "Q500,000",
      description: "Upcoming Locum Payment - City Hospital",
      status: "Pending",
    },
  ];

  // Filter transactions based on the selected filter
  const filteredTransactions = filter === "all" 
    ? transactions 
    : transactions.filter(t => t.type.toLowerCase() === filter.toLowerCase());
  
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <CreditCard className="mr-2 h-6 w-6 text-[#D4AF37]" />
          Transaction History
        </h2>
        
        <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
          <div className="flex items-center">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="payout">Payouts</SelectItem>
                <SelectItem value="withdrawal">Withdrawals</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Available Balance</span>
          <span className="text-lg font-bold text-[#D4AF37]">Q150,000</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Pending Transactions</span>
          <span className="text-lg font-semibold text-amber-500">Q500,000</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Total Withdrawals (This Month)</span>
          <span className="text-lg font-semibold text-green-600">Q650,000</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Input 
            className="max-w-xs" 
            placeholder="Search transactions..." 
            type="search"
          />
          
          <div className="flex gap-2">
            <Button variant="default" className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/80">
              <Upload className="mr-2 h-4 w-4" />
              Withdraw Funds
            </Button>
          </div>
        </div>
      </div>
      
      <div className="overflow-auto rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{transaction.type}</div>
                    <div className="text-xs">{transaction.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 font-medium">
                  {transaction.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={transaction.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" : "bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100"}>
                    {transaction.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredTransactions.length === 0 && (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            No transactions found
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </span>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </Card>
  );
};

export default TransactionsHistory;
