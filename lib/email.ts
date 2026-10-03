type Attachment = { filename: string; content: string }; // content = base64

export async function sendEmail(opts: {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
}) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) throw new Error("Email is not configured (RESEND_API_KEY / CONTACT_TO_EMAIL).");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "Portfolio <onboarding@resend.dev>",
      to: [to],
      subject: opts.subject.replace(/[\r\n]+/g, " "),
      text: opts.text,
      reply_to: opts.replyTo,
      attachments: opts.attachments?.length ? opts.attachments : undefined,
    }),
  });
  if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
}