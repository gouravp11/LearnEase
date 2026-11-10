import { Link, useNavigate } from "react-router-dom";
import { Shell } from "../components/Shell.jsx";
import { GoogleIcon } from "../components/Icon.jsx";
import { Button, DecorCard, DecorNote, Field, Holes } from "../components/ui.jsx";

const COPY = {
    login: {
        sub: "pick up where you left off",
        title: "Welcome back",
        cta: "Log in",
        foot: "New here?",
        link: "Create an account",
        to: "/signup"
    },
    signup: {
        sub: "new here? let’s set you up",
        title: "Start your notebook",
        cta: "Create account",
        foot: "Already have an account?",
        link: "Log in",
        to: "/login"
    }
};

export default function Auth({ mode }) {
    const c = COPY[mode];
    const nav = useNavigate();
    const submit = (e) => {
        e.preventDefault();
        /* TODO: call your auth API */ nav("/");
    };
    const google = () => {
        /* TODO: start Google OAuth */
    };

    return (
        <Shell auth margin="auth">
            <div className="relative flex flex-col items-center pl-7 pr-5 pt-6 md:gap-14 md:px-0 md:pb-10 md:pt-14 lg:min-h-[calc(100vh-72px)] lg:justify-center lg:py-0">
                <form
                    onSubmit={submit}
                    className="relative flex w-full flex-col gap-5 rounded-[6px] border border-edge bg-card px-6 py-7 shadow-paper md:w-[480px] md:gap-[22px] md:py-10 md:pl-[72px] md:pr-12 lg:w-[500px]"
                >
                    <Holes gap={44} className="-left-[9px] hidden md:flex" />
                    <div>
                        <p className="font-hand text-2xl text-accent md:text-[26px]">{c.sub}</p>
                        <h1 className="font-display text-[34px] md:text-[38px]">{c.title}</h1>
                    </div>
                    <Button size="lg" onClick={google} className="w-full text-[15px]">
                        <GoogleIcon />
                        Continue with Google
                    </Button>
                    <div className="flex items-center gap-3.5" aria-hidden="true">
                        <span className="h-[1.5px] flex-1 bg-edge" />
                        <span className="font-hand text-[22px] text-mut">or</span>
                        <span className="h-[1.5px] flex-1 bg-edge" />
                    </div>
                    {mode === "signup" && (
                        <Field
                            label="name"
                            name="name"
                            autoComplete="name"
                            placeholder="Your name"
                            required
                        />
                    )}
                    <Field
                        label="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                    />
                    <Field
                        label="password"
                        name="password"
                        type="password"
                        placeholder={mode === "login" ? "••••••••" : "At least 8 characters"}
                        autoComplete={mode === "login" ? "current-password" : "new-password"}
                        minLength={mode === "signup" ? 8 : undefined}
                        required
                        extra={
                            mode === "login" ? (
                                <button type="button" className="text-[13px] text-accent underline">
                                    Forgot password?
                                </button>
                            ) : null
                        }
                    />
                    <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        className="w-full text-[15px]"
                    >
                        {c.cta}
                    </Button>
                    <p className="flex justify-center gap-1 text-sm text-mut">
                        {c.foot}
                        <Link to={c.to} className="font-medium text-accent underline">
                            {c.link}
                        </Link>
                    </p>
                </form>

                {/* Tablet: decoration sits below the sheet. Desktop: pinned to the page sides. Mobile: hidden. */}
                <div className="hidden items-center gap-12 md:flex lg:hidden">
                    <DecorNote />
                    <DecorCard className="relative" />
                </div>
                <DecorNote className="absolute left-[150px] top-[138px] hidden lg:block" />
                <DecorCard className="absolute right-[130px] top-[358px] hidden lg:flex" />
            </div>
        </Shell>
    );
}
