"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import { AlertCircle } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

// Schema validation
const formSchema = z.object({
  businessName: z.string().min(2, "Jina la biashara linahitajika"),
  businessType: z.string().min(1, "Chagua aina ya biashara"),
  address: z.string().min(2, "Andika anuani kamili"),
  countryCode: z.string().min(1, "Chagua code ya nchi"),
  phone: z
    .string()
    .min(10, "Namba kamili ya simu inahitajika")
    .regex(
      /^\+\d{1,4}\s?\d{6,14}$/,
      "Andika namba sahihi (mf. +255 712345678)"
    ),
});

const countryCodes = [
  { label: "🇹🇿 +255 (TZ)", value: "+255" },
  { label: "🇰🇪 +254 (KE)", value: "+254" },
  { label: "🇺🇬 +256 (UG)", value: "+256" },
];

const businessTypes = [
  { label: "Restaurant/Mgahawa", value: "restaurant" },
  { label: "Chips", value: "chips/streetfood" },
  { label: "Street-food/Mama-Ntilie", value: "mamantilie/streetfood" },
  { label: "Shop", value: "shop/duka" },
  { label: "Fruit/Matunda", value: "fruit/matunda" },
  { label: "Juice/Juisi", value: "juice/juisi" },
];

export default function BusinessRegistrationForm() {
  const t = useTranslations("bussinesform");
  const [agreed, setAgreed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessType: "",
      address: "",
      countryCode: "+255",
      phone: "",
    },
  });

  const handleCountryCodeChange = (code: string) => {
    form.setValue("countryCode", code);
    const phoneWithoutCode = form
      .getValues("phone")
      .replace(/^\+\d{1,4}\s*/, "");
    const newPhone = `${code} ${phoneWithoutCode}`;
    form.setValue("phone", newPhone);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!agreed) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    console.log("Business Info:", values);
    // TODO: Submit to backend
  };

  return (
    <div className="max-w-xl mx-auto lg:mt-20 p-4">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>

      {showAlert && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {t("mustAgree")}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Business Name */}
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("title")}</FormLabel>
                <FormControl>
                  <Input placeholder="Mf. Muuza Chips" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Business Type */}
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("businessType")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("businessType")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("address")}</FormLabel>
                <FormControl>
                  <Input placeholder="Mf. Kariakoo, Dar es Salaam" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone with Country Code */}
          <div className="space-y-2">
            <FormLabel>{t("phoneLabel")}</FormLabel>
            <div className="flex items-center gap-1">
              <FormField
                control={form.control}
                name="countryCode"
                render={() => (
                  <FormItem className="col-span-1">
                    <Select
                      onValueChange={handleCountryCodeChange}
                      defaultValue={form.getValues("countryCode")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countryCodes.map((code) => (
                          <SelectItem key={code.value} value={code.value}>
                            {code.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="+255 712345678"
                        onChange={(e) => {
                          const input = e.target.value;
                          const code = form.getValues("countryCode");

                          const digitsOnly = input.replace(/[^\d]/g, "");
                          const numberPart = digitsOnly
                            .replace(code.replace("+", ""), "")
                            .slice(0, 9); // max 9 digits
                          const fullNumber = `${code} ${numberPart}`;
                          field.onChange(fullNumber);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Agreement */}
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="accent-primary"
            />
            <label htmlFor="agree">
              {t("agreement")}{" "}
              <Link href="/terms-of-service" className="underline">
                {t("terms")}
              </Link>{" "}
              &{" "}
              <Link href="/privacy-policy" className="underline">
                {t("privacy")}
              </Link>
            </label>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full h-12 text-lg">
            {t("submit")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
