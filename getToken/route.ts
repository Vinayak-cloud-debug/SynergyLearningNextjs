// app/api/getToken/route.ts
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import User from '../../models/user';  // Adjust your path as needed
import connection from "../../lib/mongodb"; // Your DB connection file

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
  

    await connection();

    // Extract the token from cookies
    const token = request.cookies.get("token")?.value; // Use `request.cookies.get()` in App Router
    console.log(token)

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - No Token Provided" },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid Token" },
        { status: 401 }
      );
    }

    // Find user based on decoded ID (if any)
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Send user data in the response
    return NextResponse.json({ message: "Valid User", token: token });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in /api/getToken:", error.message);
    } else {
      console.error("Error in /api/getToken:", error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
