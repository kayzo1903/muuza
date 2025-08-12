import Header from "./Header";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const HeaderWrapper = async () => {
 const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})

  return <Header />;
};

export default HeaderWrapper;
