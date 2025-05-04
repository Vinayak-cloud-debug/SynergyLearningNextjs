
import { NextResponse } from "next/server";

import  connection  from "../../lib/mongodb";
import User from "../../models/user";
import { NextRequest } from "next/server";
const nodemailer = require("nodemailer");
const validator = require("validator");

export async function POST(req: NextRequest) {

    await connection(); // Ensure the database connection is established

    const { email } = await req.json();
    

    try {
      // Validate email format
      if (!email || !validator.isEmail(email)) {
        
        
        return NextResponse.json({ error: 'Invalid email format.' });
      }
  
      // Check if the user exists
      const user = await User.findOne({ username: email });
      if (!user) {
        return NextResponse.json({ error: 'User not found.' });
      }
  
  
      // Generate a 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // e.g., 123456
      user.resetPasswordOtp = otp;
      user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
      await user.save();
  
      // Send OTP via email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.username,
        subject: 'Your Password Reset OTP',
        html: `<p>Your OTP for password reset is <strong>${otp}</strong>. This OTP will expire in 15 minutes.</p>`,
      });


      return NextResponse.json({ message: 'OTP sent to your email.',output:1 });
    } catch (error) {
      
      console.error('Error in forgot-password controller:', error);
      return NextResponse.json({ error: 'Internal Server Error',output:0 });
    }
}