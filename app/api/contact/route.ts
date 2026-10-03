import { sendEmail } from "../../../lib/email";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return Response.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  try {
    await sendEmail({
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      replyTo: email,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Couldn't send your message. Please try again or email me directly." },
      { status: 500 }
    );
  }
}