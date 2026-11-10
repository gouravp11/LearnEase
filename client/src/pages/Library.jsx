import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { Shell } from "../components/Shell.jsx";
import { Icon } from "../components/Icon.jsx";
import { Button, Holes, cx } from "../components/ui.jsx";
import { useSubjects } from "../context/SubjectsContext.jsx";
import { LIBRARY_ITEMS } from "../data.js";
import ContentViewerDialog from "../components/ContentViewerDialog.jsx";
import SubjectActions from "../components/SubjectActions.jsx";
import LibraryItemActions from "../components/LibraryItemActions.jsx";

export default function Library() {
    const { subjects, activeName, setActiveName, openCreate, updateSubject, removeSubject } =
        useSubjects();
    const [libraryItems, setLibraryItems] = useState(LIBRARY_ITEMS);
    const [q, setQ] = useState("");
    const [viewing, setViewing] = useState(null);

    const tabs = [
        {
            name: "All content",
            count: subjects.reduce((n, s) => n + s.count, 0),
            title: "All content",
            desc: "Everything you have added, across all subjects."
        },
        ...subjects
    ];
    const tab = tabs.find((t) => t.name === activeName) ?? tabs[0];
    const currentSubject = subjects.find((subject) => subject.name === tab.name);
    const items = (libraryItems[tab.name] ?? []).filter((i) =>
        i.title.toLowerCase().includes(q.trim().toLowerCase())
    );
    const editItem = (updatedItem) => {
        setLibraryItems((current) =>
            Object.fromEntries(
                Object.entries(current).map(([name, collection]) => [
                    name,
                    collection.map((item) => (item.id === updatedItem.id ? updatedItem : item))
                ])
            )
        );
        setViewing((current) => (current?.id === updatedItem.id ? updatedItem : current));
    };
    const deleteItem = (deletedItem) => {
        setLibraryItems((current) =>
            Object.fromEntries(
                Object.entries(current).map(([name, collection]) => [
                    name,
                    collection.filter((item) => item.id !== deletedItem.id)
                ])
            )
        );
        setViewing((current) => (current?.id === deletedItem.id ? null : current));
    };

    return (
        <Shell>
            <div className="flex flex-col gap-3 pb-[88px] pl-7 pr-4 pt-4 md:min-h-[calc(100vh-72px)] md:flex-row md:gap-0 md:p-8 md:pl-0 lg:py-10 lg:pr-12">
                <aside className="flex flex-col gap-3 md:w-[230px] md:shrink-0 md:gap-2.5 md:pl-6 md:pr-3 lg:w-[300px] lg:pl-8">
                    <div className="flex items-center justify-between">
                        <p className="font-hand text-2xl text-mut">subjects</p>
                        <button
                            type="button"
                            onClick={openCreate}
                            className="h-9 shrink-0 rounded-[10px] border-[1.5px] border-dashed border-edge px-3 text-sm text-mut"
                        >
                            + New
                        </button>
                    </div>
                    <div className="flex items-center gap-2 md:hidden">
                        <Select.Root value={tab.name} onValueChange={setActiveName}>
                            <Select.Trigger
                                aria-label="Select subject"
                                className="inline-flex h-10 min-w-0 flex-1 items-center justify-between gap-3 rounded-lg border border-edge bg-tag px-3.5 text-sm text-mut"
                            >
                                <span className="truncate">
                                    <Select.Value />
                                </span>
                                <Icon name="chevron" size={16} />
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content
                                    position="popper"
                                    sideOffset={6}
                                    collisionPadding={12}
                                    className="z-50 max-h-[min(320px,var(--radix-select-content-available-height))] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-edge bg-card shadow-paper"
                                >
                                    <Select.Viewport className="p-1.5">
                                        {tabs.map((t) => (
                                            <Select.Item
                                                key={t.name}
                                                value={t.name}
                                                className="flex h-10 cursor-pointer select-none items-center justify-between gap-2 rounded px-3 text-sm outline-none data-[highlighted]:bg-tag data-[highlighted]:text-tagtext data-[state=checked]:font-medium"
                                            >
                                                <Select.ItemText>
                                                    {t.name} · {t.count}
                                                </Select.ItemText>
                                                <Select.ItemIndicator>
                                                    <Icon name="check" size={16} />
                                                </Select.ItemIndicator>
                                            </Select.Item>
                                        ))}
                                    </Select.Viewport>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                        {currentSubject && (
                            <SubjectActions
                                subject={currentSubject}
                                onEdit={updateSubject}
                                onDelete={removeSubject}
                            />
                        )}
                    </div>
                    <div
                        role="group"
                        aria-label="Subjects"
                        className="hidden gap-2.5 md:flex md:flex-col md:overflow-visible"
                    >
                        {tabs.map((t) => {
                            const on = t.name === tab.name;
                            const subject = subjects.find((item) => item.name === t.name);
                            return (
                                <div
                                    key={t.name}
                                    className={cx(
                                        "flex h-10 shrink-0 items-center rounded-[10px] border border-edge md:h-[52px] md:w-full md:rounded-xl",
                                        on ? "bg-card text-ink md:font-semibold" : "bg-tag text-mut"
                                    )}
                                >
                                    {subject && (
                                        <SubjectActions
                                            subject={subject}
                                            onEdit={updateSubject}
                                            onDelete={removeSubject}
                                        />
                                    )}
                                    <button
                                        type="button"
                                        aria-pressed={on}
                                        onClick={() => setActiveName(t.name)}
                                        className="h-full min-w-0 flex-1 rounded-[10px] px-3.5 text-left text-sm md:px-3 md:text-[15px]"
                                    >
                                        <span className="md:hidden">
                                            {t.name} · {t.count}
                                        </span>
                                        <span className="hidden w-full items-center justify-between md:flex">
                                            <span>{t.name}</span>
                                            <span className="text-[13px] font-normal text-mut">
                                                {t.count}
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </aside>

                <section className="relative flex flex-1 flex-col gap-3.5 rounded-[6px] border border-edge bg-card p-5 shadow-paper md:gap-[18px] md:py-7 md:pl-[60px] md:pr-7 lg:py-8 lg:pl-16 lg:pr-8">
                    <Holes gap={40} className="left-4 hidden md:flex lg:left-[18px]" />
                    {subjects.length === 0 ? (
                        <div className="flex flex-1 flex-col items-start gap-4 py-10">
                            <p className="font-hand text-2xl text-mut">nothing here yet</p>
                            <h1 className="font-display text-[32px] md:text-[36px]">
                                Create your first subject
                            </h1>
                            <p className="max-w-[420px] text-sm text-mut">
                                Subjects group the links, notes and images you add, and decide what
                                each flashcard session draws from.
                            </p>
                            <Button variant="primary" icon="plus" onClick={openCreate}>
                                New subject
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-3.5 md:flex-row md:items-end md:justify-between md:gap-4">
                                <div className="flex flex-col gap-2">
                                    <h1 className="font-display text-[32px] md:text-[36px] lg:text-[38px]">
                                        {tab.title}
                                    </h1>
                                    <p className="text-sm text-mut md:w-[230px] lg:w-[440px]">
                                        {tab.desc}
                                    </p>
                                </div>
                                <Button
                                    variant="primary"
                                    icon="play"
                                    iconSize={14}
                                    className="h-12 w-full md:h-11 md:w-auto"
                                >
                                    Flash this subject
                                </Button>
                            </div>

                            <label className="flex h-11 items-center gap-3 border-b-[1.5px] border-ink text-mut focus-within:border-accent">
                                <Icon name="srch" size={18} />
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Search content"
                                    aria-label="Search content"
                                    className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-mut"
                                />
                            </label>

                            <ul>
                                {items.map((it) => (
                                    <li
                                        key={it.id}
                                        className="flex h-[76px] items-center gap-3.5 border-b border-dashed border-edge md:h-[84px] md:gap-4 lg:h-20 lg:gap-5"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setViewing(it)}
                                            aria-haspopup="dialog"
                                            className="flex min-w-0 flex-1 items-center gap-3.5 text-left md:gap-4 lg:gap-5"
                                        >
                                            <span className="flex h-10 w-10 shrink-0 rotate-[3deg] items-center justify-center rounded-lg border-[1.5px] border-ink md:h-11 md:w-11">
                                                <Icon name={it.kind} />
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block font-display text-base hover:underline md:text-[19px]">
                                                    {it.title}
                                                </span>
                                                <span className="mt-[3px] block text-xs text-mut md:mt-1 md:text-[13px]">
                                                    {it.source} ·{" "}
                                                    <span className="hidden lg:inline">Added </span>
                                                    {it.added}
                                                </span>
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            aria-label={`Flash ${it.title}`}
                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-ink md:hidden"
                                        >
                                            <Icon name="play" size={14} />
                                        </button>
                                        <Button
                                            size="sm"
                                            icon="play"
                                            iconSize={14}
                                            className="hidden md:inline-flex"
                                        >
                                            Flash
                                        </Button>
                                        <LibraryItemActions
                                            item={it}
                                            onEdit={editItem}
                                            onDelete={deleteItem}
                                        />
                                    </li>
                                ))}
                            </ul>
                            {items.length === 0 && (
                                <p className="text-sm text-mut">
                                    {q
                                        ? `Nothing matches “${q}”.`
                                        : "No content yet. Use the + button to add a link, text or images."}
                                </p>
                            )}
                        </>
                    )}
                </section>
            </div>
            <ContentViewerDialog
                item={viewing}
                onOpenChange={(o) => !o && setViewing(null)}
                onFlash={() => setViewing(null) /* TODO: start flashing this item */}
            />
        </Shell>
    );
}
