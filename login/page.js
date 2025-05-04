"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useAuthContext } from "../context/AuthContext"; // adjust path
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { setAuthUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await fetch("/api/loginAuth", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setAuthUser(data.token);

        toast.success("Logged In Successfully!");
        router.push("/");
      } else {
        toast.error(data?.error || "Invalid username or password");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } 
  };



  return (
    // <div className="flex flex-col z-50   items-center  justify-center  px-4">


    //   <div className=" lg:w-full max-w-md bg-[#030109] text-white flex flex-col gap-7 justify-center items-center rounded-2xl shadow-lg p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
    //     <div className="flex flex-col gap-2 justify-center items-center">
    //       <Image src='/SynergyNewIcon.png' height={117} width={117} alt="Synergy Logo" />
    //       <h2 className="text-2xl w-[250px] lg:w-[300px] font-bold text-center mb-6">
    //         Welcome back to <span className="text-[#023dff] text-3xl">Synergy Learning</span>
    //       </h2>
    //       <h2 className="text-lg w-[400px] font-semibold text-center mb-6">
    //         Keep Learning and growing with Synergy
    //       </h2>
    //     </div>

    //     <form onSubmit={handleSubmit} className="flex flex-col gap-10 items-center justify-center">
    //       {/* Username */}
    //       <div className="flex flex-col gap-5">
    //         <div className="flex items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-[#0B02FF]">
    //           <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
    //             {/* Mail Icon */}
    //             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
    //               <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
    //             </svg>
    //           </div>
    //           <input
    //             type="text"
    //             placeholder="Enter your Gmail"
    //             className="flex-1 p-3 bg-[#030109] text-white outline-none  rounded-r-3xl"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //           />
    //         </div>
    //       </div>

    //       {/* Password */}
    //       <div className="flex flex-col gap-5">
    //         <div className="flex items-center w-80 border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-[#0B02FF]">
    //           <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
    //             {/* Key Icon */}
    //             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
    //               <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
    //               <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
    //             </svg>
    //           </div>
    //           <input
    //             type="password"
    //             placeholder="Enter your Password"
    //             className="flex-1 p-3 bg-[#030109] text-white outline-none  rounded-r-3xl"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //         </div>
    //       </div>

    //       {/* Forgot + Signup */}
    //       <div className="self-start text-base">
    //         <Link href="/forgotPassword" className="text-[#023dff] cursor-pointer font-bold">
    //           Forgot Password?
    //         </Link>
    //       </div>

    //       <button className="w-full cursor-pointer bg-[#0B02FF] hover:bg-[#02AB32] transition-all p-3 rounded-3xl font-semibold text-white flex items-center justify-center">
    //         Login
    //       </button>

    //       <Link href="/signup" className="text-white">
    //         Don't have an account? <span className="text-[#023dff] font-bold">Sign Up</span>
    //       </Link>
    //     </form>

    //     <Toaster />
    //   </div>
    // </div>

    <div className="flex flex-col z-50 items-center justify-center px-4 min-h-screen">
  <div className="w-full max-w-md md:max-w-lg lg:max-w-lg bg-[#030109] text-white flex flex-col gap-7 justify-center items-center rounded-2xl shadow-lg p-6 md:p-8 backdrop-filter backdrop-blur-md bg-opacity-70 border border-gray-700">
    
    {/* Header */}
    <div className="flex flex-col gap-2 justify-center items-center text-center">
      <Image src="/SynergyNewIcon.png" height={100} width={100} alt="Synergy Logo" />
      
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
        Welcome back to <span className="text-[#023dff]">Synergy Learning</span>
      </h2>
      
      <p className="text-sm sm:text-base md:text-lg font-medium max-w-xs sm:max-w-md">
        Keep Learning and Growing with Synergy
      </p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center w-full px-2">
      
      {/* Email */}
      <div className=" w-full lg:w-[400px]">
        <div className="flex items-center w-full lg:w-[400px] border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-[#0B02FF]">
          <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
            {/* Mail Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Enter your Gmail"
            className="flex-1 p-3 bg-[#030109] text-white outline-none rounded-r-3xl text-sm sm:text-base"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      {/* Password */}
      <div className="w-full lg:w-[400px]">
        <div className="flex items-center w-full lg:w-[400px] border border-gray-600 rounded-3xl bg-[#0F0C0C] focus-within:ring-2 focus-within:ring-[#0B02FF]">
          <div className="bg-[#030109] px-4 py-3 rounded-l-3xl border-r border-gray-600 flex items-center">
            {/* Key Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
              <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
              <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
          </div>
          <input
            type="password"
            placeholder="Enter your Password"
            className="flex-1 p-3 bg-[#030109] text-white outline-none rounded-r-3xl text-sm sm:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Forgot Password Link */}
      <div className="w-full text-sm sm:text-base self-start">
        <Link href="/forgotPassword" className="text-[#023dff] cursor-pointer font-bold">
          Forgot Password?
        </Link>
      </div>

      {/* Login Button */}
      <button className="w-full bg-[#0B02FF] hover:bg-[#02AB32] transition-all p-3 rounded-3xl font-semibold text-white text-sm sm:text-base">
        Login
      </button>

      {/* Signup Link */}
      <div className="text-sm sm:text-base text-white text-center">
        Don't have an account?{' '}
        <Link href="/signup" className="text-[#023dff] font-bold">
          Sign Up
        </Link>
      </div>
    </form>

    <Toaster />
  </div>
</div>

  );
};
