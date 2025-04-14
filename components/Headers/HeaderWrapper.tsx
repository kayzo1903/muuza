// app/components/HeaderWrapper.tsx
import { auth } from "@/auth"; // your Auth.js config
import Header from "./Header";

const HeaderWrapper = async () => {
  const session = await auth(); // This runs server-side
  return <Header session={session} />;
};

export default HeaderWrapper;
