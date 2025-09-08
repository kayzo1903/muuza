// app/manage-account/page.jsx
import { Suspense } from "react";
import ProfileLoading from "@/components/profile/profileloading";
import ProfileMenu from "@/components/profile/profile-menu";
import { getServerUserData } from "@/lib/data/user-data";


export default async function ManageAccountPage() {
  // Fetch real data on the server
  const userData = await getServerUserData();

  return (
    <main>
      <Suspense fallback={<ProfileLoading />}>
        <ProfileMenu userData={userData} />
      </Suspense>
    </main>
  );
}