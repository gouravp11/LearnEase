import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./Icon.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export const cx = (...a) => a.filter(Boolean).join(" ");

export function Pill({ children }) {
    return (
        <span className="inline-block rounded-[6px] bg-tag px-2.5 py-[5px] text-xs font-medium text-tagtext">
            {children}
        </span>
    );
}

/** Scope chip. Active = highlighter stroke (tilted 1deg), inactive = dashed outline. */
export function Chip({ on, children, ...p }) {
    return (
        <button
            type="button"
            aria-pressed={on}
            className={cx(
                "inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-lg border-[1.5px] px-[14.5px] text-sm font-medium",
                on
                    ? "-rotate-1 border-transparent bg-hl text-hltext"
                    : "border-dashed border-edge text-mut"
            )}
            {...p}
        >
            {children}
        </button>
    );
}

/** Buttons: 1.5px ink outline, 10px radius. Heights: sm 40, md 44, lg 48. */
export function Button({
    variant = "outline",
    size = "md",
    icon,
    iconSize = 18,
    className = "",
    children,
    ...p
}) {
    const h = size === "lg" ? "h-12" : size === "sm" ? "h-10" : "h-11";
    const v =
        variant === "primary"
            ? "border-transparent bg-primary text-onprimary"
            : variant === "ghost"
              ? "border-transparent text-mut"
              : "border-ink text-ink";
    return (
        <button
            type="button"
            className={cx(
                "inline-flex items-center justify-center gap-2 rounded-[10px] border-[1.5px] px-[16.5px] text-sm font-medium",
                h,
                v,
                className
            )}
            {...p}
        >
            {icon && <Icon name={icon} size={iconSize} />}
            {children}
        </button>
    );
}

/** Sun / moon pill. The active cell is highlighted. Click switches the theme. */
export function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const cell = (n, on) => (
        <span
            className={cx(
                "flex h-[26px] w-[30px] items-center justify-center rounded-full",
                on ? "bg-hl text-hltext" : "text-mut"
            )}
        >
            <Icon name={n} size={16} />
        </span>
    );
    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="flex shrink-0 items-center gap-0.5 rounded-full border-[1.5px] border-ink p-[1.5px]"
        >
            {cell("sun", theme === "light")}
            {cell("moon", theme === "dark")}
        </button>
    );
}

/**
 * Spiral-binding holes. Absolutely positioned inside the nearest positioned ancestor and trimmed so
 * every hole fits inside it (same rule as the Figma file). Pass left/visibility via className.
 */
export function Holes({ gap = 44, top = 36, className = "" }) {
    const ref = useRef(null);
    const [n, setN] = useState(0);
    useEffect(() => {
        const el = ref.current;
        const measure = () => {
            const p = el && el.offsetParent;
            if (!p) return;
            setN(Math.max(1, Math.floor((p.clientHeight - 28 - top - 18) / (18 + gap)) + 1));
        };
        measure();
        window.addEventListener("resize", measure);
        const ro =
            typeof ResizeObserver !== "undefined" && el.offsetParent
                ? new ResizeObserver(measure)
                : null;
        if (ro) ro.observe(el.offsetParent);
        return () => {
            window.removeEventListener("resize", measure);
            ro && ro.disconnect();
        };
    }, [gap, top]);
    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={cx("absolute flex-col", className)}
            style={{ top, gap }}
        >
            {Array.from({ length: n }, (_, i) => (
                <span key={i} className="h-[18px] w-[18px] rounded-full border border-edge bg-bg" />
            ))}
        </div>
    );
}

/** Handwritten label + underlined input (ruled-paper style). */
export function Field({ label, extra, as = "input", children, className = "", ...p }) {
    const id = useId();
    const base = "w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-mut";
    return (
        <div className={className}>
            <div className="flex items-end justify-between">
                <label htmlFor={id} className="font-hand text-[22px] text-mut">
                    {label}
                </label>
                {extra}
            </div>
            <div className="flex min-h-11 items-center border-b-[1.5px] border-ink focus-within:border-accent">
                {as === "select" ? (
                    <select
                        id={id}
                        className={cx(base, "h-11 cursor-pointer appearance-none")}
                        {...p}
                    >
                        {children}
                    </select>
                ) : as === "textarea" ? (
                    <textarea id={id} rows={3} className={cx(base, "resize-none py-2.5")} {...p} />
                ) : (
                    <input id={id} className={base} {...p} />
                )}
            </div>
        </div>
    );
}

/** Sticky note. `rotate` is in CSS degrees. */
export function Sticky({ tone = 1, label, q, a, rotate = 0, className = "" }) {
    const bg = { 1: "bg-note1", 2: "bg-note2", 3: "bg-note3" }[tone];
    return (
        <div
            className={cx(
                "relative flex flex-col gap-2.5 rounded-[3px] pb-6 pl-6 pr-6 pt-7 text-notetext shadow-paper",
                bg,
                className
            )}
            style={{ transform: `rotate(${rotate}deg)` }}
        >
            <span
                aria-hidden="true"
                className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 bg-tag opacity-[.85]"
            />
            <span className="font-hand text-xl">{label}</span>
            <p className="font-display text-lg">{q}</p>
            <p className="text-sm">{a}</p>
        </div>
    );
}

/** Auth-page decoration (sticky tagline + sample index card). */
export function DecorNote({ className = "" }) {
    return (
        <div
            className={cx(
                "w-[230px] rotate-[3deg] rounded-[3px] bg-note1 pb-[22px] pl-[22px] pr-[22px] pt-[26px] shadow-paper",
                className
            )}
        >
            <p className="font-hand text-[30px] leading-9 text-notetext">
                Paste a link.
                <br />
                Flash a card.
                <br />
                Remember more.
            </p>
        </div>
    );
}
export function DecorCard({ className = "" }) {
    return (
        <div
            className={cx(
                "isolate flex w-[260px] -rotate-[2.5deg] flex-col gap-[22px] overflow-hidden rounded-[6px] border border-edge bg-card pb-[22px] pl-[22px] pr-[22px] pt-5 shadow-paper",
                className
            )}
        >
            <span
                aria-hidden="true"
                className="absolute inset-x-0 top-[42px] -z-[1] h-0.5 bg-marg"
            />
            <span className="font-hand text-xl text-mut">DBMS</span>
            <span className="font-display text-xl">What is a node?</span>
        </div>
    );
}
