import { sendEmail } from "../../../lib/email";

const labels: Record<string, string> = {
  name: "Name", business: "Business name", email: "Email", phone: "Phone",
  purpose: "What the flyer is for", promoting: "Promoting", mustInclude: "Must appear on flyer",
  offer: "Special offer", style: "Preferred style", colors: "Preferred colors",
  hasLogo: "Has a logo", inspiration: "Inspiration", size: "Flyer size",
  format: "Digital / print", deadline: "Deadline", notes: "Additional notes",
};

export async function POST(req: Request) {
  const data = await req.formData();
  const fields: Record<string, string[]> = {};
  const attachments: { filename: string; content: string }[] = [];

  for (const [key, value] of data.entries()) {
    if (typeof value === "string") {
      if (value.trim()) (fields[key] ||= []).push(value.trim());
    } else if (value.size) {
      attachments.push({
        filename: value.name,
        content: Buffer.from(await value.arrayBuffer()).toString("base64"),
      });
    }
  }

  if (!fields.name || !fields.email) {
    return Response.json({ error: "Name and email are required." }, { status: 400 });
  }

  const text =
    Object.entries(labels)
      .filter(([key]) => fields[key])
      .map(([key, label]) => `${label}: ${fields[key].join(", ")}`)
      .join("\n\n") +
    (attachments.length ? `\n\nAttached files: ${attachments.map((a) => a.filename).join(", ")}` : "");

  try {
    await sendEmail({
      subject: `Flyer request from ${fields.name[0]}${fields.business ? ` (${fields.business[0]})` : ""}`,
      text,
      replyTo: fields.email[0],
      attachments,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Couldn't send your request. Please try again or email me directly." },
      { status: 500 }
    );
  }
}