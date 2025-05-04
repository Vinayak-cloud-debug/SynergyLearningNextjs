'use client';

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import GenderCheckbox from "../GenderCheckBox/page";
import Image from "next/image";
import Link from "next/link";


export default function SignUp(){
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [gmailVerified, setGmailVerified] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [gmailValue, setGmailValue] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [genOtp, setGenOtp] = useState("");

  const router = useRouter();
  const { setAuthUser } = useAuthContext();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const verifyOtp = () => {
    if (otpValue === genOtp) {
      toast.success("OTP Verified");
      setOtpVerified(true);
    } else {
      toast.error("Invalid OTP");
      setOtpVerified(false);
      setGmailVerified(false);
    }
  };

  const verifyGmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/verifyGmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ GmailValue: gmailValue }),
      });

      const data = await response.json();
      if (data.otp) {
        setGenOtp(data.otp);
        toast.success("OTP sent successfully!");
        setGmailVerified(true);
      } else {
        toast.error(data.error || "Invalid OTP.");
      }
    } catch (error) {
      toast.error("Failed to verify OTP. " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, username, password, confirmPassword, gender } = inputs;

    try {
      const res = await fetch("/api/signUp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
      });

    

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setAuthUser(data.token);
      router.push("/");
      toast.success("Signed Up Successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#090707]">
      <form onSubmit={handleSubmit} className="flex justify-center items-center">
        {!gmailVerified ? (
          // Step 1: Gmail Verification
          <div className="w-full max-w-lg flex flex-col gap-5 bg-[#030109] text-white rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
            <Image src="/SynergyLogo-removebg-preview 1.svg" alt="Synergy Logo" width={117} height={117} />
            <h2 className="text-3xl font-bold text-center mb-6">Verify Gmail</h2>
            <div className="flex flex-col gap-5">
              <div className="flex items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C]">
                <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Enter your Gmail"
                  className="flex-1 p-3 bg-[#030109] text-white outline-none rounded-r-3xl"
                  value={gmailValue}
                  onChange={(e) => setGmailValue(e.target.value)}
                />
              </div>
              <button onClick={verifyGmail} className="w-80 bg-[#0A1CB9] hover:bg-[#02AB32] transition-all p-3 rounded-3xl font-semibold">
                Verify Gmail
              </button>
              <Link href="/login" className="text-[#0A1CB1] font-bold text-center">Back to Login</Link>
            </div>
          </div>
        ) : !otpVerified ? (
          // Step 2: OTP Verification
          <div className="w-full max-w-lg flex flex-col gap-5 bg-[#090707] text-white rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
            <Image src="/SynergyLogo-removebg-preview 1.svg" alt="Synergy Logo" width={117} height={117} />
            <h2 className="text-3xl font-bold text-center mb-6">Verify your OTP</h2>
            <div className="flex items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C]">
              <div className="bg-[#0F0C0C] px-4 py-3 rounded-l-3xl border-r border-gray-600">
                🔐
              </div>
              <input
                type="text"
                placeholder="Enter your OTP"
                className="flex-1 p-3 bg-[#0F0C0C] text-white outline-none rounded-r-3xl"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
              />
            </div>
            <button onClick={verifyOtp} className="w-80 bg-[#0A1CB9] hover:bg-[#02AB32] transition-all p-3 rounded-3xl font-semibold">
              Confirm OTP
            </button>
            <Link href="/login" className="text-[#0A1CB1] font-semibold text-center">Back to Login</Link>
          </div>
        ) : (
          // Step 3: Sign Up Form
          <div className="w-full max-w-lg flex flex-col gap-5 bg-[#030109] text-white rounded-2xl shadow-xl p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
            <Image src="/SynergyLogo-removebg-preview 1.svg" alt="Synergy Logo" width={117} height={117} />
            <h1 className="text-lg font-semibold text-center">Sign Up</h1>

            <input
              className="w-80 rounded-3xl p-3 bg-[#0F0C0C] text-white border border-gray-600"
              placeholder="Full Name"
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />

            <input
              className="w-80 rounded-3xl p-3 bg-[#0F0C0C] text-white border border-gray-600"
              placeholder="Gmail"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />

            <input
              className="w-80 rounded-3xl p-3 bg-[#0F0C0C] text-white border border-gray-600"
              type="password"
              placeholder="Password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />

            <input
              className="w-80 rounded-3xl p-3 bg-[#0F0C0C] text-white border border-gray-600"
              type="password"
              placeholder="Confirm Password"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />

            <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

            <button className="w-full bg-[#0A1CB9] hover:bg-[#02AB32] p-3 rounded-3xl font-semibold">
              Sign Up
            </button>
            <Link href="/login" className="text-[#0A1CB9] text-center font-semibold">
              Already have an account?
            </Link>
          </div>
        )}
      </form>
      <Toaster />
    </div>
  );
};

