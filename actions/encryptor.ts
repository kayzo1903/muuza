import crypto from "crypto";

const SECRET_KEY = process.env.OTP_SECRET_KEY as string;
const IV = crypto.randomBytes(16); // initialization vector

export async function myCustomEncryptor(otp: string): Promise<string> {
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), IV);
  let encrypted = cipher.update(otp, "utf8", "hex");
  encrypted += cipher.final("hex");
  return IV.toString("hex") + ":" + encrypted; // store IV + encrypted text
}

export async function myCustomDecryptor(encryptedOtp: string): Promise<string> {
  const [ivHex, encrypted] = encryptedOtp.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(SECRET_KEY), iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
