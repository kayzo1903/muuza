// app/components/HeaderWrapper.tsx
import { auth } from "@/auth"; // your Auth.js config
import ShopHeader from "./Shopheader";

const ShopHeaderWrapper = async () => {
  const session = await auth(); // This runs server-side
  return <ShopHeader session={session} />;
};

export default ShopHeaderWrapper;
