"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Key, Lock, Check, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

type Step = 1 | 2 | 3 | 4;

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Step 1 - Send reset code
  async function handleSendCode() {
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    setEmailError("");
    try {
      setIsLoading(true);
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.statusMsg === "success") {
        setStep(2);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  // Step 2 - Verify reset code
  async function handleVerifyCode() {
    if (!resetCode) {
      toast.error("Please enter the verification code");
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
      });
      const data = await res.json();
      if (data.status === "Success") {
        setStep(3);
      } else {
        toast.error(data.message || "Invalid code");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  // Step 3 - Reset password
  async function handleResetPassword() {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (data.token) {
        setStep(4);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const steps = [
    { icon: <Mail className="w-4 h-4" />, done: step > 1 },
    { icon: <Key className="w-4 h-4" />, done: step > 2 },
    { icon: <Lock className="w-4 h-4" />, done: step > 3 },
  ];

  return (

    <>
    
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-0 bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-[#f0fdf4] p-12 relative overflow-hidden">
          {/* Background  */}
          <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-green-200/40" />
          <div className="absolute bottom-20 left-5 w-16 h-16 rounded-full bg-green-200/40" />
          <div className="absolute top-1/2 right-5 w-10 h-10 rounded-full bg-green-300/30" />

          {/* Icons */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center z-10">
              <Lock className="w-12 h-12 text-green-600" />
            </div>
            <div className="absolute -left-10 -top-4 w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center rotate-[-8deg]">
              <Mail className="w-7 h-7 text-green-500" />
            </div>
            <div className="absolute -right-10 -top-4 w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center rotate-[8deg]">
              <ShieldCheck className="w-7 h-7 text-green-500" />
            </div>
          </div>

          {/* Dots */}
          <div className="flex gap-2 mb-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === (step - 1) % 3 ? "bg-green-600" : "bg-green-300"}`} />
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">Reset Your Password</h2>
          <p className="text-gray-500 text-center text-sm leading-relaxed max-w-xs">
            don’t worry, it happens to the best of us. We’ll help you get back into your account in no time.
          </p>

          <div className="flex items-center gap-6 mt-8">
            {[
              { icon: <Mail className="w-4 h-4 text-green-600" />, label: "Email Verification" },
              { icon: <ShieldCheck className="w-4 h-4 text-green-600" />, label: "Secure Reset" },
              { icon: <Lock className="w-4 h-4 text-green-600" />, label: "Encrypted" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-gray-600">
                {icon}
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-center px-8 py-12 sm:px-12">

          {/* Logo */}
          <div className="text-center mb-6">
            <span className="text-2xl font-bold">
              <span className="text-green-600">Fresh</span>
              <span className="text-gray-900">Cart</span>
            </span>
          </div>

          {step === 4 ? (
            // Success Screen
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset!</h2>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
              <Link
                href="/login"
                className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              {/* Title */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {step === 1 ? "Forgot Password?" : step === 2 ? "Check Your Email" : "Create New Password"}
                </h1>
                <p className="text-gray-500 text-sm">
                  {step === 1
                    ? "No worries, we'll send you a reset code"
                    : step === 2
                    ? `Enter the 6-digit code sent to ${email}`
                    : "Your new password must be different from previous passwords"}
                </p>
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                      step === i + 1
                        ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                        : s.done
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {s.done ? <Check className="w-4 h-4" /> : s.icon}
                    </div>
                    {i < 2 && (
                      <div className={`w-16 h-0.5 ${s.done ? "bg-green-600" : "bg-gray-200"}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1 - Email */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
                        className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      />
                    </div>
                    {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                  </div>
                  <button
                    onClick={handleSendCode}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending Code...</>
                    ) : "Send Reset Code"}
                  </button>
                  <div className="text-center">
                    <Link href="/login" className="text-sm text-green-600 hover:text-green-700 flex items-center justify-center gap-1">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                    </Link>
                  </div>
                </div>
              )}

              {/* Step 2 - Verify Code */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Verification Code</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="••••••"
                        maxLength={6}
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
                        className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all text-center text-2xl tracking-[0.5em] font-mono"
                      />
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-500">
                    Didn’t receive the code?{" "}
                    <button onClick={() => { setStep(1); }} className="text-green-600 font-medium hover:text-green-700 cursor-pointer">
                      Resend Code
                    </button>
                  </p>
                  <button
                    onClick={handleVerifyCode}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</>
                    ) : "Verify Code"}
                  </button>
                  <div className="text-center">
                    <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 font-medium transition-colors cursor-pointer ">
                      <ArrowLeft className="w-3.5 h-3.5" /> Change email address
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 - New Password */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showNew ? "text" : "password"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl pl-11 pr-11 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      />
                      <button onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl pl-11 pr-11 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                      />
                      <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleResetPassword}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    {isLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Resetting...</>
                    ) : "Reset Password"}
                  </button>
                </div>
              )}

              {/* Remember password */}
              {step !== 3 && (
                <div className="text-center mt-8 pt-6 border-t border-gray-100"><p className="text-gray-600">Remember your password?{" "} <Link className="text-green-600 hover:text-green-700 font-semibold transition-colors" href="/login">Sign In</Link></p></div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
     {/* Features Bar */}
        <div className="bg-green-50 border-y border-green-100 mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Free Shipping */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 576 512"
                    className="w-5 h-5 text-[#16a34a]"
                    fill="currentColor"
                  >
                    <path d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Free Shipping
                  </h4>
                  <p className="text-gray-500 text-xs">
                    On orders over 500 EGP
                  </p>
                </div>
              </div>

              {/* Easy Returns */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 512 512"
                    className="w-4.5 h-4.5 text-[#16a34a]"
                    fill="currentColor"
                  >
                    <path d="M256 64c-56.8 0-107.9 24.7-143.1 64l47.1 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 192c-17.7 0-32-14.3-32-32L0 32C0 14.3 14.3 0 32 0S64 14.3 64 32l0 54.7C110.9 33.6 179.5 0 256 0 397.4 0 512 114.6 512 256S397.4 512 256 512c-87 0-163.9-43.4-210.1-109.7-10.1-14.5-6.6-34.4 7.9-44.6s34.4-6.6 44.6 7.9c34.8 49.8 92.4 82.3 157.6 82.3 106 0 192-86 192-192S362 64 256 64z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Easy Returns
                  </h4>
                  <p className="text-gray-500 text-xs">14-day return policy</p>
                </div>
              </div>

              {/* Secure Payment */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 512 512"
                    className="w-4.5 h-4.5 text-[#16a34a]"
                    fill="currentColor"
                  >
                    <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Secure Payment
                  </h4>
                  <p className="text-gray-500 text-xs">100% secure checkout</p>
                </div>
              </div>

              {/* 24/7 Support */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 448 512"
                    className="w-4.5 h-4.5 text-[#16a34a]"
                    fill="currentColor"
                  >
                    <path d="M224 64c-79 0-144.7 57.3-157.7 132.7 9.3-3 19.3-4.7 29.7-4.7l16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0c-53 0-96-43-96-96l0-64C0 100.3 100.3 0 224 0S448 100.3 448 224l0 168.1c0 66.3-53.8 120-120.1 120l-87.9-.1-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 0 40 0c39.8 0 72-32.2 72-72l0-20.9c-14.1 8.2-30.5 12.8-48 12.8l-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48l16 0c10.4 0 20.3 1.6 29.7 4.7-13-75.3-78.6-132.7-157.7-132.7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    24/7 Support
                  </h4>
                  <p className="text-gray-500 text-xs">Contact us anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}