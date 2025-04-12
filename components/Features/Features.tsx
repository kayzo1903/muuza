import React from "react"
import { CheckCircle, Quote } from "lucide-react"
import { useTranslations } from "next-intl"

export default function WhyMuuza() {
  const t = useTranslations("WhyMuuza")

  const features = [
    {
      title: t("features.authenticTitle"),
      description: t("features.authenticDescription"),
    },
    {
      title: t("features.supportTitle"),
      description: t("features.supportDescription"),
    },
    {
      title: t("features.paymentsTitle"),
      description: t("features.paymentsDescription"),
    },
    {
      title: t("features.deliveryTitle"),
      description: t("features.deliveryDescription"),
    },
  ]

  const testimonials = [
    {
      name: t("testimonials.0.name"),
      quote: t("testimonials.0.quote"),
    },
    {
      name: t("testimonials.1.name"),
      quote: t("testimonials.1.quote"),
    },
    {
      name: t("testimonials.2.name"),
      quote: t("testimonials.2.quote"),
    },
  ]

  return (
    <section className="w-full bg-white dark:bg-zinc-900 text-gray-800 dark:text-white py-8">
      {/* Content */}
      <div className="max-w-4xl mx-auto py-16 px-4 grid gap-10">
        <p className="text-xl md:text-3xl text-center">
          {t("intro")}
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start space-x-4">
              <CheckCircle className="text-green-500 mt-1" size={24} />
              <div>
                <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                <p className="text-md text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          {t("communityTitle")}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((tItem, i) => (
            <div
              key={i}
              className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-xl shadow-sm"
            >
              <Quote className="text-green-500 mb-4" size={20} />
              <p className="text-sm italic mb-4 text-gray-700 dark:text-gray-300">
                &quot;{tItem.quote}&quot;
              </p>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                – {tItem.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
