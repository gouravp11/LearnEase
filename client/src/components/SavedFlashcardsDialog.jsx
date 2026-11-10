import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "./Icon.jsx";
import { Holes } from "./ui.jsx";
import SavedFlashcardCard from "./SavedFlashcardCard.jsx";

const TILT = [1.2, -0.8, 0.5];

export default function SavedFlashcardsDialog({ cards, open, onOpenChange, onEdit, onRemove }) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-overlay" />
                <Dialog.Content
                    aria-describedby={undefined}
                    className="fixed inset-x-0 bottom-0 z-50 flex max-h-[90dvh] flex-col gap-5 rounded-t-3xl border border-edge bg-card pb-7 pl-6 pr-6 pt-3.5 shadow-paper md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[85vh] md:w-[720px] md:-translate-x-1/2 md:-translate-y-1/2 md:gap-[22px] md:rounded-md md:py-9 md:pl-16 md:pr-10"
                >
                    <Holes gap={44} className="-left-[9px] hidden md:flex" />
                    <span
                        aria-hidden="true"
                        className="mx-auto h-1 w-10 shrink-0 rounded-sm bg-edge md:hidden"
                    />

                    <div className="flex shrink-0 items-start justify-between gap-4">
                        <div>
                            <Dialog.Title className="font-display text-[26px] md:text-[28px]">
                                Saved flashcards
                            </Dialog.Title>
                            <p className="mt-1 text-[13px] text-mut">
                                {cards.length} {cards.length === 1 ? "card" : "cards"}
                            </p>
                        </div>
                        <Dialog.Close aria-label="Close" className="mt-1 text-mut">
                            <Icon name="x" size={20} />
                        </Dialog.Close>
                    </div>

                    {cards.length > 0 ? (
                        <div className="min-h-0 flex-1 overflow-y-auto py-2.5 pr-2">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {cards.map((card, i) => (
                                    <SavedFlashcardCard
                                        card={card}
                                        key={card.id}
                                        tone={(i % 3) + 1}
                                        rotate={TILT[i % 3]}
                                        onEdit={onEdit}
                                        onRemove={onRemove}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="py-8 text-center font-hand text-[22px] text-mut">
                            No saved flashcards yet.
                        </p>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
