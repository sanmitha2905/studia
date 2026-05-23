import { Crown, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

function WeeklyLeaderboard() {
  const navigate = useNavigate();
  const leaderboard = [
    {
      rank: 1,
      name: "Aarav Sharma",
      hours: 29.35,
      initials: "AS",
      color: "bg-amber-500",
      badge: "👑",
    },
    {
      rank: 2,
      name: "Saanvi Patel",
      hours: 24.18,
      initials: "SP",
      color: "bg-neutral-600",
      badge: "#2",
    },
    {
      rank: 3,
      name: "Vivaan Kumar",
      hours: 22.47,
      initials: "VK",
      color: "bg-orange-600",
      badge: "#3",
    },
    {
      rank: 4,
      name: "Ananya Reddy",
      hours: 19.52,
      initials: "AR",
      color: "bg-red-600",
      badge: "#4",
    },
    {
      rank: 5,
      name: "Aditya Singh",
      hours: 18.33,
      initials: "AS",
      color: "bg-red-500",
      badge: "#5",
    },
  ];

  return (
    <section className="w-full bg-[var(--bg-primary)] text-[var(--txt)] py-24 px-4 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">

        {/* Text Side */}
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/30 border border-red-800/50 text-red-400 text-sm font-medium mb-6">
            <Trophy size={14} />
            <span>Leaderboard</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to transform <br />
            your <span className="text-red-500">academic journey?</span>
          </h2>
          <p className="text-[var(--txt-dim)] text-lg leading-relaxed mb-8">
            Experience a smarter way to learn with dedicated sessions and progress tracking. Compete with friends and see who studies the most.
          </p>
          <button
            onClick={() => navigate("/auth/signup")}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-red-900/40"
          >
            Start Your Free Account
          </button>
          <div className="mt-8 flex gap-8 text-sm text-[var(--txt-dim)] font-medium">
            <span className="flex items-center gap-2">✓ Free to use forever</span>
            <span className="flex items-center gap-2">✓ No credit card required</span>
          </div>
        </div>

        {/* Leaderboard Card Side */}
        <div className="lg:w-1/2 w-full">
          <div className="bg-[var(--bg-sec)] backdrop-blur-sm border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-8 pb-4 border-b border-[var(--border)]">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <h3 className="text-lg text-[var(--txt-dim)] font-medium">Weekly Study Goal</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-[var(--txt)]">94%</span>
                    <span className="text-green-500 text-sm font-medium">+12% from last week</span>
                  </div>
                </div>
                <span className="text-[var(--txt-dim)] text-sm">45/48 hrs</span>
              </div>

              {/* Chart Bars */}
              {/* Chart Bars */}
              <div className="mt-8 flex items-end gap-4 h-40 w-full justify-between px-4 bg-[var(--bg-ter)]/30 rounded-xl p-4 border border-[var(--border)] relative">
                {/* Y-axis grid lines (decorative) */}
                <div className="absolute inset-0 flex flex-col justify-between py-4 px-4 pointer-events-none opacity-20">
                  <div className="w-full h-px bg-[var(--txt-dim)]/30" />
                  <div className="w-full h-px bg-[var(--txt-dim)]/30" />
                  <div className="w-full h-px bg-[var(--txt-dim)]/30" />
                  <div className="w-full h-px bg-[var(--txt-dim)]/30" />
                  <div className="w-full h-px bg-[var(--txt-dim)]/30" />
                </div>

                {/* Bars */}
                {[30, 65, 40, 80, 50, 95, 25].map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 flex-1 group relative z-10 h-full justify-end">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-8 bg-neutral-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-neutral-700 pointer-events-none">
                      {h}% Goal
                    </div>
                    <div
                      className={`w-full max-w-[24px] rounded-t-sm transition-all duration-300 ${i === 5 || i === 3
                          ? 'bg-red-500 hover:bg-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                          : 'bg-neutral-600 hover:bg-neutral-500'
                        }`}
                      style={{ height: `${h}%` }}
                    ></div>
                    <span className="text-[11px] text-[var(--txt-dim)] group-hover:text-[var(--txt)] uppercase font-semibold tracking-wide transition-colors">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="bg-[var(--bg-sec)] p-2">
              {leaderboard.slice(0, 5).map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-[var(--bg-ter)] transition-colors group"
                >
                  {/* Rank & User */}
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-lg text-sm ${user.rank === 1 ? 'bg-amber-500/20 text-amber-500' : 'text-[var(--txt-dim)] bg-[var(--bg-ter)]'}`}>
                      {user.rank === 1 ? <Crown size={14} /> : `#${user.rank}`}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {user.initials}
                      </div>
                      <span className="font-medium text-[var(--txt)] group-hover:text-[var(--txt)] transition-colors">{user.name}</span>
                    </div>
                  </div>

                  {/* Hours */}
                  <span className="text-red-500 font-mono font-medium">{user.hours.toFixed(2)} hrs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeeklyLeaderboard;
