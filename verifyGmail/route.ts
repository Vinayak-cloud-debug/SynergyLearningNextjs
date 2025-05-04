const nodemailer =  require('nodemailer');
const validator =  require('validator');
import User from '../../models/user';
import connection from '../../lib/mongodb';


export async function POST(req: Request) {

    await connection();
    
    const { GmailValue } = await req.json();

  try {
    // Validate email format
    if (!GmailValue || !validator.isEmail(GmailValue)) {
      
      
      return new Response(JSON.stringify({ error: 'Invalid email format.' }), { status: 400 });
    }

    // Check if the user exists
    const user = await User.findOne({ username: GmailValue });
    if (user) {
        
      return new Response(JSON.stringify({ error: 'User exits signup thru different Email.' }), { status: 400 });
    }



    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // e.g., 123456

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
      to: GmailValue,
      subject: 'Your Password Reset OTP',
      html: `<p>Your OTP for password reset is <strong>${otp}</strong>. This OTP will expire in 15 minutes.</p>`,
    });

    
  
    return new Response(JSON.stringify({ message: 'OTP sent to your email.', otp: otp }), { status: 200 });
  } catch (error) {
    
    console.error('Error in Verify-Gmail controller:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', output: 0 }), { status: 500 });
  }
}