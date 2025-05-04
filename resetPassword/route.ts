import { NextResponse } from "next/server";
import User from "../../models/user";
const bcrypt = require('bcrypt');
import connection from "../../lib/mongodb";



export async function POST(req: Request) {

    await connection(); // Ensure the database connection is established


    const { email,password } = await req.json(); // Extract email and password from the request

    try {
      // Validate input
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and Password is required.' });
      }
  
      // Find the user by email
      const user = await User.findOne({ username: email });
      if (!user) {
        return NextResponse.json({ error: 'User not found.' });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Clear reset-related fields (if any)
      user.resetPasswordOtp = undefined;
      user.resetPasswordExpiry = undefined;

      // Save the updated user
      await user.save();
  
        return NextResponse.json({ message: 'Password successfully reset.' });
    } catch (error) {
      console.error('Error in reset-password route:', error);
      return NextResponse.json({ error: 'Internal Server Error' });
    }

}

