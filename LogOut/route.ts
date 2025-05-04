
import { NextResponse } from "next/server";
import  { cookies } from "next/headers";

export async function POST(req: Request) {

    const cookie = await cookies();

    try {

    cookie.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
        expires: new Date(0), // Set an explicit expiration date (past date)
      });



      // Removed redundant req.clearCookie as cookies are already cleared using cookie.set
  
  
      return NextResponse.json({ message: "Logged out successfully" , status: 200});
    } catch (error) {
      console.log("Error in logout controller", error);
      NextResponse.json({ error: "Internal Server Error" });
    }
}