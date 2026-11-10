/** Colors resolve to CSS variables (see src/index.css), so light/dark is a single data-theme switch. */
const v = (n) => `var(--${n})`;
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                bg: v("bg"),
                rule: v("rule"),
                marg: v("marg"),
                ink: v("ink"),
                mut: v("mut"),
                card: v("card"),
                cardline: v("cardline"),
                edge: v("border"),
                tag: v("tag"),
                tagtext: v("tagtext"),
                hl: v("hl"),
                hltext: v("hltext"),
                primary: v("primary"),
                onprimary: v("onprimary"),
                accent: v("accent"),
                note1: v("note1"),
                note2: v("note2"),
                note3: v("note3"),
                notetext: v("notetext"),
                overlay: v("overlay")
            },
            fontFamily: {
                display: ["Fraunces", "Georgia", "serif"],
                hand: ["Caveat", "cursive"],
                sans: ["Inter", "system-ui", "sans-serif"]
            },
            // Figma text uses auto line-height, so sizes carry `normal` instead of Tailwind's fixed leading.
            fontSize: Object.fromEntries(
                Object.entries({
                    xs: 12,
                    sm: 14,
                    base: 16,
                    lg: 18,
                    xl: 20,
                    "2xl": 24,
                    "3xl": 30,
                    "4xl": 36
                }).map(([k, n]) => [k, [`${n}px`, { lineHeight: "normal" }]])
            ),
            boxShadow: { paper: "0 10px 24px rgba(61,51,20,0.14)" }
        }
    },
    plugins: []
};
