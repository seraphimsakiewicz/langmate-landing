import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "mail.smtp2go.com",
  port: 2525,
  auth: {
    user: process.env.SMTP2GO_USER,
    pass: process.env.SMTP2GO_PASS,
  },
});

export const handler = async ({ body }) => {
  const { data } = JSON.parse(body);
  const email = data.email;
  if (!email) return { statusCode: 400 };

  const msg = {
    from: "LangMate <noreply@langmate.io>",
    to: email,
    subject: "👋 You’re on the LangMate Waitlist!",
    text: "Thanks for joining our waitlist! We'll keep you updated.",
    html: `<p>Thanks for joining our waitlist! We'll keep you updated.</p>`,
  };

  await transporter.sendMail(msg);
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};

handler({ body: JSON.stringify({ data: { email: "seraphim.codes@gmail.com" } }) });
