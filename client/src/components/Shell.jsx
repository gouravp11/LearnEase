import { Link, NavLink, useNavigate } from "react-router-dom";
import { Icon } from "./Icon.jsx";
import { Button, ThemeToggle, cx } from "./ui.jsx";
import { useAddContent } from "../context/AddContentContext.jsx";

const MARGIN = {
    dash: "left-[14px] md:left-[36px] lg:left-[84px]", // dashboard: red margin line at every size
    auth: "left-[14px] md:left-[36px] lg:hidden" // auth: margin line below desktop only (as in Figma)
};

function Header({ auth }) {
    const { open } = useAddContent();
    const nav = useNavigate();
    const signOut = () => nav("/login");
    const link = ({ isActive }) =>
        cx(
            "rounded px-1.5 py-2 text-[15px] font-medium",
            isActive ? "bg-hl text-hltext" : "text-mut"
        );
    return (
        <header className="h-[60px] border-b-2 border-ink bg-bg md:h-[72px]">
            <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-5 md:px-8">
                <div className="flex items-center md:gap-8">
                    <Link to="/" className="font-display text-2xl md:text-[26px]">
                        LearnEase
                    </Link>
                    {!auth && (
                        <nav aria-label="Main" className="hidden items-center gap-4 md:flex">
                            <NavLink to="/" end className={link}>
                                Home
                            </NavLink>
                            <NavLink to="/library" className={link}>
                                Library
                            </NavLink>
                        </nav>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    {!auth && (
                        <>
                            <Button
                                variant="primary"
                                icon="plus"
                                onClick={open}
                                className="hidden md:inline-flex"
                            >
                                Add content
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={signOut}
                                className="hidden md:inline-flex"
                            >
                                Sign out
                            </Button>
                            <button
                                type="button"
                                onClick={signOut}
                                className="text-sm text-mut md:hidden"
                            >
                                Sign out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

function TabBar() {
    const { open } = useAddContent();
    const item = ({ isActive }) =>
        cx(
            "flex w-20 flex-col items-center gap-1 text-xs",
            isActive ? "font-semibold text-ink" : "text-mut"
        );
    return (
        <nav
            aria-label="Main"
            className="fixed inset-x-0 bottom-0 z-30 flex h-[72px] items-center justify-around border-t-2 border-ink bg-bg md:hidden"
        >
            <NavLink to="/" end className={item}>
                <Icon name="home" size={24} />
                Home
            </NavLink>
            <button
                type="button"
                onClick={open}
                aria-label="Add content"
                className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-primary text-onprimary"
            >
                <Icon name="plus" size={24} />
            </button>
            <NavLink to="/library" className={item}>
                <Icon name="lib" size={24} />
                Library
            </NavLink>
        </nav>
    );
}

/** Page chrome: ruled paper, header, optional margin line, mobile tab bar. */
export function Shell({ margin, auth = false, children }) {
    return (
        <div className="paper min-h-screen">
            <Header auth={auth} />
            <div className="relative mx-auto min-h-[calc(100vh-60px)] max-w-[1280px] md:min-h-[calc(100vh-72px)]">
                {margin && (
                    <div
                        aria-hidden="true"
                        className={cx("absolute bottom-0 top-0 w-0.5 bg-marg", MARGIN[margin])}
                    />
                )}
                {children}
            </div>
            {!auth && <TabBar />}
        </div>
    );
}
