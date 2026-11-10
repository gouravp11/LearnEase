import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "./Icon.jsx";
import { Button, Field } from "./ui.jsx";

export default function SubjectActions({ subject, onEdit, onDelete }) {
    const menuRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dialog, setDialog] = useState(null);
    const [title, setTitle] = useState(subject.name);
    const [description, setDescription] = useState(subject.desc || "");

    useEffect(() => {
        setTitle(subject.name);
        setDescription(subject.desc || "");
    }, [subject]);

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
        const trimmedTitle = title.trim();
        if (!trimmedTitle || trimmedTitle === "All content") return;
        onEdit(subject.name, { title: trimmedTitle, description: description.trim() });
        setDialog(null);
    };

    return (
        <>
            <div ref={menuRef} className="relative z-10 shrink-0">
                <button
                    type="button"
                    aria-label={`Actions for ${subject.name}`}
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-mut hover:bg-bg md:h-9 md:w-9"
                >
                    <Icon name="dots" size={18} />
                </button>
                {menuOpen && (
                    <div
                        role="menu"
                        className="absolute left-0 top-full z-20 mt-1 min-w-36 rounded-md border border-edge bg-card p-1 shadow-paper"
                    >
                        <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                                setMenuOpen(false);
                                setDialog("edit");
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
                                setDialog("delete");
                            }}
                            className="w-full rounded px-3 py-2 text-left text-sm text-mut hover:bg-tag"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <Dialog.Root
                open={!!dialog}
                onOpenChange={(open) => {
                    if (!open) setDialog(null);
                }}
            >
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-40 bg-overlay" />
                    <Dialog.Content
                        aria-describedby={undefined}
                        className="fixed inset-x-0 bottom-0 z-50 flex max-h-[90dvh] flex-col gap-5 overflow-y-auto rounded-t-3xl border border-edge bg-card pb-7 pl-6 pr-6 pt-3.5 shadow-paper md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[85vh] md:w-[520px] md:-translate-x-1/2 md:-translate-y-1/2 md:gap-[22px] md:overflow-visible md:rounded-md md:py-9 md:pl-16 md:pr-10"
                    >
                        <span
                            aria-hidden="true"
                            className="mx-auto h-1 w-10 shrink-0 rounded-sm bg-edge md:hidden"
                        />
                        {dialog === "edit" ? (
                            <>
                                <Dialog.Title className="font-display text-[26px] md:text-[28px]">
                                    Edit subject
                                </Dialog.Title>
                                <form onSubmit={save} className="flex flex-col gap-5">
                                    <Field
                                        label="title"
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                        required
                                    />
                                    <Field
                                        label="description (optional)"
                                        as="textarea"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <div className="flex gap-3 md:justify-end">
                                        <Button
                                            type="button"
                                            onClick={() => setDialog(null)}
                                            className="flex-1 md:flex-none"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            disabled={
                                                !title.trim() || title.trim() === "All content"
                                            }
                                            className="flex-1 md:flex-none"
                                        >
                                            Save changes
                                        </Button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <Dialog.Title className="font-display text-[26px] md:text-[28px]">
                                    Delete {subject.name}?
                                </Dialog.Title>
                                <Dialog.Description className="text-sm text-mut">
                                    Deleting a subject would delete all it's content.
                                </Dialog.Description>
                                <div className="flex gap-3 md:justify-end">
                                    <Button
                                        onClick={() => setDialog(null)}
                                        className="flex-1 md:flex-none"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            onDelete(subject.name);
                                            setDialog(null);
                                        }}
                                        className="flex-1 !border-danger !text-danger md:flex-none"
                                    >
                                        Delete subject
                                    </Button>
                                </div>
                            </>
                        )}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
}
