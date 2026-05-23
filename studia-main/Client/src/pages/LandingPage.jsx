import NavBar from "@/components/landingPage/NavBar";
import HeroSection from "@/components/landingPage/HeroSection";
import ExploreStudyRooms from "@/components/landingPage/ExploreStudyRooms";
import GamificationStats from "@/components/landingPage/GamificationStats";
import Features from "@/components/landingPage/Features";
import Footer from "@/components/landingPage/Footer";

const StudiaLanding = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--txt)] font-sans selection:bg-red-500/30 relative">
      {/* Global Background Glow - positioned here to sit behind NavBar and Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10">
        <NavBar />
        <HeroSection />
        <ExploreStudyRooms />
        <Features />
        <GamificationStats />
        <Footer />
      </div>
    </div>
  );
};

export default StudiaLanding;
