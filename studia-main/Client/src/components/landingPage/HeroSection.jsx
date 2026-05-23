import { ChevronRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-transparent text-[var(--txt)] pt-24 pb-32 px-4 relative overflow-hidden">
      {/* Decoration removed - moved to LandingPage.jsx */}

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Pill Label */}
        <div className="flex justify-center mb-8">
          <div className="px-4 py-1.5 rounded-full bg-[var(--bg-sec)] border border-[var(--border)] text-[var(--txt-dim)] text-sm font-medium flex items-center gap-2 transition-colors cursor-default">
            <span className="px-2 py-0.5 rounded bg-[var(--bg-ter)] text-xs text-[var(--txt)] font-bold">New</span>
            Join thousands of students achieving their goals
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 tracking-tight text-[var(--txt)] leading-[1.1]">
            Master your studies with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">focused sessions</span>
          </h2>
          <p className="text-[var(--txt-dim)] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Track your study time, compete with friends, and achieve your academic goals with
            Studia's powerful analytics and collaborative study rooms.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={() => navigate("/auth/login")} className="h-12 px-8 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:-translate-y-1">
            Start Studying Now
            <ChevronRight size={18} />
          </button>
          <button className="h-12 px-8 bg-[var(--bg-sec)] hover:bg-[var(--bg-ter)] border border-[var(--border)] text-[var(--txt)] rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
            <Play size={18} className="fill-current" />
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
