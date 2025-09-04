import BusinessForm from "@/components/store-register/Bussiness_form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "register business",
};


export default function BussinessPage() {
  return (
    <main>
        <BusinessForm />
    </main>
  );
}
