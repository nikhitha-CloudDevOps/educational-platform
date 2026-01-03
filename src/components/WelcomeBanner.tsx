import { Sparkles } from "lucide-react";

interface WelcomeBannerProps {
  userName?: string;
}

const WelcomeBanner = ({ userName = "Student" }: WelcomeBannerProps) => {
  return (
    <div className="banner-gradient text-white rounded-xl p-6 md:p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-white/80">We believe in your future.</span>
          <Sparkles className="h-4 w-4 gold-accent" />
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-white/80">We believe in academic excellence.</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mt-4">
          Hi, {userName}! 👋
        </h2>
        <p className="text-white/80 mt-2 text-sm md:text-base">
          Welcome back to your learning portal. Let's continue your academic journey.
        </p>
      </div>

      {/* Optional: University logo placeholder */}
      <div className="absolute top-4 right-4 md:top-6 md:right-8 hidden md:block">
        <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <span className="text-2xl font-bold">EP</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
