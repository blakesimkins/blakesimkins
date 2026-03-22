"use client";

import { useState, useRef } from "react";
import { Command as CommandPrimitive } from "cmdk";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Person {
  id: number;
  name: string;
  color: string;
}

const people: Person[] = [
  { id: 1, name: "Blake Simkins", color: "#6366f1" },
  { id: 2, name: "Ricky Howard", color: "#0ea5e9" },
  { id: 3, name: "Linda Michelle", color: "#f43f5e" },
  { id: 4, name: "Milo Blake", color: "#10b981" },
  { id: 5, name: "Kendall Jane", color: "#f59e0b" },
  { id: 6, name: "Marcus Webb", color: "#8b5cf6" },
  { id: 7, name: "Priya Nair", color: "#ec4899" },
];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function SearchSelectSingle() {
  const [selected, setSelected] = useState<Person | null>(null);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function selectPerson(value: string) {
    const person = people.find((p) => p.name === value);
    if (!person) return;
    setSelected(person);
    setOpen(false);
  }

  function clear() {
    setSelected(null);
    setOpen(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <div
      ref={containerRef}
      className="w-full"
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-zinc-900">Technician</p>

        <Command className="overflow-visible bg-transparent p-0 h-auto border-none shadow-none">
          <div className="relative">

            {selected ? (
              /* Selected state — click anywhere to clear and re-search */
              <div
                className="flex items-center gap-2.5 h-10 w-full border border-zinc-200 rounded-lg bg-white px-3 hover:border-zinc-400 transition-all cursor-pointer"
                onClick={clear}
              >
                <span
                  className="w-6 h-6 rounded-[6px] flex items-center justify-center text-xs font-medium text-white shrink-0"
                  style={{ background: selected.color }}
                  aria-hidden="true"
                >
                  {initials(selected.name)}
                </span>
                <span className="flex-1 text-sm text-zinc-900">{selected.name}</span>
                <span className="text-zinc-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </span>
              </div>
            ) : (
              /* Search input */
              <CommandPrimitive.Input
                ref={inputRef}
                placeholder="Select Technician"
                onFocus={() => setOpen(true)}
                onClick={() => setOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setOpen(false);
                }}
                className="w-full h-10 border border-zinc-200 rounded-lg bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
                aria-label="Select a technician"
              />
            )}

            {/* Dropdown */}
            {open && !selected && (
              <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 bg-white border border-zinc-200 rounded-lg shadow-md overflow-hidden">
                <CommandList className="py-1 max-h-64">
                  <CommandEmpty className="px-3 py-6 text-center text-sm text-zinc-400">
                    No results found
                  </CommandEmpty>
                  {people
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((person) => (
                      <CommandItem
                        key={person.id}
                        value={person.name}
                        onSelect={selectPerson}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-none cursor-pointer text-sm text-zinc-900 aria-selected:bg-zinc-50 [&_svg:last-child]:hidden"
                      >
                        <span
                          className="w-6 h-6 rounded-[6px] flex items-center justify-center text-xs font-medium text-white shrink-0"
                          style={{ background: person.color }}
                          aria-hidden="true"
                        >
                          {initials(person.name)}
                        </span>
                        <span>{person.name}</span>
                      </CommandItem>
                    ))}
                </CommandList>
              </div>
            )}
          </div>
        </Command>
      </div>
    </div>
  );
}
