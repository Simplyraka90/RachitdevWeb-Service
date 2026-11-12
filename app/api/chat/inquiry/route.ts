
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const projectTypes = [
  "Custom Website",
  "React / Next.js App",
  "UI/UX Design",
  "E-Commerce Website",
  "Portfolio Website",
  "Business Website",
  "Other",
];

type InquiryData = {
  name: string;
  email: string;
  projectType: string;
  message: string;
};

export async function POST(request: NextRequest) {
  try {
    // 1. Read environment variables
    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.INQUIRY_TO_EMAIL;

    const senderEmail =
      process.env.EMAIL_FROM ||
      "Rachit Dev Web Service <onboarding@resend.dev>";

    // 2. Check configuration
    if (!apiKey || !recipientEmail) {
      console.error("Missing Resend email configuration");

      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured.",
        },
        { status: 503 }
      );
    }

    // 3. Read form details
    let body: Partial<InquiryData>;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request data.",
        },
        { status: 400 }
      );
    }

    const name =
      typeof body?.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body?.email === "string"
        ? body.email.trim()
        : "";

    const projectType =
      typeof body?.projectType === "string"
        ? body.projectType.trim()
        : "";

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";

    // 4. Validate input
    if (
      name.length < 2 ||
      name.length > 100 ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !projectTypes.includes(projectType) ||
      message.length < 10 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter valid project details.",
        },
        { status: 400 }
      );
    }

    // 5. Initialize Resend
    const resend = new Resend(apiKey);

    // 6. Send inquiry to your Gmail
    const { data, error } = await resend.emails.send({
      from: senderEmail,

      to: [recipientEmail],

      // Reply directly to the client
      replyTo: email,

      subject: `New Project Inquiry - ${projectType}`,

      text: [
        "NEW PROJECT INQUIRY",
        "Rachit Dev Web Service",
        "",
        `Client Name: ${name}`,
        `Client Email: ${email}`,
        `Project Type: ${projectType}`,
        "",
        "PROJECT DETAILS:",
        message,
        "",
        "You can reply directly to this email",
        "to contact the client.",
      ].join("\n"),
    });

    // 7. Handle Resend errors
    if (error) {
      console.error("Resend API Error:", {
        name: error.name,
        message: error.message,
      });

      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to send your inquiry right now. Please try again later.",
        },
        { status: 502 }
      );
    }

    // 8. Return success
    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your inquiry has been received. We will contact you soon.",
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Inquiry Server Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
