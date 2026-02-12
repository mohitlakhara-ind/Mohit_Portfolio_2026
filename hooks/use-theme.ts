"use client"

import { useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

export function useTheme() {
    const [theme, setTheme] = useState<Theme>("system")

    useEffect(() => {
        // Load saved theme on mount
        const savedTheme = localStorage.getItem("theme") as Theme
        if (savedTheme) {
            setTheme(savedTheme)
        }
    }, [])

    useEffect(() => {
        const root = window.document.documentElement

        // Remove existing classes
        root.classList.remove("light", "dark")

        // Manage Persistence
        if (theme === "system") {
            localStorage.removeItem("theme")
        } else {
            localStorage.setItem("theme", theme)
        }

        // Apply visual theme
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    return { theme, setTheme }
}
