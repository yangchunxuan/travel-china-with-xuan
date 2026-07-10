"use client";

import {
  Check,
  ClipboardCheck,
  Copy,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { Dict } from "../lib/i18n";

export function TripBrief({ t }: { t: Dict }) {
  const p = t.plan;
  const [party, setParty] = useState(p.partyOptions[0]);
  const [timing, setTiming] = useState(p.timingOptions[0]);
  const [pace, setPace] = useState(p.paceOptions[1]);
  const [interests, setInterests] = useState<string[]>([p.interestOptions[0]]);
  const [copied, setCopied] = useState(false);

  const brief = useMemo(
    () =>
      [
        p.briefIntro,
        `${p.briefParty}: ${party}`,
        `${p.briefTiming}: ${timing}`,
        `${p.briefPace}: ${pace}`,
        `${p.briefInterests}: ${interests.length ? interests.join(", ") : p.briefOpen}`,
        p.briefOutro,
      ].join("\n"),
    [interests, p, pace, party, timing],
  );

  const emailHref = `mailto:yangchunxuan1@gmail.com?subject=${encodeURIComponent(
    p.emailSubject,
  )}&body=${encodeURIComponent(brief)}`;

  const toggleInterest = (interest: string) => {
    setCopied(false);
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const copyAndOpenMessenger = () => {
    void copyBrief();
    window.open("https://m.me/1176159805586468", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="plan" className="plan-section">
      <div className="wrap plan-grid">
        <div className="plan-intro">
          <span className="section-kicker light">{p.kicker}</span>
          <h2>{p.h2}</h2>
          <p>{p.lead}</p>
          <div className="plan-note">
            <Sparkles size={18} />
            <span>{p.note}</span>
          </div>
        </div>

        <div className="brief-builder">
          <fieldset>
            <legend>{p.whoLegend}</legend>
            <div className="segmented-control">
              {p.partyOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={party === option}
                  onClick={() => {
                    setParty(option);
                    setCopied(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="brief-row">
            <label>
              {p.timingLabel}
              <select
                value={timing}
                onChange={(event) => {
                  setTiming(event.target.value);
                  setCopied(false);
                }}
              >
                {p.timingOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <fieldset>
              <legend>{p.paceLegend}</legend>
              <div className="segmented-control pace-control">
                {p.paceOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={pace === option}
                    onClick={() => {
                      setPace(option);
                      setCopied(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <fieldset>
            <legend>{p.interestsLegend}</legend>
            <div className="interest-grid">
              {p.interestOptions.map((interest) => {
                const selected = interests.includes(interest);
                return (
                  <label key={interest} className={selected ? "is-selected" : ""}>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleInterest(interest)}
                    />
                    <span className="check-box" aria-hidden="true">
                      {selected && <Check size={14} />}
                    </span>
                    {interest}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="brief-preview">
            <div>
              <span>{p.previewLabel}</span>
              <ClipboardCheck size={18} />
            </div>
            <p>{brief}</p>
          </div>

          <div className="brief-actions">
            <button type="button" className="btn btn-primary" onClick={copyAndOpenMessenger}>
              <MessageCircle size={18} /> {p.copyOpen}
            </button>
            <button type="button" className="btn btn-secondary" onClick={copyBrief}>
              <Copy size={17} /> {copied ? p.copied : p.copyOnly}
            </button>
            <a className="btn btn-text" href={emailHref}>
              <Mail size={17} /> {p.emailBtn}
            </a>
          </div>
          <p className="copy-status" aria-live="polite">
            {copied ? p.copiedStatus : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
