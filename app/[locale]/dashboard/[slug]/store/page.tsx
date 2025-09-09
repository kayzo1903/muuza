import MyStorePage from "@/components/Dashboard/storepage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "store",
  };

export default function StorePage(){
    return (
       <main>
           <MyStorePage />
       </main>
    )
}