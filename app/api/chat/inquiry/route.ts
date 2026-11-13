
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
    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.INQUIRY_TO_EMAIL;

    const senderEmail =
      process.env.EMAIL_FROM ||
      "Rachix Studio <onboarding@resend.dev>";

    if (!apiKey || !recipientEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured.",
        },
        { status: 503 }
      );
    }

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

    // Validate form details
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

    const resend = new Resend(apiKey);

    // STEP 1: Send inquiry to admin
    const { data: adminData, error: adminError } =
      await resend.emails.send({
        from: senderEmail,
        to: [recipientEmail],
        replyTo: email,
        subject: `New Project Inquiry - ${projectType}`,
        text: [
          "NEW PROJECT INQUIRY",
          "Rachix Studio",
          "",
          `Client Name: ${name}`,
          `Client Email: ${email}`,
          `Project Type: ${projectType}`,
          "",
          "PROJECT DETAILS:",
          message,
          "",
          "Reply directly to this email to contact the client.",
        ].join("\n"),
      });

    if (adminError) {
      console.error("Admin Email Error:", adminError);

      return NextResponse.json(
        {
          success: false,
          error: "Unable to send your inquiry. Please try again.",
        },
        { status: 502 }
      );
    }

    // STEP 2: Send automatic confirmation to client
    const confirmationText = [
      `Hi ${name},`,
      "",
      "Thank you for contacting Rachix Studio!",
      "",
      "We have successfully received your project requirements.",
      "Our team will review your details and get back to you as soon as possible.",
      "",
      `Project Type: ${projectType}`,
      "",
      "We appreciate your interest in our services.",
      "",
      "Best regards,",
      "Rachix Studio Team",
      "",
      "This is an automated confirmation email.",
    ].join("\n");

    const { data: clientData, error: clientError } =
      await resend.emails.send({
        from: senderEmail,
        to: [email],
        replyTo: recipientEmail,
        subject: "We've Received Your Project Request | Rachix Studio",
        text: confirmationText,
      });

    if (clientError) {
      console.error("Client Confirmation Error:", clientError);

      // Admin already received the inquiry.
      // Do not ask the user to submit it again.
      return NextResponse.json(
        {
          success: true,
          confirmationSent: false,
          message:
            "Your inquiry has been received. We will contact you soon.",
          id: adminData?.id,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        confirmationSent: true,
        message:
          "Thank you! Your inquiry has been received. A confirmation email has been sent to your email address.",
        id: adminData?.id,
        confirmationId: clientData?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Inquiry Server Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
