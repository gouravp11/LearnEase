import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

/** Follows the system theme by default, remembers the user's choice, and sets data-theme on <html>. */
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try {
            localStorage.setItem("learnease-theme", theme);
        } catch {}
    }, [theme]);
    const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
    const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
