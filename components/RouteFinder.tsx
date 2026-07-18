"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Pencil,
  RotateCcw,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  findStartingRoute,
  getAnswerLabels,
  getCityName,
  type ChoiceOption,
  type RouteFinderAnswers,
  type RouteMatch,
} from "../lib/routeFinder";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import styles from "./RouteFinder.module.css";

type AnswerKey = keyof RouteFinderAnswers;
type FinderView = "questions" | "result";
type EditingMode = "none" | "single" | "all";
export type PlannerStatus = "new" | "in-progress" | "result";

export interface RouteJourney {
  journeyId: string;
  revision: number;
}

interface Question {
  key: AnswerKey;
  eyebrow: string;
  title: string;
  help: string;
  options: readonly ChoiceOption<string>[];
}

export interface RouteFinderProps {
  id?: string;
  locale?: HomegroundLocale;
  variant?: "default" | "hero";
  interactionLocked?: boolean;
  handoff?: ReactNode;
  onRouteFound?: (match: RouteMatch, journey: RouteJourney) => void;
  onRouteCleared?: () => void;
  onStatusChange?: (status: PlannerStatus) => void;
}

const answerKeys: readonly AnswerKey[] = [
  "party",
  "travelStyle",
  "nights",
  "pace",
];

const validAnswerIds: Record<AnswerKey, readonly string[]> = {
  party: ["couple", "family", "parents", "friends", "solo"],
  travelStyle: ["classic", "landscape", "food", "slow", "unsure"],
  nights: ["7", "10", "14", "18"],
  pace: ["gentle", "balanced", "full"],
};

function questionsFor(locale: HomegroundLocale): readonly Question[] {
  const finder = getHomegroundCopy(locale).finder;

  return answerKeys.map((key) => ({
    key,
    ...finder.questions[key],
    options: finder.options[key] as readonly ChoiceOption<string>[],
  }));
}

type PlannerEventName =
  | "planner_started"
  | "planner_step_completed"
  | "planner_result_viewed"
  | "planner_result_revised";

const sessionStorageKey = "homeground-route-finder-v1";

function trackPlannerEvent(
  name: PlannerEventName,
  parameters: Record<string, string | number | boolean> = {},
) {
  const analyticsWindow = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      command: "event",
      eventName: PlannerEventName,
      eventParameters: Record<string, string | number | boolean>,
    ) => void;
  };

  if (analyticsWindow.gtag) {
    analyticsWindow.gtag("event", name, parameters);
    return;
  }

  analyticsWindow.dataLayer ??= [];
  analyticsWindow.dataLayer.push({ event: name, ...parameters });
}

function hasAllAnswers(
  answers: Partial<RouteFinderAnswers>,
): answers is RouteFinderAnswers {
  return answerKeys.every((key) => Boolean(answers[key]));
}

function restoreAnswers(value: unknown): Partial<RouteFinderAnswers> {
  if (!value || typeof value !== "object") return {};

  const candidate = value as Record<string, unknown>;
  return answerKeys.reduce<Partial<RouteFinderAnswers>>((restored, key) => {
    const storedValue = candidate[key];
    if (
      typeof storedValue === "string" &&
      validAnswerIds[key].includes(storedValue)
    ) {
      Object.assign(restored, { [key]: storedValue });
    }
    return restored;
  }, {});
}

