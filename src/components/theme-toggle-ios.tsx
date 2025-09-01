"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export const ThemeToggleIOS = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative w-14 h-8 rounded-full transition-all duration-300 ease-in-out",
        "bg-gradient-to-r from-blue-400 to-purple-500 dark:from-slate-600 dark:to-slate-800",
        "shadow-lg hover:shadow-xl",
        "focus:outline-none focus:ring-2 focus:ring-blue-400/50"
      )}
    >
      <div
        className={cn(
          "absolute top-1 w-6 h-6 rounded-full transition-all duration-300 ease-in-out",
          "bg-white shadow-md",
          "flex items-center justify-center",
          theme === "dark" ? "translate-x-6" : "translate-x-1"
        )}
      >
        <Sun
          className={cn(
            "h-3 w-3 transition-all duration-300 ease-in-out",
            "text-yellow-500",
            theme === "light" 
              ? "opacity-100 rotate-0 scale-100" 
              : "opacity-0 -rotate-90 scale-0"
          )}
        />
        
        <Moon
          className={cn(
            "absolute h-3 w-3 transition-all duration-300 ease-in-out",
            "text-slate-600",
            theme === "dark" 
              ? "opacity-100 rotate-0 scale-100" 
              : "opacity-0 rotate-90 scale-0"
          )}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Sun
          className={cn(
            "h-3 w-3 transition-all duration-300 ease-in-out",
            "text-white/60",
            theme === "light" ? "opacity-100" : "opacity-0"
          )}
        />
        <Moon
          className={cn(
            "h-3 w-3 transition-all duration-300 ease-in-out",
            "text-white/60",
            theme === "dark" ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-300 ease-in-out",
          "bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20",
          "blur-sm opacity-0 hover:opacity-100"
        )}
      />
    </button>
  )
} 