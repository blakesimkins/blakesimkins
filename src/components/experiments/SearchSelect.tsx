"use client";

import { useState, useRef } from "react";
import { Command as CommandPrimitive } from "cmdk";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

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

function Avatar({ person }: { person: Person }) {
  return (
    <div
      className="w-6 h-6 rounded-[6px] flex items-center justify-center text-xs font-medium text-white shrink-0"
      style={{ background: person.color }}
      aria-hidden="true"
    >
      {initials(person.name)}
    </div>
  );
}

export default function SearchSelect() {
  const [selected, setSelected] = useState<Person[]>([]);
  const [open, setOpen] = useState(false);
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  const available = people
    .filter((p) => !selected.some((s) => s.id === p.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  function addPerson(value: string) {
    const person = people.find((p) => p.name === value);
    if (!person || selected.some((s) => s.id === person.id)) return;
    setSelected((prev) => [...prev, person]);
    setOpen(false);
  }

  function removePerson(id: number) {
    setRemovingIds((prev) => new Set([...prev, id]));
    setTimeout(() => {
      setSelected((prev) => prev.filter((p) => p.id !== id));
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 220);
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
      <div className="space-y-3">

        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-900">Technicians</p>
          {selected.length > 0 && (
            <button
              className="text-xs font-medium text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
              onClick={() => setSelected([])}
            >
              Remove all
            </button>
          )}
        </div>

        {/* Selected list */}
        <div>
          {selected.map((person) => {
            const removing = removingIds.has(person.id);
            return (
              <div
                key={person.id}
                className={cn(
                  "group flex items-center gap-2.5 px-3 border rounded-lg bg-white overflow-hidden transition-all duration-200 hover:border-zinc-400",
                  removing
                    ? "max-h-0 opacity-0 mb-0 py-0 border-transparent"
                    : "max-h-[60px] opacity-100 mb-3 py-2 border-zinc-200"
                )}
              >
                <Avatar person={person} />
                <span className="text-sm font-medium text-zinc-900 flex-1">
                  {person.name}
                </span>
                <button
                  title="Remove"
                  className="ml-auto flex items-center justify-center w-6 h-6 shrink-0 rounded text-zinc-400 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:text-zinc-900 hover:bg-zinc-100 transition-all cursor-pointer"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => removePerson(person.id)}
                  aria-label={`Remove ${person.name}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        {/* shadcn Command — filtering, keyboard nav, and ARIA handled by cmdk */}
        <Command className="overflow-visible bg-transparent p-0 h-auto border-none shadow-none">
          <div className="relative">
            <CommandPrimitive.Input
              placeholder="Add Technicians"
              onFocus={() => setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
                if (e.key === "Backspace" && e.currentTarget.value === "" && selected.length > 0) {
                  removePerson(selected[selected.length - 1].id);
                }
              }}
              className="w-full h-10 border border-zinc-200 rounded-lg bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
              aria-label="Search for technicians"
            />

            {open && (
              <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 bg-white border border-zinc-200 rounded-lg shadow-md overflow-hidden">
                <CommandList className="py-1 max-h-64">
                  <CommandEmpty className="px-3 py-6 text-center text-sm text-zinc-400">
                    No results found
                  </CommandEmpty>
                  {available.map((person) => (
                    <CommandItem
                      key={person.id}
                      value={person.name}
                      onSelect={addPerson}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-none cursor-pointer text-sm text-zinc-900 aria-selected:bg-zinc-50 [&_svg:last-child]:hidden"
                    >
                      <Avatar person={person} />
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
