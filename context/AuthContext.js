'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // ✅ correct import for App Router

// Create the context
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => useContext(AuthContext);

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const pathname = usePathname(); // ✅ App Router's way to track route changes

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await fetch("/api/getToken", {
          method: "GET", // usually token checks are GET, not POST
          credentials: "include", // ✅ correct way to include cookies in fetch
        });

        const data = await res.json(); // ✅ parse JSON manually with fetch

        
        if (data.token && data.token !== "undefined") {
          console.log("Authenticated:", data.token);
          setAuthUser(data.token);
        } else {
          console.log("No token found. User not authenticated.");
          setAuthUser(null);
        }
      } catch (err) {
        console.error("Error validating token:", err);
        setAuthUser(null);
      }
    };

    validateToken();
  }, [pathname]); // ✅ re-run on route change

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
