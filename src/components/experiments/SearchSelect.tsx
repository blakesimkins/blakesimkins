"use client";

import { useState, useRef } from "react";
import { Command } from "cmdk";

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
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ person }: { person: Person }) {
  return (
    <div className="ss-avatar" style={{ background: person.color }} aria-hidden="true">
      {initials(person.name)}
    </div>
  );
}

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function SearchSelect() {
  const [selected, setSelected] = useState<Person[]>([]);
  const [open, setOpen] = useState(false);
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // People not yet selected, sorted alphabetically — cmdk filters these by input value
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
    // Add to removing set → CSS transition kicks in
    setRemovingIds((prev) => new Set([...prev, id]));
    // After animation completes, remove from state
    setTimeout(() => {
      setSelected((prev) => prev.filter((p) => p.id !== id));
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 220);
  }

  function clearAll() {
    setSelected([]);
  }

  return (
    <div
      ref={containerRef}
      className="bg-white border border-zinc-200 p-8 shadow-sm max-w-lg ss-container"
      style={{ borderRadius: 8 }}
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
            <button className="ss-clear-all" onClick={clearAll}>
              Remove all
            </button>
          )}
        </div>

        {/* Selected list */}
        <div>
          {selected.map((person) => (
            <div
              key={person.id}
              className={`ss-selected-row${removingIds.has(person.id) ? " removing" : ""}`}
            >
              <Avatar person={person} />
              <span className="text-sm font-medium text-zinc-900 flex-1">
                {person.name}
              </span>
              <button
                className="ss-remove-btn"
                aria-label={`Remove ${person.name}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => removePerson(person.id)}
              >
                <XIcon size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* cmdk — handles filtering, keyboard nav, and accessibility */}
        <Command className="relative overflow-visible bg-transparent border-none p-0">
          <div className="relative">
            <Command.Input
              placeholder="Add Technicians"
              onFocus={() => setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
                if (e.key === "Backspace" && e.currentTarget.value === "" && selected.length > 0) {
                  removePerson(selected[selected.length - 1].id);
                }
              }}
              className="w-full h-10 border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
              style={{ borderRadius: 8 }}
              aria-label="Search for technicians"
            />
          </div>

          {open && (
            <div
              className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 bg-white border border-zinc-200 shadow-md overflow-hidden"
              style={{ borderRadius: 8 }}
            >
              <Command.List className="py-1 max-h-64 overflow-y-auto">
                <Command.Empty className="px-3 py-6 text-center text-sm text-zinc-400">
                  No results found
                </Command.Empty>
                {available.map((person) => (
                  <Command.Item
                    key={person.id}
                    value={person.name}
                    onSelect={addPerson}
                    className="ss-dropdown-item aria-selected:bg-zinc-50"
                  >
                    <Avatar person={person} />
                    <span>{person.name}</span>
                  </Command.Item>
                ))}
              </Command.List>
            </div>
          )}
        </Command>
      </div>
    </div>
  );
}
