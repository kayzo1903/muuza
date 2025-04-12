import React from "react";
import { Button } from "../ui/button";
import { Link } from "@/i18n/routing";

function NoauthLinks() {
  return (
    <section className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-2 px-2">
        <Button asChild className="bg-gray-950 text-white h-16 text-xl dark:bg-gray-50 dark:text-gray-950">
          <Link href="/login">Sign Up</Link>
        </Button>
        <Button asChild className="h-16 text-xl">
          <Link href="/login">Login</Link>
        </Button>
      </div>
       <div className="px-2">
         <Link href={"/bussiness/register"}>
           create a bussiness Account
         </Link>
      </div>
    </section>
  );
}

export default NoauthLinks;
