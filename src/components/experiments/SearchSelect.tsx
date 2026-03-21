"use client";

import { useRef, useState, useCallback, useEffect } from "react";

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
    <div
      className="ss-avatar"
      style={{ background: person.color }}
      aria-hidden="true"
    >
      {initials(person.name)}
    </div>
  );
}

export default function SearchSelect() {
  const [selected, setSelected] = useState<Person[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedListRef = useRef<HTMLDivElement>(null);

  const filtered = people
    .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  const visibleItems = filtered.filter(
    (p) => !selected.some((s) => s.id === p.id)
  );

  function addPerson(person: Person) {
    if (!selected.some((s) => s.id === person.id)) {
      setSelected((prev) => [...prev, person]);
      setQuery("");
      inputRef.current?.focus();
    }
  }

  function animateRemoveRow(row: HTMLDivElement, id: number) {
    const h = row.offsetHeight;
    const mb = parseFloat(getComputedStyle(row).marginBottom) || 0;

    row.style.overflow = "hidden";
    row.style.height = h + "px";
    row.style.marginBottom = mb + "px";

    row.getBoundingClientRect(); // force reflow

    row.style.transition =
      "height 0.2s ease, opacity 0.12s ease, margin-bottom 0.2s ease";
    row.style.height = "0";
    row.style.opacity = "0";
    row.style.marginBottom = "0";

    row.addEventListener(
      "transitionend",
      () => {
        setSelected((prev) => prev.filter((p) => p.id !== id));
      },
      { once: true }
    );
  }

  function handleRemove(id: number, index: number) {
    const rows = selectedListRef.current?.querySelectorAll<HTMLDivElement>(
      "[data-row-id]"
    );
    const row = rows?.[index];
    if (row) {
      animateRemoveRow(row, id);
      const isLast = index === selected.length - 1;
      if (isLast && selected.length > 1) {
        const btns = selectedListRef.current?.querySelectorAll<HTMLButtonElement>(
          ".ss-remove-btn"
        );
        btns?.[btns.length - 1]?.focus();
      } else {
        inputRef.current?.focus();
      }
    }
  }

  function clearAll() {
    setSelected([]);
    setOpen(false);
  }

  const getSelectableItems = useCallback(() => {
    return visibleItems;
  }, [visibleItems]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const items = getSelectableItems();

    if (!open && e.key !== "Escape") setOpen(true);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIdx((prev) => Math.min(prev + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (focusedIdx <= 0) {
        setOpen(false);
        const btns =
          selectedListRef.current?.querySelectorAll<HTMLButtonElement>(
            ".ss-remove-btn"
          );
        if (btns?.length) btns[btns.length - 1].focus();
      } else {
        setFocusedIdx((prev) => prev - 1);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedIdx >= 0 && items[focusedIdx]) {
        addPerson(items[focusedIdx]);
        setFocusedIdx(-1);
      }
    } else if (e.key === "Backspace" && query === "" && selected.length > 0) {
      const last = selected[selected.length - 1];
      const rows = selectedListRef.current?.querySelectorAll<HTMLDivElement>(
        "[data-row-id]"
      );
      const lastRow = rows?.[rows.length - 1];
      if (lastRow) animateRemoveRow(lastRow, last.id);
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Tab") {
      if (focusedIdx >= 0 && items[focusedIdx]) {
        e.preventDefault();
        addPerson(items[focusedIdx]);
        setFocusedIdx(-1);
      } else {
        setOpen(false);
      }
    }
  }

  // Reset focusedIdx when dropdown items change
  useEffect(() => {
    setFocusedIdx(-1);
  }, [query, selected.length]);

  return (
    <div
      ref={containerRef}
      id="ss-container"
      className="bg-white border border-zinc-200 rounded-lg p-8 shadow-sm max-w-lg ss-container"
      style={{ borderRadius: 8 }}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-900">Technicians</p>
          {selected.length > 0 && (
            <button className="ss-clear-all" onClick={clearAll}>
              Remove all
            </button>
          )}
        </div>

        {/* Selected list */}
        <div ref={selectedListRef}>
          {selected.map((person, i) => (
            <div
              key={person.id}
              data-row-id={person.id}
              className="ss-selected-row"
            >
              <Avatar person={person} />
              <span className="text-sm font-medium text-zinc-900 flex-1">
                {person.name}
              </span>
              <button
                className="ss-remove-btn"
                aria-label={`Remove ${person.name}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleRemove(person.id, i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                    e.preventDefault();
                    const btns =
                      selectedListRef.current?.querySelectorAll<HTMLButtonElement>(
                        ".ss-remove-btn"
                      );
                    if (btns) {
                      const arr = Array.from(btns);
                      arr[i + 1]?.focus() ?? inputRef.current?.focus();
                    }
                  } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const btns =
                      selectedListRef.current?.querySelectorAll<HTMLButtonElement>(
                        ".ss-remove-btn"
                      );
                    if (btns) {
                      const arr = Array.from(btns);
                      arr[i - 1]?.focus() ?? inputRef.current?.focus();
                    }
                  } else if (
                    e.key === "Backspace" ||
                    e.key === "Delete"
                  ) {
                    e.preventDefault();
                    handleRemove(person.id, i);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
              </button>
            </div>
          ))}
        </div>

        {/* Search input */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Add Technicians"
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            className="ss-input w-full h-10 border border-zinc-200 bg-white px-3 py-2 pr-8 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all"
            style={{ borderRadius: 8 }}
            aria-label="Search for technicians"
            aria-autocomplete="list"
            aria-controls="technician-dropdown"
          />

          {/* Clear input button */}
          <button
            aria-label="Clear search"
            className={`ss-input-clear${query.length > 0 ? " visible" : ""}`}
            onMouseDown={(e) => {
              e.preventDefault();
              setQuery("");
              inputRef.current?.focus();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
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
          </button>

          {/* Dropdown */}
          {open && (
            <div
              id="technician-dropdown"
              role="listbox"
              aria-label="Technician options"
              className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 bg-white border border-zinc-200 shadow-md overflow-hidden"
              style={{ borderRadius: 8 }}
            >
              <div className="py-1 max-h-64 overflow-y-auto">
                {visibleItems.length === 0 ? (
                  <p className="px-3 py-6 text-center text-sm text-zinc-400">
                    No results found
                  </p>
                ) : (
                  visibleItems.map((person, idx) => (
                    <div
                      key={person.id}
                      role="option"
                      aria-selected="false"
                      className={`ss-dropdown-item${focusedIdx === idx ? " ss-focused" : ""}`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        addPerson(person);
                      }}
                    >
                      <Avatar person={person} />
                      <span>{person.name}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
