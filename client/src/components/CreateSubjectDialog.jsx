import { useId, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "./Icon.jsx";
import { Button, Holes, cx } from "./ui.jsx";
import { useSubjects } from "../context/SubjectsContext.jsx";

export const TITLE_MIN = 2;
export const TITLE_MAX = 40;
export const DESC_MAX = 120;

/** Pure validation so the rules live in one place (reuse the same limits on the server). */
export function validateSubject(title, desc, existing = []) {
    const t = title.trim();
    const errors = {};
    if (title.length > TITLE_MAX) errors.title = `${title.length - TITLE_MAX} characters too long`;
    else if (title.length > 0 && t.length < TITLE_MIN)
        errors.title = `Needs at least ${TITLE_MIN} characters`;
    else if (t && existing.some((e) => e.toLowerCase() === t.toLowerCase()))
        errors.title = "You already have a subject with this name";
    if (desc.length > DESC_MAX) errors.desc = `${desc.length - DESC_MAX} characters too long`;
    return { errors, valid: t.length >= TITLE_MIN && !errors.title && !errors.desc };
}

function CountedField({ label, value, onChange, max, error, hint, multiline, ...p }) {
    const id = useId();
    const msg = `${id}-msg`;
    const len = value.length;
    const Tag = multiline ? "textarea" : "input";
    return (
        <div>
            <label htmlFor={id} className="font-hand text-[22px] text-mut">
                {label}
            </label>
            <div
                className={cx(
                    "flex items-center border-b-[1.5px] focus-within:border-accent",
                    error ? "!border-danger" : "border-ink",
                    multiline ? "min-h-[60px]" : "min-h-11"
                )}
            >
                <Tag
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={msg}
                    rows={multiline ? 2 : undefined}
                    className={cx(
                        "w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-mut",
                        multiline && "resize-none py-2.5"
                    )}
                    {...p}
                />
            </div>
            <div className="mt-1.5 flex items-start justify-between gap-3 text-[13px]">
                <span
                    id={msg}
                    role={error ? "alert" : undefined}
                    className={error ? "text-danger" : "text-mut"}
                >
                    {error || hint}
                </span>
                <span
                    aria-live="polite"
                    className={cx(
                        "shrink-0 tabular-nums",
                        len > max
                            ? "font-medium text-danger"
                            : len >= max * 0.9
                              ? "font-medium text-ink"
                              : "text-mut"
                    )}
                >
                    {len}/{max}
                </span>
            </div>
        </div>
    );
}

/** Create-subject modal (bottom sheet on phones). Validates length live; Create stays disabled until valid. */
export default function CreateSubjectDialog() {
    const { subjects, addSubject, createOpen, setCreateOpen } = useSubjects();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const { errors, valid } = validateSubject(
        title,
        desc,
        subjects.map((subject) => subject.name)
    );

    const change = (o) => {
        if (!o) {
            setTitle("");
            setDesc("");
        }
        setCreateOpen(o);
    };
    const submit = (e) => {
        e.preventDefault();
        if (!valid) return;
        addSubject({ title: title.trim(), description: desc.trim() });
        change(false);
    };

    return (
        <Dialog.Root open={createOpen} onOpenChange={change}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-overlay" />
                <Dialog.Content
                    aria-describedby={undefined}
                    className="fixed inset-x-0 bottom-0 z-50 flex max-h-[100dvh] flex-col gap-5 overflow-y-auto rounded-t-3xl border border-edge bg-card pb-7 pl-6 pr-6 pt-3.5 shadow-paper md:inset-auto md:left-1/2 md:top-1/2 md:w-[520px] md:-translate-x-1/2 md:-translate-y-1/2 md:gap-[22px] md:overflow-visible md:rounded-md md:py-9 md:pl-16 md:pr-10 lg:w-[540px]"
                >
                    <Holes gap={44} className="-left-[9px] hidden md:flex" />
                    <span
                        aria-hidden="true"
                        className="mx-auto h-1 w-10 rounded-sm bg-edge md:hidden"
                    />
                    <div className="flex items-center justify-between">
                        <Dialog.Title className="font-display text-[28px] md:text-[30px]">
                            New subject
                        </Dialog.Title>
                        <Dialog.Close aria-label="Close" className="text-mut">
                            <Icon name="x" size={20} />
                        </Dialog.Close>
                    </div>
                    <form
                        onSubmit={submit}
                        noValidate
                        className="flex flex-col gap-5 md:gap-[22px]"
                    >
                        <CountedField
                            label="title"
                            value={title}
                            onChange={setTitle}
                            max={TITLE_MAX}
                            error={errors.title}
                            hint={`${TITLE_MIN}–${TITLE_MAX} characters`}
                            placeholder="e.g. Operating Systems"
                            autoFocus
                            autoComplete="off"
                        />
                        <CountedField
                            label="description (optional)"
                            value={desc}
                            onChange={setDesc}
                            max={DESC_MAX}
                            error={errors.desc}
                            hint="Shown under the subject name"
                            placeholder="What is this subject about?"
                            multiline
                        />
                        <div className="flex gap-3 md:justify-end">
                            <Dialog.Close asChild>
                                <Button className="flex-1 md:flex-none">Cancel</Button>
                            </Dialog.Close>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={!valid}
                                className="flex-1 md:flex-none"
                            >
                                Create subject
                            </Button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
