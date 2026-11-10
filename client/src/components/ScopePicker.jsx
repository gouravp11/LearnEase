import * as Select from "@radix-ui/react-select";
import { Icon } from "./Icon.jsx";
import { Chip } from "./ui.jsx";

/** With this many subjects or fewer, scope shows as chips; with more it collapses into a dropdown. */
export const MAX_CHIPS = 3;

/**
 * Flash-scope control. `scopes` = ['All subjects', ...subjectNames].
 * Chips (≤ MAX_CHIPS subjects) wrap instead of shrinking the title; the dropdown is a full-width
 * trigger on mobile and a fixed 220px trigger on tablet/desktop, with a scrollable list.
 */
export default function ScopePicker({ scopes, value, onChange }) {
    if (scopes.length - 1 <= MAX_CHIPS) {
        return (
            <div
                role="group"
                aria-label="Flash scope"
                className="no-scrollbar flex gap-2 overflow-x-auto md:flex-wrap md:gap-2.5 md:overflow-visible"
            >
                {scopes.map((s) => (
                    <Chip key={s} on={value === s} onClick={() => onChange(s)}>
                        {s}
                    </Chip>
                ))}
            </div>
        );
    }
    return (
        <Select.Root value={value} onValueChange={onChange}>
            <Select.Trigger
                aria-label="Flash scope"
                className="inline-flex h-10 w-full items-center justify-between gap-3 rounded-lg border-[1.5px] border-transparent bg-hl px-[14.5px] text-sm font-medium text-hltext md:w-[220px]"
            >
                <span className="truncate">
                    <Select.Value />
                </span>
                <Icon name="chevron" size={16} />
            </Select.Trigger>
            <Select.Portal>
                <Select.Content
                    position="popper"
                    sideOffset={8}
                    align="end"
                    collisionPadding={12}
                    className="z-50 max-h-[min(320px,var(--radix-select-content-available-height))] w-[var(--radix-select-trigger-width)] min-w-[200px] overflow-hidden rounded-md border border-edge bg-card shadow-paper"
                >
                    <Select.Viewport className="p-1.5">
                        {scopes.map((s) => (
                            <Select.Item
                                key={s}
                                value={s}
                                className="flex h-10 cursor-pointer select-none items-center justify-between gap-2 rounded px-3 text-sm outline-none data-[highlighted]:bg-tag data-[highlighted]:text-tagtext data-[state=checked]:font-medium"
                            >
                                <Select.ItemText>{s}</Select.ItemText>
                                <Select.ItemIndicator>
                                    <Icon name="check" size={16} />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
}
