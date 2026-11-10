import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "./Icon.jsx";
import { Button, Field, Sticky } from "./ui.jsx";

export default function SavedFlashcardCard({
    card,
    tone,
    rotate,
    className = "",
    onEdit,
    onRemove
}) {
    const menuRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [question, setQuestion] = useState(card.q);
    const [answer, setAnswer] = useState(card.a);

    useEffect(() => {
        setQuestion(card.q);
        setAnswer(card.a);
    }, [card]);

    useEffect(() => {
        if (!menuOpen) return undefined;
        const closeMenu = (event) => {
            if (event.type === "keydown" && event.key !== "Escape") return;
            if (event.type === "pointerdown" && menuRef.current?.contains(event.target)) return;
            setMenuOpen(false);
        };
        document.addEventListener("pointerdown", closeMenu);
        document.addEventListener("keydown", closeMenu);
        return () => {
            document.removeEventListener("pointerdown", closeMenu);
            document.removeEventListener("keydown", closeMenu);
        };
    }, [menuOpen]);

    const save = (event) => {
        event.preventDefault();
        onEdit({ ...card, q: question.trim(), a: answer.trim() });
        setDialogOpen(false);
    };

    return (
        <div className={`relative ${className}`}>
            <Sticky
                tone={tone}
                label={card.subject}
                q={card.q}
                a={card.a}
                rotate={rotate}
                className="min-h-[170px]"
            />
            <div ref={menuRef} className="absolute right-1 top-1 z-10">
                <button
                    type="button"
                    aria-label={`Actions for ${card.subject} flashcard`}
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-mut hover:bg-tag"
                >
                    <Icon name="dots" size={20} />
                </button>
                {menuOpen && (
                    <div
                        role="menu"
                        className="absolute right-0 top-full z-20 mt-1 min-w-32 rounded-md border border-edge bg-card p-1 shadow-paper"
                    >
                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                                setQuestion(card.q);
                                setAnswer(card.a);
                                setMenuOpen(false);
                                setDialogOpen(true);
                            }}
                            className="w-full rounded px-3 py-2 text-left text-sm hover:bg-tag"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                                setMenuOpen(false);
                                onRemove(card);
                            }}
                            className="w-full rounded px-3 py-2 text-left text-sm text-mut hover:bg-tag"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-[60] bg-overlay" />
                    <Dialog.Content
                        aria-describedby={undefined}
                        className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[90dvh] flex-col gap-5 overflow-y-auto rounded-t-3xl border border-edge bg-card pb-7 pl-6 pr-6 pt-3.5 shadow-paper md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[85vh] md:w-[520px] md:-translate-x-1/2 md:-translate-y-1/2 md:gap-[22px] md:overflow-visible md:rounded-md md:py-9 md:pl-16 md:pr-10"
                    >
                        <span
                            aria-hidden="true"
                            className="mx-auto h-1 w-10 shrink-0 rounded-sm bg-edge md:hidden"
                        />
                        <Dialog.Title className="font-display text-[26px] md:text-[28px]">
                            Edit saved flashcard
                        </Dialog.Title>
                        <form onSubmit={save} className="flex flex-col gap-5">
                            <Field
                                label="question"
                                as="textarea"
                                rows={3}
                                value={question}
                                onChange={(event) => setQuestion(event.target.value)}
                                required
                            />
                            <Field
                                label="answer"
                                as="textarea"
                                rows={4}
                                value={answer}
                                onChange={(event) => setAnswer(event.target.value)}
                                required
                            />
                            <div className="flex gap-3 md:justify-end">
                                <Button
                                    type="button"
                                    onClick={() => setDialogOpen(false)}
                                    className="flex-1 md:flex-none"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={!question.trim() || !answer.trim()}
                                    className="flex-1 md:flex-none"
                                >
                                    Save changes
                                </Button>
                            </div>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}
