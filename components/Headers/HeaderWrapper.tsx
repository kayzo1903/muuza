import Header from "./Header";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const HeaderWrapper = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return <Header session={session} />;
};

export default HeaderWrapper;
