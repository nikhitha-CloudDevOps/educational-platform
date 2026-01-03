import { useNavigate } from "react-router-dom";
import { 
  CalendarCheck, 
  Clock, 
  Award, 
  BookOpen, 
  CreditCard, 
  MessageSquare,
  KeyRound
} from "lucide-react";

interface QuickActionItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const quickActions: QuickActionItem[] = [
  { icon: <CalendarCheck className="h-6 w-6" />, label: "Attendance", href: "/attendance" },
  { icon: <Clock className="h-6 w-6" />, label: "Timetable", href: "/timetable" },
  { icon: <Award className="h-6 w-6" />, label: "Results", href: "/results" },
  { icon: <BookOpen className="h-6 w-6" />, label: "Library", href: "/library" },
  { icon: <CreditCard className="h-6 w-6" />, label: "Fees", href: "/fees" },
  { icon: <MessageSquare className="h-6 w-6" />, label: "Feedback", href: "/feedback" },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.href)}
            className="quick-action-card group"
          >
            <div className="quick-action-icon group-hover:bg-primary group-hover:text-white transition-colors">
              {action.icon}
            </div>
            <span className="text-xs md:text-sm text-center text-foreground/80 group-hover:text-primary font-medium">
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* Access Panel Button */}
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => navigate("/auth")}
          className="flex items-center gap-2 px-6 py-3 bg-card border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 group"
        >
          <KeyRound className="h-5 w-5 text-primary group-hover:text-white" />
          <span className="font-medium text-primary group-hover:text-white">Access Panel</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
