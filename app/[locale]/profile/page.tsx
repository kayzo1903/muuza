// app/manage-account/page.jsx
import { Suspense } from "react";
import ProfileLoading from "@/components/profile/profileloading";
import ProfileMenu from "@/components/profile/profile-menu";


// Mock data fetch function - replace with your actual data fetching
async function getUserData() {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: "user-123",
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "/avatars/user.jpg",
    phone: "+1 (555) 123-4567",
    stats: {
      orders: 24,
      wishlist: 12,
      addresses: 3
    },
    store: {
      id: "store-123",
      name: "John's Restaurant",
      pendingOrders: 3,
      rating: 4.8,
      totalSales: 124,
      isActive: true
    }
  };
}

// This would be your server component
export default async function ManageAccountPage() {
  // Fetch data on the server
  const userData = await getUserData();

  return (
    <main>
      <Suspense fallback={<ProfileLoading />}>
        <ProfileMenu userData={userData} />
      </Suspense>
    </main>
  );
}