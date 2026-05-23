import { BarChart3, Zap, Clock, Target, MessageCircle, Award } from "lucide-react";

function Features() {
  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track total study hours, daily averages, and performance trends. View detailed graphs showing your progress over time.",
    },
    {
      icon: Award,
      title: "Leaderboards & Rankings",
      description: "Compete with friends and climb the rankings. See weekly and monthly leaderboards showing who is studying the most.",
    },
    {
      icon: Clock,
      title: "Study Sessions",
      description: "Join or create study rooms with different categories. Track time spent in each session and maintain focus.",
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Set weekly or monthly study goals and track your progress. Visualize completion rates and stay motivated.",
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description: "Communicate with study partners instantly. Share notes, ask questions, and collaborate on assignments.",
    },
    {
      icon: Zap,
      title: "Achievement Badges",
      description: "Earn badges and unlock achievements as you study. Progress through levels based on your consistency.",
    },
  ];

  return (
    <section className="w-full bg-[var(--bg-primary)] text-[var(--txt)] py-24 px-4 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to <span className="text-[var(--txt)]">succeed</span></h2>
          <p className="text-[var(--txt-dim)] text-lg max-w-2xl mx-auto">
            Powerful features designed for focused studying and academic excellence
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-[var(--bg-sec)] border border-[var(--border)] rounded-2xl p-8 hover:bg-[var(--bg-ter)] hover:border-red-500/30 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl w-fit group-hover:bg-red-500 group-hover:border-red-500 transition-all">
                  <Icon size={24} className="text-red-500 group-hover:text-white transition-colors" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-[var(--txt)]">{feature.title}</h3>

                {/* Description */}
                <p className="text-[var(--txt-dim)] text-sm leading-relaxed group-hover:text-[var(--txt)]">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
