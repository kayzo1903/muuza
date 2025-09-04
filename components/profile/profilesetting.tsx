"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Camera } from "lucide-react";
import { authClient, Session } from "@/lib/auth-client";

/* ---------------------------
   ZOD SCHEMAS
--------------------------- */

// Profile Schema
const profileSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Full name can only contain letters and spaces"),

  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number (e.g., +255712345678)")
    .optional(),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .max(100, "Address must not exceed 100 characters"),
});

// Password Schema
const passwordSchem = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const passwordSchema = z
  .object({
    current: passwordSchem,
    new: passwordSchem,
    confirm: passwordSchem,
  })
  .refine((data) => data.new === data.confirm, {
    path: ["confirm"],
    message: "New password and confirmation do not match",
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

type AccountSettingProps = {
  session: Session;
};

/* ---------------------------
   COMPONENT
--------------------------- */
export default function AccountSetting({ session }: AccountSettingProps) {
  const router = useRouter();
  const [profilePic, setProfilePic] = useState(session.user.image || "/default-avatar.png");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  /* ---------------------------
     FORMS
  --------------------------- */
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: session.user.name || "",
      phone: session.user.phone_number || "",
      address: session.user.address || "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current: "",
      new: "",
      confirm: "",
    },
  });

  /* ---------------------------
     PROFILE HANDLERS
  --------------------------- */
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfilePic(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      toast.success("Profile picture updated", {
        description: "Your profile picture has been changed successfully.",
      });

      // TODO: Send to backend for storage
    }
  };

  const onProfileSubmit = async (data: ProfileFormValues) => {
    try {
      // TODO: Call backend API
      console.log(data);
      
      toast.success("Profile updated", {
        description: "Your profile information has been saved successfully.",
      });
    } catch {
      toast.error("Update failed", {
        description: "There was an issue saving your profile. Try again.",
      });
    }
  };

  /* ---------------------------
     PASSWORD HANDLERS
  --------------------------- */
  const handlePasswordUpdate = async (data: PasswordFormValues) => {
    try {
      // TODO: Securely send password update to backend
      console.log(data);
      
      toast.success("Password updated", {
        description: "Your password has been changed successfully.",
      });

      setShowPasswordFields(false);
      passwordForm.reset();
    } catch {
      toast.error("Password update failed", {
        description: "Could not update password. Please try again later.",
      });
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/auth/sign-in");
  };

  /* ---------------------------
     RENDER
  --------------------------- */
  return (
    <div className="p-6 space-y-10 pt-24 lg:pt-8 max-w-5xl mx-auto">
      {/* Header */}
      <header className="text-center lg:text-left">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Account Settings
        </h1>
        <p className="text-md text-gray-600 dark:text-gray-400 mt-2">
          Manage your account information and security settings
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Picture */}
        <Card className="lg:col-span-1 shadow-md">
          <CardContent className="pt-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 group">
              <Image
                src={profilePic}
                alt="Profile"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full border-4 border-yellow-200 object-cover shadow-sm transition-transform duration-200 group-hover:scale-105"
              />
              <label
                htmlFor="profile-pic-upload"
                className="absolute bottom-0 right-0 bg-yellow-500 p-2 rounded-full cursor-pointer hover:bg-yellow-600 transition-colors shadow-lg"
              >
                <Camera className="w-4 h-4 text-white" />
                <input
                  id="profile-pic-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </label>
            </div>
            <h2 className="text-lg font-semibold">{session.user.name}</h2>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information and contact details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  {...profileForm.register("fullName")}
                  placeholder="Your full name"
                  className="mt-1"
                />
                {profileForm.formState.errors.fullName && (
                  <p className="text-sm text-red-500 mt-1">
                    {profileForm.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...profileForm.register("phone")} placeholder="+255712345678" />
                {profileForm.formState.errors.phone && (
                  <p className="text-sm text-red-500 mt-1">
                    {profileForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Input id="address" {...profileForm.register("address")} placeholder="Street, City, Region" />
                {profileForm.formState.errors.address && (
                  <p className="text-sm text-red-500 mt-1">
                    {profileForm.formState.errors.address.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white transition-colors duration-200"
                disabled={profileForm.formState.isSubmitting}
              >
                {profileForm.formState.isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Password Management */}
      {session.user.provider === "credentials" && (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your password and account security</CardDescription>
          </CardHeader>
          <CardContent>
            {!showPasswordFields ? (
              <Button
                variant="outline"
                onClick={() => setShowPasswordFields(true)}
              >
                Change Password
              </Button>
            ) : (
              <form
                onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)}
                className="space-y-4 max-w-md"
              >
                {["current", "new", "confirm"].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>
                      {field === "current"
                        ? "Current Password"
                        : field === "new"
                        ? "New Password"
                        : "Confirm New Password"}
                    </Label>
                    <div className="relative">
                      <Input
                        id={field}
                        {...passwordForm.register(field as keyof PasswordFormValues)}
                        type={showPassword[field as keyof typeof showPassword] ? "text" : "password"}
                        placeholder={
                          field === "current"
                            ? "Enter current password"
                            : field === "new"
                            ? "Enter new password"
                            : "Confirm new password"
                        }
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => togglePasswordVisibility(field as keyof typeof showPassword)}
                      >
                        {showPassword[field as keyof typeof showPassword] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {passwordForm.formState.errors[field as keyof PasswordFormValues] && (
                      <p className="text-sm text-red-500">
                        {passwordForm.formState.errors[field as keyof PasswordFormValues]?.message}
                      </p>
                    )}
                  </div>
                ))}

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={passwordForm.formState.isSubmitting}
                  >
                    {passwordForm.formState.isSubmitting ? "Updating..." : "Update Password"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowPasswordFields(false);
                      passwordForm.reset();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Logout */}
      <div className="flex justify-center lg:justify-end">
        <Button
          variant="destructive"
          className="w-full sm:w-auto"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
