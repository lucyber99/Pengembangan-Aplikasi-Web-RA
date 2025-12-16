import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Eye, Mail, Lock, User, Briefcase, Check } from "lucide-react";

export default function SignIn() {
  const [selectedRole, setSelectedRole] = useState<"buyer" | "agent">("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      <div className="absolute top-[-93px] left-[217px] w-64 h-64 bg-blue-200/30 rounded-full blur-[32px]" />
      <div className="absolute bottom-[-93px] left-[-21px] w-48 h-48 bg-purple-200/30 rounded-full blur-[32px]" />
      
      <div className="relative max-w-[430px] mx-auto px-6 py-5">
        <header className="flex items-center justify-between h-20">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-900" strokeWidth={1.5} />
          </button>
        </header>

        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-[30px] font-bold leading-[36px] text-slate-900 font-manrope">
              Welcome Back
            </h1>
            <p className="text-base text-slate-500 font-manrope">
              Sign in to continue your property journey.
            </p>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-900 font-manrope block">
              Sign in as...
            </label>
            
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedRole("buyer")}
                className={`flex-1 h-[140px] rounded-2xl border-[1.807px] transition-all ${
                  selectedRole === "buyer"
                    ? "border-blue-600 shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),0_1px_3px_0_rgba(0,0,0,0.1)]"
                    : "border-slate-200"
                } relative`}
              >
                {selectedRole === "buyer" && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                )}
                <div className="flex flex-col items-center justify-center h-full space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" fill="currentColor" />
                  </div>
                  <div className="text-center">
                    <div className={`text-base font-bold font-manrope ${
                      selectedRole === "buyer" ? "text-blue-600" : "text-slate-900"
                    }`}>
                      Buyer
                    </div>
                    <div className={`text-xs font-manrope ${
                      selectedRole === "buyer" ? "text-blue-600/70" : "text-slate-500"
                    }`}>
                      Looking for property
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole("agent")}
                className={`flex-1 h-[140px] rounded-2xl border transition-all ${
                  selectedRole === "agent"
                    ? "border-[1.807px] border-blue-600 shadow-[0_1px_2px_-1px_rgba(0,0,0,0.1),0_1px_3px_0_rgba(0,0,0,0.1)]"
                    : "border-[0.903px] border-slate-200"
                } relative`}
              >
                {selectedRole === "agent" && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                )}
                <div className="flex flex-col items-center justify-center h-full space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-slate-500" />
                  </div>
                  <div className="text-center">
                    <div className={`text-base font-bold font-manrope ${
                      selectedRole === "agent" ? "text-blue-600" : "text-slate-900"
                    }`}>
                      Agent
                    </div>
                    <div className={`text-xs font-manrope ${
                      selectedRole === "agent" ? "text-blue-600/70" : "text-slate-500"
                    }`}>
                      Listing properties
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-900 font-manrope block px-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail className="w-5 h-5 text-slate-500" strokeWidth={1.25} />
                </div>
                <input
                  type="email"
                  placeholder="john@example.com"
                  defaultValue="john@example.com"
                  className="w-full h-[54px] rounded-2xl border-[0.903px] border-slate-200 pl-12 pr-4 text-base font-manrope text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-900 font-manrope block px-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-slate-500" strokeWidth={1.25} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  defaultValue="password123"
                  className="w-full h-[54px] rounded-2xl border-[0.903px] border-slate-200 pl-12 pr-12 text-base font-manrope text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Eye className="w-5 h-5 text-slate-500" strokeWidth={1.25} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-3 group"
              >
                <div className={`w-5 h-5 rounded border-[1.807px] flex items-center justify-center transition-all ${
                  rememberMe ? "border-slate-500 bg-slate-500" : "border-slate-500"
                }`}>
                  {rememberMe && (
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                  )}
                </div>
                <span className="text-sm text-slate-500 font-manrope">
                  Remember me
                </span>
              </button>
              
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-blue-600 font-manrope hover:text-blue-700 transition-colors"
              >
                Forgot?
              </Link>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <button className="w-full h-[60px] bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-[0_4px_6px_-4px_rgba(37,99,235,0.25),0_10px_15px_-3px_rgba(37,99,235,0.25)] hover:shadow-[0_10px_25px_-5px_rgba(37,99,235,0.35)] transition-all flex items-center justify-center gap-2 group">
              <span className="text-lg font-bold font-manrope">Sign In</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.25} />
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs text-slate-500 font-manrope uppercase tracking-wider">
                  Or sign in with
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 h-[46px] rounded-2xl border-[0.903px] border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.1589 8.36224H17.4881V8.32768H9.99321V11.6588H14.6996C14.013 13.5979 12.168 14.9898 9.99321 14.9898C7.23384 14.9898 4.9966 12.7526 4.9966 9.99321C4.9966 7.23384 7.23384 4.9966 9.99321 4.9966C11.2669 4.9966 12.4257 5.47711 13.3081 6.26199L15.6635 3.90651C14.1762 2.52036 12.1867 1.66553 9.99321 1.66553C5.39425 1.66553 1.66553 5.39425 1.66553 9.99321C1.66553 14.5922 5.39425 18.3209 9.99321 18.3209C14.5922 18.3209 18.3209 14.5922 18.3209 9.99321C18.3209 9.43484 18.2634 8.8898 18.1589 8.36224Z" fill="#FFC107"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.62573 6.11709L5.36179 8.12365C6.10213 6.29073 7.89508 4.9966 9.99324 4.9966C11.267 4.9966 12.4258 5.47711 13.3081 6.26199L15.6636 3.90651C14.1762 2.52036 12.1868 1.66553 9.99324 1.66553C6.79457 1.66553 4.02062 3.47139 2.62573 6.11709Z" fill="#FF3D00"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.9933 18.3209C12.1443 18.3209 14.0988 17.4977 15.5766 16.1591L12.9992 13.978C12.1351 14.6355 11.0791 14.991 9.9933 14.9899C7.82727 14.9899 5.98811 13.6087 5.29524 11.6813L2.57959 13.7736C3.95782 16.4705 6.75675 18.3209 9.9933 18.3209Z" fill="#4CAF50"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.1589 8.36226H17.4881V8.3277H9.99316V11.6588H14.6996C14.3711 12.5817 13.7795 13.3881 12.9978 13.9784L12.999 13.9776L15.5765 16.1586C15.3941 16.3244 18.3209 14.1571 18.3209 9.99324C18.3209 9.43486 18.2634 8.88982 18.1589 8.36226Z" fill="#1976D2"/>
                </svg>
                <span className="text-sm font-semibold text-slate-900 font-manrope">Google</span>
              </button>

              <button className="flex-1 h-[46px] rounded-2xl border-[0.903px] border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_9_1949)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.6038 10.5986C14.6319 13.6177 17.2524 14.6223 17.2814 14.6352C17.2592 14.706 16.8627 16.0669 15.9008 17.4725C15.0693 18.6879 14.2063 19.8987 12.8468 19.9237C11.5111 19.9484 11.0816 19.1316 9.55437 19.1316C8.02762 19.1316 7.55039 19.8987 6.28589 19.9484C4.97368 19.998 3.97442 18.6342 3.13608 17.4234C1.42284 14.9466 0.113611 10.4245 1.87158 7.37199C2.74489 5.85609 4.30565 4.89624 5.99959 4.87162C7.28814 4.84706 8.50441 5.73852 9.29212 5.73852C10.0793 5.73852 11.5573 4.66647 13.1111 4.8239C13.7615 4.851 15.5874 5.0866 16.7599 6.80275C16.6653 6.86132 14.5812 8.07455 14.6038 10.5986Z" fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.0934 3.18529C12.7902 2.34199 13.259 1.16811 13.1311 0C12.1269 0.0403562 10.9126 0.669177 10.1923 1.51196C9.54682 2.25836 8.98151 3.45293 9.13405 4.59788C10.2534 4.6845 11.3968 4.02909 12.0935 3.18529" fill="black"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_9_1949">
                      <rect width="20" height="20" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-sm font-semibold text-slate-900 font-manrope">Apple</span>
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-slate-500 font-manrope">
                Don't have an account?{" "}
              </span>
              <Link
                to="/register"
                className="text-sm font-bold text-blue-600 font-manrope hover:text-blue-700 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
