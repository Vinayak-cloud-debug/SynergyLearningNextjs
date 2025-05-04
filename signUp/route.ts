import { NextResponse } from "next/server";
import User from "../../models/user";
import connection from "../../lib/mongodb";
import { cookies } from "next/headers";
const bcrypt =  require("bcrypt");
const jwt = require("jsonwebtoken");

export async function POST(req: Request) {
    await connection();


    try {
        const { fullName, username, password, confirmPassword, gender } = await req.json();
    
        
        if (password !== confirmPassword) {
          return NextResponse.json({ error: "Passwords don't match" });
        }
    
        const user = await User.findOne({ username });
    
        if (user) {
          return NextResponse.json({ error: "Username already exists" });
        }
    
        // HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // https://avatar-placeholder.iran.liara.run/
    
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    
        const newUser = new User({
          fullName,
          username,
          password: hashedPassword,
          gender,
          profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });
    
        if (newUser) {
          // Generate JWT token here
          await newUser.save();

          const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
          });
          
          
              const cookieStore = await cookies();
              cookieStore.set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "development",
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: "/",
              });
          

            
    
    
          return NextResponse.json({
            token:token
          });
    
        
        } else {
            return NextResponse.json({ error: "Invalid user data" });
        }
      } catch (error) {
        console.log("Error in signup controller", error);
        return NextResponse.json({ error: "Internal Server Error" });
      }
}