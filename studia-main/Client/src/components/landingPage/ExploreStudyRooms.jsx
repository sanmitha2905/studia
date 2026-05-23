import { Users, Lock, ChevronRight, Activity } from "lucide-react";

function StudyRooms() {
  const rooms = [
    {
      name: "Advanced Algorithms",
      category: "Computer Science",
      members: 12,
      isActive: true,
      isLocked: false,
    },
    {
      name: "Data Structures Lab",
      category: "Study Room",
      members: 8,
      isActive: true,
      isLocked: false,
    },
    {
      name: "ML Deep Dive",
      category: "Tech",
      members: 15,
      isActive: true,
      isLocked: false,
    },
    {
      name: "Database Design",
      category: "Professional",
      members: 6,
      isActive: true,
      isLocked: true,
    },
    {
      name: "Systems Programming",
      category: "Computer Science",
      members: 10,
      isActive: true,
      isLocked: false,
    },
  ];

  return (
    <section className="w-full bg-[var(--bg-primary)] text-[var(--txt)] py-24 px-4 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4 text-red-500">
              <Activity size={20} />
              <span className="font-bold tracking-widest text-xs uppercase">Live Sessions</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Explore <span className="text-[var(--txt-dim)]">Study Rooms</span>
            </h2>
            <p className="text-[var(--txt-dim)] text-lg max-w-lg">Join active sessions or create your own room to start studying with peers.</p>
          </div>
          <a
            href="#"
            className="text-red-500 hover:text-red-400 font-medium flex items-center gap-2 transition-colors group"
          >
            Browse all rooms <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="bg-[var(--bg-sec)] border border-[var(--border)] rounded-xl p-6 hover:border-red-500/50 hover:bg-[var(--bg-ter)] transition-all group cursor-pointer"
            >
              {/* Header Row */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[var(--txt)] group-hover:text-red-500 transition-colors mb-1">{room.name}</h3>
                  <p className="text-xs font-mono text-[var(--txt-dim)] uppercase tracking-wider">{room.category}</p>
                </div>
                {room.isActive && (
                  <span className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold rounded flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    Active
                  </span>
                )}
              </div>

              {/* Members and Actions */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border)] group-hover:border-[var(--border)]">
                <div className="flex items-center gap-2 text-[var(--txt-dim)] group-hover:text-[var(--txt)]">
                  <Users size={16} />
                  <span className="text-sm font-medium">{room.members} Members</span>
                </div>

                {/* Lock indicator or Join Button */}
                {room.isLocked ? (
                  <div className="flex items-center gap-2 text-[var(--txt-dim)] text-sm">
                    <Lock size={14} />
                    <span>Private</span>
                  </div>
                ) : (
                  <span className="text-red-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Join Room <ChevronRight size={14} />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudyRooms;
