
import User from "../../models/user";
import connection from "../../lib/mongodb";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connection();

  const { email, otp } = await req.json();

  console.log(email);
  console.log(otp);

  if (!otp) {
    return NextResponse.json({ error: "Please provide email and otp" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" });
    }

    user.otp = null;
    await user.save();

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Error verifying OTP" });
  }
}