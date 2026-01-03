import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Award, TrendingUp } from "lucide-react";

interface Result {
  id: string;
  subject: string;
  exam_type: string;
  marks_obtained: number;
  max_marks: number;
  grade: string | null;
  semester: number;
  academic_year: string;
}

const Results = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState<Result[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchResults();
    }
  }, [user]);

  const fetchResults = async () => {
    const { data, error } = await supabase
      .from("results")
      .select("*")
      .order("semester", { ascending: false });

    if (!error && data) {
      setResults(data);
    }
    setLoadingData(false);
  };

  const getGradeBadge = (grade: string | null) => {
    if (!grade) return null;
    const gradeColors: Record<string, string> = {
      "A+": "bg-green-600",
      "A": "bg-green-500",
      "B+": "bg-blue-600",
      "B": "bg-blue-500",
      "C+": "bg-yellow-600",
      "C": "bg-yellow-500",
      "D": "bg-orange-500",
      "F": "bg-red-500",
    };
    return <Badge className={gradeColors[grade] || "bg-gray-500"}>{grade}</Badge>;
  };

  const calculatePercentage = (obtained: number, max: number) => {
    return Math.round((obtained / max) * 100);
  };

  const calculateOverallPercentage = () => {
    if (results.length === 0) return 0;
    const totalObtained = results.reduce((acc, r) => acc + r.marks_obtained, 0);
    const totalMax = results.reduce((acc, r) => acc + r.max_marks, 0);
    return Math.round((totalObtained / totalMax) * 100);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <Award className="w-8 h-8" />
            Exam Results
          </h1>
          <p className="text-muted-foreground mt-2">View your academic performance</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Percentage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                {calculateOverallPercentage()}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Exams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{results.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Results History</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingData ? (
              <p className="text-center py-8 text-muted-foreground">Loading results...</p>
            ) : results.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No results found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Exam Type</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Semester</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">{result.subject}</TableCell>
                      <TableCell>{result.exam_type}</TableCell>
                      <TableCell>{result.marks_obtained}/{result.max_marks}</TableCell>
                      <TableCell>{calculatePercentage(result.marks_obtained, result.max_marks)}%</TableCell>
                      <TableCell>{getGradeBadge(result.grade)}</TableCell>
                      <TableCell>Sem {result.semester}</TableCell>
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

export default Results;
