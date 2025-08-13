import ShopHeader from "./Shopheader";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const ShopHeaderWrapper = async () => {
    const session = await auth.api.getSession({
      headers: await headers()
    });
  return <ShopHeader  session={session} />;
};

export default ShopHeaderWrapper;
