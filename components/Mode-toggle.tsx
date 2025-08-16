"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-14 h-7 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center transition-colors duration-300"
      aria-label="Toggle theme"
    >
      {/* Knob */}
      <span
        className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center shadow-md transform transition-transform duration-300 ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-white" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-yellow-500" />
        )}
      </span>
    </button>
  )
}
