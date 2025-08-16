import { getSession } from "@/actions/getsession";
import ShopHeader from "./Shopheader";

const ShopHeaderWrapper = async () => {
  const session = await getSession();

  return <ShopHeader session={session} />;
};

export default ShopHeaderWrapper;
