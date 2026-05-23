import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import axiosInstance from "@/utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const backendUrl = import.meta.env.VITE_API_URL;

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const hasSubmitted = useRef(false);

  const validateEmail = (value) => {
    if (!value) return "Email is required";
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) ? true : "Enter a valid email address";
  };

  const validateName = (value, fieldName) => {
    if (!value) return `${fieldName} is required`;
    if (!/^[A-Za-z ]*$/.test(value)) return "Please input only letters";
    if (value.length < 2) return "Min 2 letters";
    return true;
  };

  const validateUsername = async (value) => {
    if (!value) return "Username is required";
    if (!/^[A-Za-z0-9_]*$/.test(value))
      return "Letters, numbers, and underscores only";
    if (value.length < 3) return "Min 3 characters";

    try {
      setIsCheckingUsername(true);
      const response = await axiosInstance.get(
        `/user/check-username?username=${value}`
      );
      if (response.data.exists) return "Username taken";
    } catch {
      return "Validation failed";
    } finally {
      setIsCheckingUsername(false);
    }
    return true;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    mode: "onBlur",
  });

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/auth/google`;
  };

  const onSubmit = async (data) => {
    if (hasSubmitted.current) return;
    try {
      hasSubmitted.current = true;
      const response = await axiosInstance.post(`/auth/signup`, data);
      reset();
      const { activationToken } = response.data;
      if (activationToken) {
        localStorage.setItem("activationToken", activationToken);
        navigate("/auth/verify");
      } else {
        toast.success("Account created successfully!");
        navigate("/auth/login");
      }
    } catch (error) {
      hasSubmitted.current = false;
      toast.error(error.response?.data?.error || "Signup failed");
    }
  };

  const inputClass = "block w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm bg-[var(--bg-primary)] text-[var(--txt)] focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 placeholder:text-[var(--txt-dim)] hover:border-red-500/30";
  const labelClass = "text-xs font-semibold text-[var(--txt)] ml-1 uppercase tracking-wider";
  const errorClass = "text-red-500 text-xs ml-1 flex items-center gap-1 animate-in slide-in-from-left-1 fade-in";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5 group">
            <label className={labelClass}>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              {...register("FirstName", { validate: (v) => validateName(v, "First Name") })}
              className={inputClass}
            />
            {errors.FirstName && <p className={errorClass}>
              <span className="w-1 h-1 bg-red-500 rounded-full inline-block" />
              {errors.FirstName.message}
            </p>}
          </div>
          <div className="space-y-1.5 group">
            <label className={labelClass}>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              {...register("LastName", { validate: (v) => validateName(v, "Last Name") })}
              className={inputClass}
            />
            {errors.LastName && <p className={errorClass}>
              <span className="w-1 h-1 bg-red-500 rounded-full inline-block" />
              {errors.LastName.message}
            </p>}
          </div>
        </div>

        <div className="space-y-1.5 relative group">
          <label className={labelClass}>Username</label>
          <div className="relative">
            <Controller
              name="Username"
              control={control}
              rules={{ validate: validateUsername }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    placeholder="Choose a username"
                    className={inputClass}
                  />
                  {isCheckingUsername && <Loader2 className="absolute right-3 top-3 size-4 animate-spin text-[var(--txt-dim)]" />}
                </>
              )}
            />
          </div>
          {errors.Username && <p className={errorClass}>
            <span className="w-1 h-1 bg-red-500 rounded-full inline-block" />
            {errors.Username.message}
          </p>}
        </div>

        <div className="space-y-1.5 group">
          <label className={labelClass}>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("Email", { validate: validateEmail })}
            className={inputClass}
          />
          {errors.Email && <p className={errorClass}>
            <span className="w-1 h-1 bg-red-500 rounded-full inline-block" />
            {errors.Email.message}
          </p>}
        </div>

        <div className="space-y-1.5 relative group">
          <label className={labelClass}>Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              {...register("Password", { required: "Required", minLength: { value: 6, message: "Min 6 chars" } })}
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
          {errors.Password && <p className={errorClass}>
            <span className="w-1 h-1 bg-red-500 rounded-full inline-block" />
            {errors.Password.message}
          </p>}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || hasSubmitted.current}
          className="w-full bg-red-600 hover:bg-red-700 text-white h-12 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 mt-2"
        >
          {isSubmitting || hasSubmitted.current ? (
            <>
              <Loader2 className="animate-spin size-4" />
              Creating Account...
            </>
          ) : (
            <>
              Create Account <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--border)]"></div>
        </div>
        <div className="relative flex justify-center text-xs font-medium uppercase tracking-widest">
          <span className="bg-[var(--bg-sec)] px-3 text-[var(--txt-dim)]">Or join with</span>
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
        Already have an account?{" "}
        <Link to="/auth/login" className="text-red-500 hover:text-red-400 font-bold hover:underline underline-offset-4 transition-all">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
