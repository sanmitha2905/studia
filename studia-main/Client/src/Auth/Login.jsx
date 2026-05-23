import { Button } from "@/components/ui/button";
import axiosInstance from "@/utils/axios";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";
import { motion } from "framer-motion";

const backendUrl = import.meta.env.VITE_API_URL;

function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const hasLoggedIn = useRef(false);

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/auth/google`;
  };

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (hasLoggedIn.current) return;
    try {
      const url = `/auth/login`;
      const response = await axiosInstance.post(url, data);
      hasLoggedIn.current = true;
      reset();
      const { token, refreshToken } = response.data;
      if (token) localStorage.setItem("token", token);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
      window.dispatchEvent(new Event("tokenChanged"));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      hasLoggedIn.current = false;
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  const inputClass = "block w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm bg-[var(--bg-primary)] text-[var(--txt)] focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 placeholder:text-[var(--txt-dim)] hover:border-red-500/30";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5 group">
          <label htmlFor="identifier" className="text-xs font-semibold text-[var(--txt)] ml-1 uppercase tracking-wider">
            Email or Username
          </label>
          <input
            id="identifier"
            type="text"
            placeholder="Enter your email or username"
            {...register("identifier", { required: "Required" })}
            className={inputClass}
          />
          {errors.identifier && <p className="text-red-500 text-xs ml-1 flex items-center gap-1 animate-in slide-in-from-left-1 fade-in">
            <span className="w-1 h-1 bg-red-500 rounded-full inline-block" />
            {errors.identifier.message}
          </p>}
        </div>

        <div className="space-y-1.5 relative group">
          <label htmlFor="password" className="text-xs font-semibold text-[var(--txt)] ml-1 uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("Password", { required: "Required", minLength: 6 })}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-[var(--txt-dim)] hover:text-[var(--txt)] transition-colors p-1 rounded-md hover:bg-[var(--bg-sec)]"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errors.Password && <p className="text-red-500 text-xs ml-1 flex items-center gap-1 animate-in slide-in-from-left-1 fade-in">
            <span className="w-1 h-1 bg-red-500 rounded-full inline-block" />
            {errors.Password.message || "Invalid password"}
          </p>}
        </div>

        <div className="flex justify-end">
          <Link to="/auth/forgot-password" size="sm" className="text-xs font-medium text-[var(--txt-dim)] hover:text-red-500 transition-colors">
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || hasLoggedIn.current}
          className="w-full bg-red-600 hover:bg-red-700 text-white h-12 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
        >
          {isSubmitting || hasLoggedIn.current ? (
            <>
              <Loader2 className="animate-spin size-4" />
              Signing In...
            </>
          ) : (
            <>
              Sign In <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]"></div>
        </div>
        <div className="relative flex justify-center text-xs font-medium uppercase tracking-widest">
          <span className="bg-[var(--bg-sec)] px-3 text-[var(--txt-dim)]">Or continue with</span>
        </div>
      </div>

      <Button
        onClick={handleGoogleLogin}
        variant="outline"
        className="flex items-center justify-center gap-3 w-full border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--txt)] h-12 rounded-xl text-sm font-semibold hover:bg-[var(--bg-ter)] hover:border-[var(--txt-dim)] transition-all group"
      >
        <img src="/GoogleIcon.svg" alt="Google" className="size-5 group-hover:scale-110 transition-transform" />
        <span>Google Account</span>
      </Button>

      <p className="text-center text-sm text-[var(--txt-dim)] mt-2">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="text-red-500 hover:text-red-400 font-bold hover:underline underline-offset-4 transition-all">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
