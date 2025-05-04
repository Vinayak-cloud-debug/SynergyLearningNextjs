"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";



export default function resetPassword () {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleResetPassword = async () => {
    const email = sessionStorage.getItem("email");
    try {
      const response = await fetch("/api/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset successfully! Redirecting to Home...");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setMessage(data.error || "Failed to reset password.");
        toast.error(data.error || "Failed to reset password.");
      }
    } catch (error) {
      setMessage("An error occurred.");
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#090707] px-4">
      <div className="w-full max-w-md bg-[#030109] flex flex-col gap-7 justify-center items-center text-white h-[600px] rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
        {/* Logo & Title */}
        <div className="flex flex-col gap-2 justify-center items-center">
          <Image src={'SynergyLogo-removebg-preview 1.svg'} alt="Synergy Logo" height={117} width={117} />
          <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
        </div>

        {/* Password Field */}
        <div className="flex flex-col justify-center items-center gap-5">
          <label className="text-sm font-medium text-gray-300 mb-1">Password</label>
          <div className="flex items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-green-500">
            <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
              <Image src={'/keyicon.svg'} width={7} height={7} alt="Key Icon" className="w-7 h-7" />
            </div>
            <input
              type="text"
              placeholder="Enter your New Password"
              className="flex-1 p-3 bg-[#030109] text-white outline-none rounded-r-3xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Reset Button */}
        <button
          className="w-80 bg-[#0B02FF] self-center font-sans hover:bg-[#02AB32] transition-all p-3 rounded-3xl font-semibold text-white flex items-center justify-center"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>

        {/* Error Message */}
        {message && <p className="text-center text-red-400 mt-4">{message}</p>}

        {/* Back Link */}
        <div className="flex justify-center mt-6">
          <Link href="/forgot-password" className="text-[#0A1CB1] font-semibold">
            Back to Verify Gmail
          </Link>
        </div>
      </div>

      <Toaster />
    </div>
  );
};


