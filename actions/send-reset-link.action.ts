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
  buttonContainer: `
    margin: 30px auto;
    text-align: center;
  `,
  button: `
    display: inline-block;
    padding: 14px 28px;
    background: #00BF63;
    color: #fff !important;
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  `,
  note: `
    font-size:14px;
    color:#6b7280;
    margin-top:10px;
    text-align:center;
    font-style:italic;
  `,
  footer: `
    font-size:12px;
    color:#6b7280;
    margin-top:30px;
    text-align:center;
  `,
};

export async function sendResetLink({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string; // ✅ secure link
    expiresIn?: string; // Optional: show expiration
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
        <div style="${styles.buttonContainer}">
          <a href="${meta.link}" style="${styles.button}" target="_blank" rel="noopener noreferrer">
            Verify Now
          </a>
        </div>
        ${
          meta.expiresIn
            ? `<p style="${styles.note}">This link will expire in ${meta.expiresIn}</p>`
            : ""
        }
        <p style="${styles.note}">If you didn’t request this, please ignore this email.</p>
        <p style="${styles.footer}">
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