export function RouteFinder({
  id = "route-finder",
  locale = "en",
  variant = "default",
  interactionLocked = false,
  handoff,
  onRouteFound,
  onRouteCleared,
  onStatusChange,
}: RouteFinderProps) {
  const copy = getHomegroundCopy(locale);
  const questions = questionsFor(locale);
  const [answers, setAnswers] = useState<Partial<RouteFinderAnswers>>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [view, setView] = useState<FinderView>("questions");
  const [match, setMatch] = useState<RouteMatch | null>(null);
  const [journey, setJourney] = useState<RouteJourney | null>(null);
  const [editingMode, setEditingMode] = useState<EditingMode>("none");
  const [sessionReady, setSessionReady] = useState(false);
  const answersBeforeEdit = useRef<Partial<RouteFinderAnswers> | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const hasMounted = useRef(false);
  const hasTrackedStart = useRef(false);
  const hasShownResult = useRef(false);

  const question = questions[stepIndex];
  const currentAnswer = answers[question.key];

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(sessionStorageKey);
      const parsed = stored
        ? (JSON.parse(stored) as {
            answers?: unknown;
            answersBeforeEdit?: unknown;
            editingMode?: unknown;
            journey?: unknown;
            stepIndex?: unknown;
            view?: unknown;
          })
        : null;
      const restored = restoreAnswers(parsed?.answers);
      const restoredBeforeEdit = restoreAnswers(parsed?.answersBeforeEdit);
      const restoredJourney =
        parsed?.journey &&
        typeof parsed.journey === "object" &&
        typeof (parsed.journey as RouteJourney).journeyId === "string" &&
        Number.isInteger((parsed.journey as RouteJourney).revision) &&
        (parsed.journey as RouteJourney).revision > 0
          ? (parsed.journey as RouteJourney)
          : null;
      const answeredCount = Object.keys(restored).length;

      if (answeredCount > 0) {
        setAnswers(restored);
        hasTrackedStart.current = true;
      }

      if (hasAllAnswers(restored) && parsed?.view === "result") {
        const restoredMatch = findStartingRoute(restored, locale);
        const activeJourney =
          restoredJourney ?? {
            journeyId: window.crypto.randomUUID(),
            revision: 1,
          };
        setMatch(restoredMatch);
        setJourney(activeJourney);
        setView("result");
        hasShownResult.current = true;
        onStatusChange?.("result");
        onRouteFound?.(restoredMatch, activeJourney);
      } else if (answeredCount > 0) {
        const firstUnanswered = questions.findIndex(
          (item) => !restored[item.key],
        );
        const savedStep =
          typeof parsed?.stepIndex === "number" &&
          parsed.stepIndex >= 0 &&
          parsed.stepIndex < questions.length
            ? parsed.stepIndex
            : firstUnanswered >= 0
              ? firstUnanswered
              : 0;
        const savedEditingMode =
          parsed?.editingMode === "single" || parsed?.editingMode === "all"
            ? parsed.editingMode
            : "none";
        setStepIndex(savedStep);
        setEditingMode(savedEditingMode);
        if (Object.keys(restoredBeforeEdit).length > 0) {
          answersBeforeEdit.current = restoredBeforeEdit;
          if (restoredJourney) setJourney(restoredJourney);
          if (hasAllAnswers(restoredBeforeEdit)) {
            const previousMatch = findStartingRoute(
              restoredBeforeEdit,
              locale,
            );
            setMatch(previousMatch);
            hasShownResult.current = true;
          }
        }
        onStatusChange?.("in-progress");
      } else {
        onStatusChange?.("new");
      }
    } catch {
      window.sessionStorage.removeItem(sessionStorageKey);
      onStatusChange?.("new");
    } finally {
      setSessionReady(true);
    }
  }, [locale, onRouteFound, onStatusChange]);

  useEffect(() => {
    if (!sessionReady) return;
    window.sessionStorage.setItem(
      sessionStorageKey,
      JSON.stringify({
        answers,
        answersBeforeEdit: answersBeforeEdit.current,
        editingMode,
        journey,
        stepIndex,
        view,
      }),
    );
  }, [answers, editingMode, journey, sessionReady, stepIndex, view]);

  useEffect(() => {
    if (!sessionReady) return;

    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      if (view === "result") {
        resultHeadingRef.current?.focus();
      } else {
        headingRef.current?.focus();
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [sessionReady, stepIndex, view]);

  const answerSummary = useMemo(() => {
    if (!hasAllAnswers(answers)) return [];

    const labels = getAnswerLabels(answers, locale);
    return [
      {
        label: copy.finder.answerLabels.party,
        value: labels.party,
        step: 0,
      },
      {
        label: copy.finder.answerLabels.travelStyle,
        value: labels.travelStyle,
        step: 1,
      },
      {
        label: copy.finder.answerLabels.nights,
        value: labels.nights,
        step: 2,
      },
      {
        label: copy.finder.answerLabels.pace,
        value: labels.pace,
        step: 3,
      },
    ];
  }, [answers, copy, locale]);

  const showResult = (completeAnswers: RouteFinderAnswers) => {
    const nextMatch = findStartingRoute(completeAnswers, locale);
    const nextJourney = journey
      ? {
          journeyId: journey.journeyId,
          revision: journey.revision + 1,
        }
      : {
          journeyId: window.crypto.randomUUID(),
          revision: 1,
        };
    setMatch(nextMatch);
    setJourney(nextJourney);
    setView("result");
    setEditingMode("none");
    answersBeforeEdit.current = null;
    const resultEvent = hasShownResult.current
      ? "planner_result_revised"
      : "planner_result_viewed";
    trackPlannerEvent(resultEvent, {
      route_id: nextMatch.routeId,
      rule_version: nextMatch.ruleVersion,
      route_family: nextMatch.familyId,
      total_nights: nextMatch.totalNights,
      between_city_moves: nextMatch.betweenCityMoves,
      page_language: locale,
    });
    hasShownResult.current = true;
    onStatusChange?.("result");
    onRouteFound?.(nextMatch, nextJourney);
  };

  const selectAnswer = (key: AnswerKey, value: string) => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackPlannerEvent("planner_started", { page_language: locale });
    }
    onStatusChange?.("in-progress");
    setAnswers((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentAnswer) return;

    trackPlannerEvent("planner_step_completed", {
      question: question.key,
      step: stepIndex + 1,
      editing: editingMode !== "none",
      page_language: locale,
    });

    if (editingMode === "single" || stepIndex === questions.length - 1) {
      if (hasAllAnswers(answers)) showResult(answers);
      return;
    }

    setStepIndex((current) => current + 1);
  };

  const handleBack = () => {
    if (editingMode === "single" || (editingMode === "all" && stepIndex === 0)) {
      if (answersBeforeEdit.current) {
        const previousAnswers = answersBeforeEdit.current;
        setAnswers(previousAnswers);
        if (hasAllAnswers(previousAnswers)) {
          const previousMatch = findStartingRoute(previousAnswers, locale);
          setMatch(previousMatch);
          if (journey) onRouteFound?.(previousMatch, journey);
        }
      }
      answersBeforeEdit.current = null;
      setEditingMode("none");
      setView("result");
      onStatusChange?.("result");
      return;
    }

    setStepIndex((current) => Math.max(0, current - 1));
  };

  const editAnswer = (index: number) => {
    answersBeforeEdit.current = { ...answers };
    setEditingMode("single");
    setStepIndex(index);
    setView("questions");
    onStatusChange?.("in-progress");
  };

  const editAllAnswers = () => {
    answersBeforeEdit.current = { ...answers };
    setEditingMode("all");
    setStepIndex(0);
    setView("questions");
    onStatusChange?.("in-progress");
  };

  const restart = () => {
    answersBeforeEdit.current = null;
    setAnswers({});
    setMatch(null);
    setJourney(null);
    setEditingMode("none");
    setStepIndex(0);
    setView("questions");
    hasTrackedStart.current = false;
    hasShownResult.current = false;
    window.sessionStorage.removeItem(sessionStorageKey);
    onRouteCleared?.();
    onStatusChange?.("new");
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`${styles.finder} ${
        variant === "hero" ? styles.heroVariant : ""
      } ${locale === "zh" ? styles.zhLocale : ""} ${
        locale === "ko" ? styles.koLocale : ""
      }`}
    >
      {variant === "hero" && (
        <h2 className={styles.visuallyHidden} id={`${id}-title`}>
          {copy.finder.hiddenTitle}
        </h2>
      )}
      {variant === "default" && (
        <header className={styles.intro}>
          <p className={styles.kicker}>{copy.finder.introEyebrow}</p>
          <h2 id={`${id}-title`}>{copy.finder.introTitle}</h2>
          <p>{copy.finder.introBody}</p>
        </header>
      )}

      <div className={styles.card}>
        {view === "questions" ? (
          <form onSubmit={handleSubmit}>
            <div className={styles.progressBlock}>
              <p id={`${id}-progress`}>
                {copy.finder.progress(stepIndex + 1, questions.length)}
              </p>
              <progress
                aria-labelledby={`${id}-progress`}
                max={questions.length}
                value={stepIndex + 1}
              />
            </div>

            <fieldset
              className={styles.question}
              aria-describedby={`${id}-${question.key}-help`}
            >
              <legend>
                <span className={styles.questionEyebrow}>
                  {question.eyebrow}
                </span>
                <span
                  ref={headingRef}
                  tabIndex={-1}
                  className={styles.questionTitle}
                >
                  {question.title}
                </span>
              </legend>
              <p
                id={`${id}-${question.key}-help`}
                className={styles.questionHelp}
              >
                {question.help}
              </p>

              <div className={styles.options}>
                {question.options.map((option, optionIndex) => {
                  const optionId = `${id}-${question.key}-${option.id}`;
                  const selected = currentAnswer === option.id;

                  return (
                    <label
                      className={`${styles.option} ${
                        selected ? styles.optionSelected : ""
                      }`}
                      htmlFor={optionId}
                      key={option.id}
                    >
                      <input
                        checked={selected}
                        disabled={interactionLocked}
                        id={optionId}
                        name={`${id}-${question.key}`}
                        onChange={() => selectAnswer(question.key, option.id)}
                        required={optionIndex === 0}
                        type="radio"
                        value={option.id}
                      />
                      <span className={styles.optionMark} aria-hidden="true">
                        {selected && <Check size={15} strokeWidth={2.5} />}
                      </span>
                      <span>
                        <strong>{option.label}</strong>
                        <small>{option.description}</small>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className={styles.formActions}>
              {(stepIndex > 0 || editingMode !== "none") && (
                <button
                  className={styles.secondaryButton}
                  disabled={interactionLocked}
                  onClick={handleBack}
                  type="button"
                >
                  <ArrowLeft aria-hidden="true" size={17} />
                  {editingMode === "single" ||
                  (editingMode === "all" && stepIndex === 0)
                    ? copy.finder.cancelEdits
                    : copy.finder.back}
                </button>
              )}
              <button
                className={styles.primaryButton}
                disabled={interactionLocked}
                type="submit"
              >
                {editingMode === "single" ||
                stepIndex === questions.length - 1
                  ? copy.finder.showRoute
                  : copy.finder.continue}
                <ArrowRight aria-hidden="true" size={17} />
              </button>
            </div>
          </form>
        ) : (
          match && (
            <div className={styles.result}>
              <p className={styles.kicker}>{copy.finder.resultKicker}</p>
              <h3 ref={resultHeadingRef} tabIndex={-1}>
                {match.title}
              </h3>
              <p className={styles.resultLead}>{match.summary}</p>

              <ol
                className={styles.route}
                aria-label={copy.finder.routeAriaLabel}
              >
                {match.cityNights.map((stop, index) => (
                  <li key={`${stop.city}-${index}`}>
                    <span>
                      <strong>{getCityName(stop.city, locale)}</strong>
                      <small>{copy.finder.nights(stop.nights)}</small>
                    </span>
                    {index < match.cityNights.length - 1 && (
                      <ArrowRight aria-hidden="true" size={16} />
                    )}
                  </li>
                ))}
              </ol>

              <p className={styles.routeMeta}>
                <strong>{copy.finder.totalNights(match.totalNights)}</strong>
                <span aria-hidden="true">·</span>
                <span>{copy.finder.moves(match.betweenCityMoves)}</span>
                <small>{copy.finder.transferNote}</small>
              </p>

              <div className={styles.reasonGrid}>
                <div>
                  <h4>{copy.finder.whyTitle}</h4>
                  <ol>
                    {match.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4>{copy.finder.omittedTitle}</h4>
                  <p>{match.tradeoff}</p>
                </div>
              </div>

              <p className={styles.scopeNote}>
                {copy.finder.scopeNote}
              </p>
            </div>
          )
        )}

        {handoff}

        {view === "result" && match && (
          <div className={styles.result}>
            <div className={styles.assumptions}>
              <h4>{copy.finder.assumptionsTitle}</h4>
              <ul>
                {match.assumptions.map((assumption) => (
                  <li key={assumption}>{assumption}</li>
                ))}
              </ul>
            </div>

            <div className={styles.answerReview}>
              <div className={styles.reviewHeading}>
                <h4>{copy.finder.answersTitle}</h4>
                <button
                  disabled={interactionLocked}
                  type="button"
                  onClick={editAllAnswers}
                >
                  <Pencil aria-hidden="true" size={15} />
                  {copy.finder.editAll}
                </button>
              </div>
              <dl>
                {answerSummary.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                    <button
                      aria-label={copy.finder.changeAria(item.label)}
                      disabled={interactionLocked}
                      onClick={() => editAnswer(item.step)}
                      type="button"
                    >
                      {copy.finder.change}
                    </button>
                  </div>
                ))}
              </dl>
            </div>

            <button
              className={styles.restartButton}
              disabled={interactionLocked}
              onClick={restart}
              type="button"
            >
              <RotateCcw aria-hidden="true" size={16} />
              {copy.finder.restart}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
