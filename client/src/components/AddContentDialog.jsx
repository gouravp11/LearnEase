import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { Icon } from "./Icon.jsx";
import { Button, Field, Holes, Pill } from "./ui.jsx";
import { useAddContent } from "../context/AddContentContext.jsx";
import { useSubjects } from "../context/SubjectsContext.jsx";

const tabCls =
    "inline-flex h-10 items-center gap-2 rounded-md border-[1.5px] border-dashed border-edge px-[12.5px] text-sm font-medium text-mut data-[state=active]:border-transparent data-[state=active]:bg-hl data-[state=active]:text-hltext";
const SITES = ["Reddit", "Stack Overflow", "Medium", "Wikipedia"];

/** Desktop/tablet: centered notebook modal. Mobile: bottom sheet with a drag handle. */
export function AddContentDialog() {
    const { isOpen, setOpen } = useAddContent();
    const [mode, setMode] = useState("link");
    const { subjects, activeName, openCreate } = useSubjects();
    const navigate = useNavigate();
    const skipRestoreFocus = useRef(false);

    const empty = subjects.length === 0;
    const initial = subjects.some((s) => s.name === activeName) ? activeName : subjects[0]?.name;

    const submit = (e) => {
        e.preventDefault();
        /* TODO: POST link / text / images to your API */ setOpen(false);
    };
    const createSubject = () => {
        skipRestoreFocus.current = true; // keep focus in the create-subject modal that opens next
        setOpen(false);
        navigate("/library");
        openCreate();
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-overlay" />
                <Dialog.Content
                    aria-describedby={undefined}
                    onCloseAutoFocus={(e) => {
                        if (skipRestoreFocus.current) {
                            e.preventDefault();
                            skipRestoreFocus.current = false;
                        }
                    }}
                    className="fixed inset-x-0 bottom-0 z-50 flex max-h-[100dvh] flex-col gap-5 overflow-y-auto rounded-t-3xl border border-edge bg-card pb-7 pl-6 pr-6 pt-3.5 shadow-paper md:inset-auto md:left-1/2 md:top-1/2 md:w-[560px] md:-translate-x-1/2 md:-translate-y-1/2 md:gap-[22px] md:overflow-visible md:rounded-md md:py-9 md:pl-16 md:pr-10 lg:w-[580px]"
                >
                    <Holes gap={44} className="-left-[9px] hidden md:flex" />
                    <span
                        aria-hidden="true"
                        className="mx-auto h-1 w-10 rounded-sm bg-edge md:hidden"
                    />
                    <div className="flex items-center justify-between">
                        <Dialog.Title className="font-display text-[28px] md:text-[30px]">
                            Add content
                        </Dialog.Title>
                        <Dialog.Close aria-label="Close" className="text-mut">
                            <Icon name="x" size={20} />
                        </Dialog.Close>
                    </div>

                    {empty ? (
                        <div className="flex flex-col gap-5 md:gap-[22px]">
                            <div>
                                <p className="font-hand text-[22px] text-mut">no subjects yet</p>
                                <p className="text-[15px]">
                                    Content is saved inside a subject, so create one first. It only
                                    takes a name.
                                </p>
                            </div>
                            <div className="flex gap-3 md:justify-end">
                                <Dialog.Close asChild>
                                    <Button className="flex-1 md:flex-none">Cancel</Button>
                                </Dialog.Close>
                                <Button
                                    variant="primary"
                                    icon="plus"
                                    onClick={createSubject}
                                    className="flex-1 md:flex-none"
                                >
                                    Create a subject
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="flex flex-col gap-5 md:gap-[22px]">
                            <Field label="subject" as="select" defaultValue={initial}>
                                {subjects.map((s) => (
                                    <option key={s.name}>{s.name}</option>
                                ))}
                            </Field>
                            <Tabs.Root
                                value={mode}
                                onValueChange={setMode}
                                className="flex flex-col gap-5 md:gap-[22px]"
                            >
                                <Tabs.List
                                    className="flex gap-2 md:gap-2.5"
                                    aria-label="Content type"
                                >
                                    <Tabs.Trigger value="link" className={tabCls}>
                                        <Icon name="link" size={16} />
                                        Link
                                    </Tabs.Trigger>
                                    <Tabs.Trigger value="text" className={tabCls}>
                                        <Icon name="txt" size={16} />
                                        Text
                                    </Tabs.Trigger>
                                    <Tabs.Trigger value="img" className={tabCls}>
                                        <Icon name="img" size={16} />
                                        Images
                                    </Tabs.Trigger>
                                </Tabs.List>
                                <Tabs.Content value="link" className="flex flex-col gap-3">
                                    <Field label="paste a link" type="url" placeholder="https://" />
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-hand text-xl text-mut">
                                            works with
                                        </span>
                                        {SITES.map((s) => (
                                            <Pill key={s}>{s}</Pill>
                                        ))}
                                    </div>
                                </Tabs.Content>
                                <Tabs.Content value="text">
                                    <Field
                                        label="paste your text"
                                        as="textarea"
                                        placeholder="Paste notes or an article here"
                                    />
                                </Tabs.Content>
                                <Tabs.Content value="img">
                                    <label className="block font-hand text-[22px] text-mut">
                                        upload images
                                        <span className="mt-1 flex h-24 cursor-pointer items-center justify-center rounded-md border-[1.5px] border-dashed border-edge font-sans text-[15px] text-mut">
                                            Choose images
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="sr-only"
                                            />
                                        </span>
                                    </label>
                                </Tabs.Content>
                            </Tabs.Root>
                            <p className="text-[13px] text-mut">
                                Can’t extract a page? Switch to Text or Images and we’ll use that
                                instead.
                            </p>
                            <div className="flex gap-3 md:justify-end">
                                <Dialog.Close asChild>
                                    <Button className="flex-1 md:flex-none">Cancel</Button>
                                </Dialog.Close>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="flex-1 md:flex-none"
                                >
                                    Add to library
                                </Button>
                            </div>
                        </form>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
