import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard, AlertCircle, CheckCircle } from "lucide-react";

interface Fee {
  id: string;
  fee_type: string;
  amount: number;
  due_date: string;
  paid_date: string | null;
  status: string;
  semester: number;
  academic_year: string;
}

const Fees = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [fees, setFees] = useState<Fee[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchFees();
    }
  }, [user]);

  const fetchFees = async () => {
    const { data, error } = await supabase
      .from("fees")
      .select("*")
      .order("due_date", { ascending: false });

    if (!error && data) {
      setFees(data);
    }
    setLoadingData(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500"><AlertCircle className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" /> Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const totalPending = fees
    .filter(f => f.status === "pending" || f.status === "overdue")
    .reduce((acc, f) => acc + Number(f.amount), 0);

  const totalPaid = fees
    .filter(f => f.status === "paid")
    .reduce((acc, f) => acc + Number(f.amount), 0);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <CreditCard className="w-8 h-8" />
            Fee Management
          </h1>
          <p className="text-muted-foreground mt-2">View and manage your fee payments</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">₹{totalPending.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fee History</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingData ? (
              <p className="text-center py-8 text-muted-foreground">Loading fees...</p>
            ) : fees.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No fee records found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Semester</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fees.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell className="font-medium">{fee.fee_type}</TableCell>
                      <TableCell>₹{Number(fee.amount).toLocaleString()}</TableCell>
                      <TableCell>{new Date(fee.due_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {fee.paid_date ? new Date(fee.paid_date).toLocaleDateString() : "-"}
                      </TableCell>
                      <TableCell>{getStatusBadge(fee.status)}</TableCell>
                      <TableCell>Sem {fee.semester}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Fees;
