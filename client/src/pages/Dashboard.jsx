import { useMemo, useState } from "react";
import { Shell } from "../components/Shell.jsx";
import { Button, Pill, cx } from "../components/ui.jsx";
import ScopePicker from "../components/ScopePicker.jsx";
import SavedFlashcardsDialog from "../components/SavedFlashcardsDialog.jsx";
import SavedFlashcardCard from "../components/SavedFlashcardCard.jsx";
import { CARDS, INITIAL_SAVED, SUBJECTS } from "../data.js";

const SCOPES = ["All subjects", ...SUBJECTS];
const TILT = [1.2, -0.8, 0.5]; // sticky-note tilt in CSS degrees

export default function Dashboard() {
    const [scope, setScope] = useState("All subjects");
    const [cards, setCards] = useState(CARDS);
    const deck = useMemo(
        () => (scope === "All subjects" ? cards : cards.filter((c) => c.subject === scope)),
        [cards, scope]
    );
    const [idx, setIdx] = useState(0);
    const [shown, setShown] = useState(false);
    const [count, setCount] = useState(3); // the design shows "card 3"; start at 1 in production
    const [saved, setSaved] = useState(INITIAL_SAVED);
    const [savedOpen, setSavedOpen] = useState(false);

    const card = deck[idx % deck.length];
    const isSaved = saved.some((c) => c.id === card.id);

    const pickScope = (s) => {
        setScope(s);
        setIdx(0);
        setShown(false);
    };
    const next = () => {
        setShown(false);
        setCount((c) => c + 1);
        setIdx((i) => {
            if (deck.length < 2) return 0;
            let n;
            do {
                n = Math.floor(Math.random() * deck.length);
            } while (n === i % deck.length);
            return n;
        });
    };
    const toggleSave = () =>
        setSaved((s) => (isSaved ? s.filter((c) => c.id !== card.id) : [...s, card]));
    const editSavedCard = (updatedCard) => {
        setSaved((items) => items.map((item) => (item.id === updatedCard.id ? updatedCard : item)));
        setCards((items) => items.map((item) => (item.id === updatedCard.id ? updatedCard : item)));
    };
    const removeSavedCard = (removedCard) => {
        setSaved((items) => items.filter((item) => item.id !== removedCard.id));
    };

    return (
        <Shell margin="dash">
            <main className="flex flex-col gap-4 pb-[88px] pl-7 pr-5 pt-5 md:gap-8 md:pb-10 md:pl-[72px] md:pr-14 md:pt-11 lg:px-[120px] lg:pt-12">
                <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-end md:justify-between">
                    <div className="md:shrink-0">
                        <p className="whitespace-nowrap font-hand text-2xl text-accent md:text-[26px]">
                            today’s practice
                        </p>
                        <h1 className="whitespace-nowrap font-display text-[32px] md:text-[40px] lg:text-[42px]">
                            Ready to flash?
                        </h1>
                    </div>
                    <ScopePicker scopes={SCOPES} value={scope} onChange={pickScope} />
                </div>

                <section
                    aria-label="Flashcard"
                    className="ruled-card flex min-h-[230px] flex-col items-center justify-between gap-3 rounded-[6px] border border-edge bg-card px-5 pb-5 pt-3.5 shadow-paper md:min-h-[280px] md:px-6 md:pb-7 md:pt-4 lg:min-h-[300px]"
                >
                    <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[52px] -z-[1] h-0.5 bg-marg md:top-[56px]"
                    />
                    <div className="flex w-full items-center justify-between">
                        <Pill>{card.subject}</Pill>
                        <span className="font-hand text-xl text-mut md:text-[22px]">
                            card {count} this session
                        </span>
                    </div>
                    <p
                        className="w-[300px] max-w-full text-center font-display text-[22px] leading-[30px] md:w-[540px] md:text-[30px] md:leading-10 lg:w-[660px] lg:text-[34px] lg:leading-[44px]"
                        aria-live="polite"
                    >
                        {shown ? card.a : card.q}
                    </p>
                    <p className="font-hand text-xl text-mut">
                        {shown ? "answer" : `from “${card.source}”`}
                    </p>
                </section>

                <div className="flex gap-2.5 md:justify-center md:gap-3">
                    <Button
                        variant="primary"
                        className="flex-1 md:flex-none"
                        onClick={() => setShown((v) => !v)}
                    >
                        {shown ? "Hide answer" : "Show answer"}
                    </Button>
                    <Button onClick={next}>Next card</Button>
                    <Button
                        icon="bm"
                        aria-label={isSaved ? "Remove from saved" : "Save card"}
                        aria-pressed={isSaved}
                        onClick={toggleSave}
                        className={cx(
                            "w-11 px-0 md:w-auto md:px-[16.5px]",
                            isSaved && "!bg-hl !text-hltext"
                        )}
                    >
                        <span className="hidden md:inline">{isSaved ? "Saved" : "Save"}</span>
                    </Button>
                </div>

                <section aria-labelledby="saved-h" className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 id="saved-h" className="font-display text-[22px] md:text-[26px]">
                            Saved flashcards
                        </h2>
                        <button
                            type="button"
                            onClick={() => setSavedOpen(true)}
                            className="text-sm text-accent underline"
                        >
                            View all
                        </button>
                    </div>
                    <div className="no-scrollbar flex gap-4 overflow-x-auto pt-2.5 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible">
                        {saved.map((c, i) => (
                            <SavedFlashcardCard
                                key={c.id}
                                card={c}
                                tone={(i % 3) + 1}
                                rotate={TILT[i % 3]}
                                className="w-[190px] shrink-0 md:w-auto"
                                onEdit={editSavedCard}
                                onRemove={removeSavedCard}
                            />
                        ))}
                    </div>
                </section>
            </main>
            <SavedFlashcardsDialog
                cards={saved}
                open={savedOpen}
                onOpenChange={setSavedOpen}
                onEdit={editSavedCard}
                onRemove={removeSavedCard}
            />
        </Shell>
    );
}
