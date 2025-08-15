import Header from "./Header";
import { getSession } from "@/actions/getsession";

const HeaderWrapper = async () => {

   const session = await getSession()
  
  return <Header session={session} />;
};

export default HeaderWrapper;
