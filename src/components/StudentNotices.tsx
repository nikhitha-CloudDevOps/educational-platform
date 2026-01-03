import { useState } from "react";
import { Bell, FileCheck, Users, BookOpen, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Notice {
  id: number;
  title: string;
  date: string;
  excerpt: string;
}

interface NoticeCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  notices: Notice[];
}

const noticeCategories: NoticeCategory[] = [
  {
    id: "general",
    label: "General Notices",
    icon: <Bell className="h-4 w-4" />,
    notices: [
      { id: 1, title: "Campus Maintenance Schedule", date: "Jan 3, 2026", excerpt: "Scheduled maintenance will occur this weekend..." },
      { id: 2, title: "New Library Hours", date: "Jan 2, 2026", excerpt: "Library operating hours have been updated for the new semester..." },
    ],
  },
  {
    id: "assessment",
    label: "Assessment Notices",
    icon: <FileCheck className="h-4 w-4" />,
    notices: [
      { id: 3, title: "Assignment Submission Deadline Extended", date: "Jan 3, 2026", excerpt: "The deadline for Module BM101 has been extended..." },
      { id: 4, title: "Exam Timetable Released", date: "Jan 1, 2026", excerpt: "The examination timetable for June 2026 is now available..." },
    ],
  },
  {
    id: "orientation",
    label: "Online Orientation",
    icon: <Users className="h-4 w-4" />,
    notices: [
      { id: 5, title: "Welcome Session - July 2026 Intake", date: "Jan 2, 2026", excerpt: "Join our online orientation session for new students..." },
    ],
  },
  {
    id: "library",
    label: "Library Notices",
    icon: <BookOpen className="h-4 w-4" />,
    notices: [
      { id: 6, title: "New E-Resources Available", date: "Dec 30, 2025", excerpt: "Access new academic journals and databases..." },
    ],
  },
  {
    id: "onsite",
    label: "On-site Orientation",
    icon: <MapPin className="h-4 w-4" />,
    notices: [
      { id: 7, title: "Campus Tour Schedule", date: "Dec 28, 2025", excerpt: "Sign up for guided campus tours available weekly..." },
    ],
  },
];

const StudentNotices = () => {
  const [activeTab, setActiveTab] = useState("general");
  const activeCategory = noticeCategories.find((cat) => cat.id === activeTab);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-[hsl(var(--notice-header))] text-white pb-0">
        <CardTitle className="text-lg font-semibold mb-4">
          Student Notices and Announcements
        </CardTitle>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-1 -mb-px">
          {noticeCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all rounded-t-lg ${
                activeTab === category.id
                  ? "bg-card text-foreground"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {category.icon}
              <span className="hidden sm:inline">{category.label}</span>
            </button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6">
        {activeCategory && (
          <div className="space-y-4">
            {activeCategory.notices.length > 0 ? (
              activeCategory.notices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer border-l-4 border-primary"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-medium text-foreground hover:text-primary transition-colors">
                        {notice.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notice.excerpt}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {notice.date}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No notices in this category.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentNotices;
