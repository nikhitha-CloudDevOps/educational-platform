import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageSquare, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="header-nav sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <h1 
              className="text-xl font-bold tracking-tight cursor-pointer"
              onClick={() => navigate("/")}
            >
              EDUPORTAL
            </h1>
            <nav className="hidden md:flex items-center gap-1">
              <Button 
                variant="ghost" 
                className="text-white/90 hover:text-white hover:bg-white/10"
                onClick={() => navigate("/attendance")}
              >
                Attendance
              </Button>
              <Button 
                variant="ghost" 
                className="text-white/90 hover:text-white hover:bg-white/10"
                onClick={() => navigate("/timetable")}
              >
                Timetable
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/10">
                    Services ▼
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem onClick={() => navigate("/results")}>Results</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/library")}>Library</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/fees")}>Fees</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/feedback")}>Feedback</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white/90 hover:text-white hover:bg-white/10 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[hsl(var(--gold))] rounded-full" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white/90 hover:text-white hover:bg-white/10"
              onClick={() => navigate("/feedback")}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white/90 hover:text-white hover:bg-white/10">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-muted-foreground text-sm">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                className="text-white/90 hover:text-white hover:bg-white/10"
                onClick={() => navigate("/auth")}
              >
                Login
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white/90 hover:text-white hover:bg-white/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/attendance")}>Attendance</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/timetable")}>Timetable</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/results")}>Results</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/library")}>Library</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/fees")}>Fees</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/feedback")}>Feedback</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
