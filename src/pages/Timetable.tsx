import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, MapPin, User } from "lucide-react";

interface TimetableEntry {
  id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  subject: string;
  teacher: string;
  room: string;
}

const Timetable = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [selectedDay, setSelectedDay] = useState("Monday");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    const { data, error } = await supabase
      .from("timetable")
      .select("*")
      .order("start_time", { ascending: true });

    if (!error && data) {
      setTimetable(data);
    }
    setLoadingData(false);
  };

  const filteredTimetable = timetable.filter(entry => entry.day_of_week === selectedDay);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <Clock className="w-8 h-8" />
            Class Timetable
          </h1>
          <p className="text-muted-foreground mt-2">View your weekly class schedule</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedDay === day
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{selectedDay}'s Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingData ? (
              <p className="text-center py-8 text-muted-foreground">Loading timetable...</p>
            ) : filteredTimetable.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No classes scheduled for {selectedDay}.</p>
            ) : (
              <div className="space-y-4">
                {filteredTimetable.map((entry) => (
                  <div key={entry.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h3 className="font-semibold text-lg text-primary">{entry.subject}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <User className="w-4 h-4" />
                          <span>{entry.teacher}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-primary font-medium">
                          <Clock className="w-4 h-4" />
                          <span>{entry.start_time} - {entry.end_time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <MapPin className="w-4 h-4" />
                          <span>{entry.room}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Timetable;
