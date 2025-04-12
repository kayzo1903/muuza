"use client"

import React, { useEffect, useState } from "react"
import { Moon, Sun, Laptop2 } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils" // Optional utility for classNames if you use one

const modes = ["light", "dark", "system"] as const
type ThemeMode = typeof modes[number]

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [currentMode, setCurrentMode] = useState<ThemeMode>("system")

  useEffect(() => {
    setCurrentMode(theme as ThemeMode)
  }, [theme])

  const handleToggle = () => {
    const currentIndex = modes.indexOf(currentMode)
    const nextMode = modes[(currentIndex + 1) % modes.length]
    setTheme(nextMode)
    setCurrentMode(nextMode)
  }

  const icon = () => {
    switch (currentMode) {
      case "light":
        return <Sun className="text-yellow-500 transition-all" />
      case "dark":
        return <Moon className="text-gray-900 dark:text-white transition-all" />
      case "system":
        return <Laptop2 className="text-blue-500 transition-all" />
    }
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "w-10 h-10 flex items-center justify-center rounded-full",
        "bg-neutral-100 dark:bg-neutral-900",
        "border border-neutral-300 dark:border-neutral-700",
        "hover:scale-105 hover:shadow-md transition-all duration-200"
      )}
      aria-label="Toggle theme"
    >
      {icon()}
    </button>
  )
}
