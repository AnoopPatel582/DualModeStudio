import { Resend } from "resend";
import validator from "validator";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    // Validate email
    if (!validator.isEmail(email)) {
      return Response.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!firstName || !message) {
      return Response.json(
        { error: "First Name and Message fields are required" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "DualMode Contact <onboarding@resend.dev>",
      to: ["business@dualmodestudio.com"],
      subject: "New Contact Form Submission",
      reply_to: email,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}