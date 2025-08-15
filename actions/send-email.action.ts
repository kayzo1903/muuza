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
  otpContainer: `
    margin: 30px auto;
    text-align: center;
  `,
  otp: `
    display: inline-block;
    padding: 12px 24px;
    background: #f0f0f0;
    color: #1a1a1a;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 4px;
    border-radius: 8px;
    border: 1px dashed #00BF63;
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

export async function sendEmailAction({
  to,
  subject,
  meta,
}: {
  to: string;
  subject: string;
  meta: {
    description: string;
    otp: string;
    expiresIn?: string; // Optional: can show when the OTP expires
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
        <div style="${styles.otpContainer}">
          <div style="${styles.otp}">${meta.otp}</div>
          ${meta.expiresIn ? `<p style="${styles.note}">This OTP will expire in ${meta.expiresIn}</p>` : ''}
        </div>
        <p style="${styles.note}">Please do not share this code with anyone.</p>
        <p style="${styles.footer}">
          If you didn't request this, please ignore this email.<br/>
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