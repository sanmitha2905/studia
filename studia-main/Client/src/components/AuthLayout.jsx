import { motion, AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

const containerVariants = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }, // Custom easeOutCubic
  },
};

const formVariants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: 0.1 },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 },
  },
};

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="flex justify-center items-center min-h-screen w-full p-6 text-[var(--txt)] bg-[var(--bg-primary)]">
      {/* Subtle background glow for premium feel */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="w-full max-w-[420px] bg-[var(--bg-sec)] rounded-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] border border-[var(--border)] relative z-10 overflow-hidden"
      >
        {/* Decorative top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-red-600 to-amber-500" />

        <div className="p-8 sm:p-10">
          <div className="flex flex-col items-center w-full mb-10">
            <div className="bg-red-600/10 p-3 rounded-xl mb-4 shadow-inner ring-1 ring-red-500/20">
              <img src="/removedbglogo.png" alt="Logo" className="size-10 mb-0 invert dark:invert-0 drop-shadow-lg" />
            </div>
            <h3 className="font-bold text-3xl tracking-tight text-[var(--txt)]">Welcome to Studia</h3>
            <p className="text-[var(--txt-dim)] mt-2 text-center text-sm">
              Your professional workspace for academic excellence
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
