import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "./Icon.jsx";
import { Button, Holes } from "./ui.jsx";

/**
 * Shows saved text, image OCR, or link details. Pass null to close.
 */
export default function ContentViewerDialog({ item, onOpenChange, onFlash }) {
    const [copied, setCopied] = useState(false);
    useEffect(() => setCopied(false), [item]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(item.text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            /* clipboard blocked: ignore */
        }
    };

    const isImage = item?.kind === "img";
    const isLink = item?.kind === "link";
    const tiles = item ? (item.thumbs ?? Array.from({ length: item.imageCount ?? 0 })) : [];

    return (
        <Dialog.Root open={!!item} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-overlay" />
                <Dialog.Content
                    aria-describedby={undefined}
                    className="fixed inset-x-0 bottom-0 z-50 flex max-h-[90dvh] flex-col gap-5 rounded-t-3xl border border-edge bg-card pb-7 pl-6 pr-6 pt-3.5 shadow-paper md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[85vh] md:w-[640px] md:-translate-x-1/2 md:-translate-y-1/2 md:gap-[22px] md:rounded-md md:py-9 md:pl-16 md:pr-10 lg:w-[680px]"
                >
                    {item && (
                        <>
                            <Holes gap={44} className="-left-[9px] hidden md:flex" />
                            <span
                                aria-hidden="true"
                                className="mx-auto h-1 w-10 shrink-0 rounded-sm bg-edge md:hidden"
                            />

                            <div className="flex shrink-0 items-start justify-between gap-4">
                                <div>
                                    <Dialog.Title className="font-display text-[26px] md:text-[28px]">
                                        {item.title}
                                    </Dialog.Title>
                                    <p className="mt-1 text-[13px] text-mut">
                                        {item.source} · {item.added}
                                    </p>
                                </div>
                                <Dialog.Close aria-label="Close" className="mt-1 text-mut">
                                    <Icon name="x" size={20} />
                                </Dialog.Close>
                            </div>

                            {isImage && tiles.length > 0 && (
                                <ul
                                    className="flex shrink-0 gap-2.5 overflow-x-auto"
                                    aria-label="Uploaded images"
                                >
                                    {tiles.map((src, i) => (
                                        <li
                                            key={i}
                                            className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-edge bg-tag text-tagtext"
                                        >
                                            {src ? (
                                                <img
                                                    src={src}
                                                    alt={`Upload ${i + 1}`}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <Icon name="img" size={20} />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {isLink ? (
                                <div className="flex min-h-[120px] flex-1 flex-col gap-3">
                                    <p className="font-hand text-[22px] text-mut">saved link</p>
                                    {item.url ? (
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="break-all text-accent underline"
                                        >
                                            {item.url}
                                        </a>
                                    ) : (
                                        <p className="text-[15px] text-mut">
                                            Link content isn’t available in this preview.
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="flex min-h-0 flex-1 flex-col">
                                    <p className="shrink-0 font-hand text-[22px] text-mut">
                                        {isImage ? "text read from your images" : "your text"}
                                    </p>
                                    <div
                                        tabIndex={0}
                                        className="min-h-[120px] flex-1 overflow-y-auto whitespace-pre-wrap rounded-md border border-edge bg-bg p-4 text-[15px] leading-7"
                                    >
                                        {item.text}
                                    </div>
                                    {isImage && (
                                        <p className="mt-2 shrink-0 text-[13px] text-mut">
                                            Reading text from images can make mistakes, so
                                            double-check names and numbers.
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="flex shrink-0 gap-3 md:justify-end">
                                {!isLink && (
                                    <Button
                                        onClick={copy}
                                        icon={copied ? "check" : "copy"}
                                        className="flex-1 md:flex-none"
                                    >
                                        {copied ? "Copied" : "Copy text"}
                                    </Button>
                                )}
                                <Button
                                    variant="primary"
                                    icon="play"
                                    iconSize={14}
                                    onClick={() => onFlash?.(item)}
                                    className="flex-1 md:flex-none"
                                >
                                    Flash this
                                </Button>
                            </div>
                        </>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
