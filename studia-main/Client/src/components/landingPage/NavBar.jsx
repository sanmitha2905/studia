import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full px-4 sm:px-8 py-4 flex justify-between items-center z-50 bg-transparent sticky top-0 backdrop-blur-sm">
      <div className="flex items-center gap-8 flex-1">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="bg-red-600 p-1.5 rounded-lg">
            <img src="/removedbglogo.png" alt="Studia" className="h-6 w-6 brightness-0 invert" />
          </div>
          <span className="text-xl font-bold text-[var(--txt)] tracking-tight">Studia</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#" className="text-[var(--txt-dim)] hover:text-[var(--txt)] transition-colors text-sm font-medium">Dashboard</a>
          <a href="#" className="text-[var(--txt-dim)] hover:text-[var(--txt)] transition-colors text-sm font-medium flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            Session
          </a>
          <a href="#" className="text-[var(--txt-dim)] hover:text-[var(--txt)] transition-colors text-sm font-medium">Chat</a>
          <a href="#" className="text-[var(--txt-dim)] hover:text-[var(--txt)] transition-colors text-sm font-medium">Notes</a>
          <a href="#" className="text-[var(--txt-dim)] hover:text-[var(--txt)] transition-colors text-sm font-medium">Friends</a>
        </div>
      </div>

      {/* Auth Links */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/auth/login")}
          className="text-[var(--txt-dim)] text-sm font-medium hover:text-[var(--txt)] transition-colors"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/auth/signup")}
          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
