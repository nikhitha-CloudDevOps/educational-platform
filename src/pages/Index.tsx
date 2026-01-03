import Header from "@/components/Header";
import WelcomeBanner from "@/components/WelcomeBanner";
import QuickActions from "@/components/QuickActions";
import StudentNotices from "@/components/StudentNotices";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <WelcomeBanner userName="Lakshminarayana" />
        
        {/* Quick Actions */}
        <section>
          <QuickActions />
        </section>

        {/* Welcome Message */}
        <div className="text-center py-2">
          <p className="text-muted-foreground">
            Welcome to <span className="font-semibold text-primary">EduPortal</span>, a member of Academic Excellence Universities
          </p>
        </div>

        {/* Student Notices */}
        <section>
          <StudentNotices />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
