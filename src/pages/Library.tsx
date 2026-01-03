import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string | null;
  category: string;
  available_copies: number;
  total_copies: number;
}

interface Borrowing {
  id: string;
  borrowed_date: string;
  due_date: string;
  returned_date: string | null;
  status: string;
  library_books: Book;
}

const Library = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchBooks();
    if (user) {
      fetchBorrowings();
    }
  }, [user]);

  const fetchBooks = async () => {
    const { data, error } = await supabase
      .from("library_books")
      .select("*")
      .order("title", { ascending: true });

    if (!error && data) {
      setBooks(data);
    }
    setLoadingData(false);
  };

  const fetchBorrowings = async () => {
    const { data, error } = await supabase
      .from("library_borrowings")
      .select(`
        *,
        library_books (*)
      `)
      .order("borrowed_date", { ascending: false });

    if (!error && data) {
      setBorrowings(data as unknown as Borrowing[]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "borrowed":
        return <Badge className="bg-blue-500">Borrowed</Badge>;
      case "returned":
        return <Badge className="bg-green-500">Returned</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            Library
          </h1>
          <p className="text-muted-foreground mt-2">Browse books and manage borrowings</p>
        </div>

        <Tabs defaultValue="catalog" className="space-y-6">
          <TabsList>
            <TabsTrigger value="catalog">Book Catalog</TabsTrigger>
            <TabsTrigger value="borrowings">My Borrowings</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog">
            <Card>
              <CardHeader>
                <CardTitle>Available Books</CardTitle>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, author, or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <p className="text-center py-8 text-muted-foreground">Loading books...</p>
                ) : filteredBooks.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">No books found.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Availability</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell className="font-medium">{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>{book.category}</TableCell>
                          <TableCell>
                            <Badge variant={book.available_copies > 0 ? "default" : "secondary"}>
                              {book.available_copies}/{book.total_copies} available
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="borrowings">
            <Card>
              <CardHeader>
                <CardTitle>My Borrowed Books</CardTitle>
              </CardHeader>
              <CardContent>
                {borrowings.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">No borrowings found.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book Title</TableHead>
                        <TableHead>Borrowed Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {borrowings.map((borrowing) => (
                        <TableRow key={borrowing.id}>
                          <TableCell className="font-medium">{borrowing.library_books?.title}</TableCell>
                          <TableCell>{new Date(borrowing.borrowed_date).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(borrowing.due_date).toLocaleDateString()}</TableCell>
                          <TableCell>{getStatusBadge(borrowing.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Library;
