export interface HeaderProps {
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    user: {
      id: string;
      email: string;
      emailVerified: boolean;
      name: string;
      role: "buyer" | "seller"; // Added role from your schema
      phoneNumber?: string | null;
      address?: string | null;
      provider?: string | null;
      createdAt: Date;
      updatedAt: Date;
      image?: string | null;
    };
  } | null;
}