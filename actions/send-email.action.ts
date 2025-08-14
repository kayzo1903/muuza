"use server";

import transporter from "@/lib/nodemailer";

const styles = {
  container: `
    max-width:600px;
    margin:30px auto;
    padding:30px;
    border-radius:16px;
    background:#f9fafb;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color:#1a1a1a;
    box-shadow:0 4px 12px rgba(0,0,0,0.08);
  `,
  heading: `
    font-size:24px;
    font-weight:700;
    margin-bottom:20px;
    text-align:center;
    color:#00BF63;
  `,
  paragraph: `
    font-size:16px;
    line-height:1.6;
    color:#333;
    margin-bottom:20px;
    text-align:center;
  `,
  button: `
    display:inline-block;
    margin:0 auto;
    padding:12px 24px;
    background:#00BF63;
    color:#fff;
    font-size:16px;
    font-weight:600;
    border-radius:30px;
    text-decoration:none;
    text-align:center;
  `,
  footer: `
    font-size:12px;
    color:#6b7280;
    margin-top:30px;
    text-align:center;
  `,
};

export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}) {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject: `Muuza - ${subject}`,
    html: `
      <div style="${styles.container}">
        <h1 style="${styles.heading}">${subject}</h1>
        <p style="${styles.paragraph}">${meta.description}</p>
        <div style="text-align:center;">
          <a href="${meta.link}" style="${styles.button}">Continue</a>
        </div>
        <p style="${styles.footer}">
          If you didn’t request this, please ignore this email.<br/>
          © ${new Date().getFullYear()} Muuza. All rights reserved.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (err) {
    console.error("[SendEmail]:", err);
    return { success: false };
  }
}
