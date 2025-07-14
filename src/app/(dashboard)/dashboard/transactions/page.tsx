"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ListFilter,
  Search,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCcw,
  DollarSign,
  Repeat,
  Loader2, // Added Loader2 here
} from "lucide-react";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterTime, setFilterTime] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Dummy transaction data
  const dummyTransactions = [
    {
      id: "1",
      date: "2024-07-10",
      description: "MTN Airtime Purchase",
      type: "Airtime",
      amount: 500,
      status: "Completed",
    },
    {
      id: "2",
      date: "2024-07-09",
      description: "Glo Data Bundle (2GB)",
      type: "Data",
      amount: 700,
      status: "Completed",
    },
    {
      id: "3",
      date: "2024-07-08",
      description: "EKEDC Electricity Bill",
      type: "Electricity",
      amount: 3000,
      status: "Completed",
    },
    {
      id: "4",
      date: "2024-07-07",
      description: "DSTV Premium Subscription",
      type: "Cable TV",
      amount: 9000,
      status: "Completed",
    },
    {
      id: "5",
      date: "2024-07-06",
      description: "WAEC GCE E-PIN (x1)",
      type: "E-PIN",
      amount: 4000,
      status: "Completed",
    },
    {
      id: "6",
      date: "2024-07-05",
      description: "Gift Money to John Doe",
      type: "Gift",
      amount: 1000,
      status: "Completed",
    },
    {
      id: "7",
      date: "2024-07-04",
      description: "Fund Wallet",
      type: "Fund",
      amount: 20000,
      status: "Completed",
    },
    {
      id: "8",
      date: "2024-07-03",
      description: "Withdrawal to Bank",
      type: "Withdrawal",
      amount: 5000,
      status: "Pending",
    },
    {
      id: "9",
      date: "2024-07-02",
      description: "Failed Airtime Purchase",
      type: "Airtime",
      amount: 100,
      status: "Failed",
    },
  ];

  useEffect(() => {
    // Simulate API call to fetch transactions
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // API NOT FOUND: This would be a fetch call to your backend API
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        setTransactions(dummyTransactions); // Use dummy data for now
        // If API was real and failed: throw new Error('Failed to fetch transactions from API');
      } catch (err: any) {
        setError(
          "API NOT FOUND: Could not fetch transactions. " +
            (err.message || "Please check backend connection.")
        );
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || tx.status.toLowerCase() === filterStatus;
    const matchesType =
      filterType === "all" || tx.type.toLowerCase() === filterType;
    const matchesTime = filterTime === "all";

    return matchesSearch && matchesStatus && matchesType && matchesTime;
  });

  const totalTransactions = filteredTransactions.length;
  const totalAmount = filteredTransactions.reduce(
    (sum, tx) => sum + (tx.status === "Completed" ? tx.amount : 0),
    0
  );
  const completedTransactions = filteredTransactions.filter(
    (tx) => tx.status === "Completed"
  ).length;
  const pendingTransactions = filteredTransactions.filter(
    (tx) => tx.status === "Pending"
  ).length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const handleExport = () => {
    alert("API NOT FOUND: Export functionality would be implemented here.");
  };

  return (
    <div className="p-6 bg-[var(--color-light-bg)] min-h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-dark-text)]">
          Transaction History
        </h1>
        <Button
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white px-4 py-2 rounded-md flex items-center"
          onClick={handleExport}
        >
          <Download className="h-5 w-5 mr-2" /> Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-5 rounded-xl shadow-md flex items-center justify-between">
          <CardContent className="p-0 flex flex-col">
            <p className="text-sm text-gray-600">Total Transactions</p>
            <p className="text-2xl font-bold text-[var(--color-dark-text)] mt-1">
              {totalTransactions}
            </p>
          </CardContent>
          <RefreshCcw className="h-10 w-10 text-[var(--color-primary)]" />
        </Card>
        <Card className="p-5 rounded-xl shadow-md flex items-center justify-between">
          <CardContent className="p-0 flex flex-col">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-2xl font-bold text-[var(--color-dark-text)] mt-1">
              ₦{totalAmount.toLocaleString()}
            </p>
          </CardContent>
          <DollarSign className="h-10 w-10 text-[var(--color-secondary)]" />
        </Card>
        <Card className="p-5 rounded-xl shadow-md flex items-center justify-between">
          <CardContent className="p-0 flex flex-col">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-[var(--color-dark-text)] mt-1">
              {completedTransactions}
            </p>
          </CardContent>
          <CheckCircle className="h-10 w-10 text-green-500" />
        </Card>
        <Card className="p-5 rounded-xl shadow-md flex items-center justify-between">
          <CardContent className="p-0 flex flex-col">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-[var(--color-dark-text)] mt-1">
              {pendingTransactions}
            </p>
          </CardContent>
          <Clock className="h-10 w-10 text-yellow-500" />
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 rounded-xl shadow-md mb-6">
        <CardContent className="p-0 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="airtime">Airtime</SelectItem>
                <SelectItem value="data">Data</SelectItem>
                <SelectItem value="electricity">Electricity</SelectItem>
                <SelectItem value="cable tv">Cable TV</SelectItem>
                <SelectItem value="e-pin">E-PIN</SelectItem>
                <SelectItem value="gift">Gift</SelectItem>
                <SelectItem value="fund">Fund</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterTime} onValueChange={setFilterTime}>
              <SelectTrigger>
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="p-6 rounded-xl shadow-md">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-xl font-bold text-[var(--color-dark-text)] flex items-center">
            <Repeat className="h-6 w-6 mr-2 text-[var(--color-primary)]" />{" "}
            Transactions ({filteredTransactions.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-[var(--color-primary)]" />
              <p className="ml-3 text-gray-600">Loading transactions...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-8">
              <p className="font-semibold">{error}</p>
              <p className="text-sm mt-2">
                Please ensure your backend is running and accessible.
              </p>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>No transactions found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {tx.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {tx.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {tx.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        ₦{tx.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                          {getStatusIcon(tx.status)}
                          <span className="ml-1">{tx.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
