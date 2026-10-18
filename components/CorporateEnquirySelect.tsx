"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import styles from "./CorporateTravelEnquiry.module.css";

/** A single-select in the site's quiet, underlined style. Focus stays on its button. */
export function CorporateEnquirySelect<Value extends string>({ id, label, name, value, options, placeholder, onChange }: {
  id: string; label: string; name: string; value: Value; options: readonly { value: Value; label: string }[]; placeholder?: string; onChange: (value: Value) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const typeahead = useRef({ text: "", at: 0 });
  const selected = options.findIndex(option => option.value === value);
  const listId = `${id}-options`;
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  useEffect(() => { if (open) rootRef.current?.querySelector<HTMLElement>(`[data-option-index="${active}"]`)?.scrollIntoView({ block: "nearest" }); }, [active, open]);
  function show(index = Math.max(selected, 0)) { setActive(index); setOpen(true); }
  function choose(index: number) { const option = options[index]; if (!option) return; onChange(option.value); setOpen(false); buttonRef.current?.focus({ preventScroll: true }); }
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape" && open) { event.preventDefault(); event.stopPropagation(); setOpen(false); return; }
    if (event.key === "Tab") { setOpen(false); return; }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) show(selected < 0 ? (event.key === "ArrowUp" ? options.length - 1 : 0) : selected);
      else setActive(index => (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
      return;
    }
    if (event.key === "Home" || event.key === "End") { event.preventDefault(); show(event.key === "Home" ? 0 : options.length - 1); return; }
    if ((event.key === "Enter" || event.key === " ") && open) { event.preventDefault(); choose(active); return; }
    if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey && event.key !== " ") {
      event.preventDefault();
      const now = Date.now();
      const text = (now - typeahead.current.at < 700 ? typeahead.current.text : "") + event.key.toLocaleLowerCase();
      typeahead.current = { text, at: now };
      const index = options.findIndex(option => option.label.toLocaleLowerCase().startsWith(text));
      if (index >= 0) show(index);
    }
  }
  return <div className={styles.selectField} data-open={open || undefined} ref={rootRef} onBlur={event => { if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <span className={styles.labelRow} id={`${id}-label`}>{label}</span>
    <input type="hidden" name={name} value={value} />
    <button aria-activedescendant={open ? `${id}-option-${active}` : undefined} aria-controls={open ? listId : undefined} aria-expanded={open} aria-haspopup="listbox" aria-labelledby={`${id}-label ${id}-value`} className={styles.selectButton} id={id} onClick={() => open ? setOpen(false) : show()} onKeyDown={onKeyDown} ref={buttonRef} role="combobox" type="button">
      <span data-placeholder={selected < 0 || undefined} id={`${id}-value`}>{selected >= 0 ? options[selected].label : placeholder}</span><i aria-hidden="true" />
    </button>
    {open && <div aria-labelledby={`${id}-label`} className={styles.selectOptions} id={listId} role="listbox">
      {options.map((option, index) => <div aria-selected={value === option.value} className={styles.selectOption} data-active={active === index || undefined} data-option-index={index} id={`${id}-option-${index}`} key={option.value} onClick={() => choose(index)} onMouseDown={event => event.preventDefault()} onPointerMove={() => setActive(index)} role="option"><span>{option.label}</span>{value === option.value && <i aria-hidden="true">✓</i>}</div>)}
    </div>}
  </div>;
}
