import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function GoogleRedirect() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { toast } = useToast();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;

    const params = new URLSearchParams(search);
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");
    const error = params.get("error");

    if (error) {
      hasProcessed.current = true;
      toast.error(decodeURIComponent(error) || "Authentication failed. Please try again.");
      setTimeout(() => navigate("/auth/login", { replace: true }), 2000);
      return;
    }

    if (token && refreshToken) {
      hasProcessed.current = true;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      window.dispatchEvent(new Event("tokenChanged"));
      toast.success("Login successful! Welcome back.");
      setTimeout(() => navigate("/", { replace: true }), 1500);
    } else {
      hasProcessed.current = true;
      toast.error("Authentication failed. Missing credentials.");
      setTimeout(() => navigate("/auth/login", { replace: true }), 2000);
    }
  }, [navigate, search, toast]);

  const params = new URLSearchParams(search);
  const hasError = params.get("error");
  const hasToken = params.get("token");

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-[var(--bg-primary)] text-[var(--txt)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-6 p-10 bg-[var(--bg-sec)] rounded-2xl shadow-2xl border border-[var(--border)]"
      >
        {hasError ? (
          <>
            <XCircle className="size-16 text-red-500 animate-pulse" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--txt)] mb-2">Authentication Failed</h2>
              <p className="text-[var(--txt-dim)] text-sm">Redirecting you back to login...</p>
            </div>
          </>
        ) : hasToken ? (
          <>
            <CheckCircle2 className="size-16 text-green-500 animate-pulse" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--txt)] mb-2">Success!</h2>
              <p className="text-[var(--txt-dim)] text-sm">Taking you to your dashboard...</p>
            </div>
          </>
        ) : (
          <>
            <Loader2 className="size-16 text-red-500 animate-spin" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--txt)] mb-2">Logging you in</h2>
              <p className="text-[var(--txt-dim)] text-sm">Please wait a moment...</p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}