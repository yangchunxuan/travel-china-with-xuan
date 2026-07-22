"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Pencil,
  RotateCcw,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  createDestinationPlan,
  destinationIds,
  type DestinationId,
  type DestinationPlan,
  type DestinationPlannerAnswers,
  type DestinationPlannerPartyId,
  type DestinationPaceId,
} from "../lib/destinationPlanner";
import {
  getDestinationNames,
  getDestinationPlannerCopy,
} from "../lib/destinationPlannerI18n";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import type { RouteServiceInterest } from "../lib/routeServiceInterest";
import styles from "./RouteFinder.module.css";

type QuestionKey = "destinations" | "nights" | "party" | "pace";
type FinderView = "questions" | "result";
export type PlannerStatus = "new" | "in-progress" | "result";
type PlannerHistoryView = QuestionKey | "result";

interface PlannerHistoryState {
  homegroundPlanner: PlannerHistoryView;
  homegroundPlannerFlowId: string;
  homegroundPlannerDepth: number;
}

export interface RouteJourney {
  journeyId: string;
  revision: number;
}

interface PlannerDraft {
  destinationMode: "wishlist" | "classic-start";
  selectedDestinationIds: DestinationId[];
  otherEnabled: boolean;
  otherPlace: string;
  nightsChoice: "" | "7" | "10" | "14" | "18" | "custom";
  customNights: string;
  party: DestinationPlannerPartyId | "";
  pace: DestinationPaceId | "";
  mustSeeIds: DestinationId[];
}

interface StoredPlannerSession {
  draft?: unknown;
  journey?: unknown;
  view?: unknown;
  stepIndex?: unknown;
}

export interface RouteFinderProps {
  id?: string;
  locale?: HomegroundLocale;
  variant?: "default" | "hero";
  serviceInterest?: RouteServiceInterest | null;
  interactionLocked?: boolean;
  contactDraftDirty?: boolean;
  handoff?: ReactNode;
  onRouteFound?: (match: DestinationPlan, journey: RouteJourney) => void;
  onRouteCleared?: () => void;
  onStatusChange?: (status: PlannerStatus) => void;
}

type PlannerEventName =
  | "planner_started"
  | "planner_step_completed"
  | "planner_result_viewed"
  | "planner_result_revised";

const questions: readonly QuestionKey[] = [
  "destinations",
  "nights",
  "party",
  "pace",
];
const presetNights = ["7", "10", "14", "18"] as const;
const sessionStorageKey = "homeground-destination-planner-v3";
const startFocusStorageKey = `${sessionStorageKey}:focus-start`;
const plannerQueryKey = "planner";
const destinationsQueryKey = "destinations";
const unsafeInlineControlCharacters =
  /[\u0000-\u001f\u007f\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/gu;

const emptyDraft: PlannerDraft = {
  destinationMode: "wishlist",
  selectedDestinationIds: [],
  otherEnabled: false,
  otherPlace: "",
  nightsChoice: "",
  customNights: "",
  party: "",
  pace: "",
  mustSeeIds: [],
};

function readStoredPlannerSession(): StoredPlannerSession | null {
  try {
    const raw = window.sessionStorage.getItem(sessionStorageKey);
    return raw ? (JSON.parse(raw) as StoredPlannerSession) : null;
  } catch {
    try {
      window.sessionStorage.removeItem(sessionStorageKey);
    } catch {
      // Storage can be unavailable; the URL seed must still remain usable.
    }
    return null;
  }
}

function sanitizeOtherPlace(value: string): string {
  return value
    .normalize("NFC")
    .replace(unsafeInlineControlCharacters, "")
    .slice(0, 120);
}

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

function isDestinationId(value: unknown): value is DestinationId {
  return (
    typeof value === "string" &&
    destinationIds.includes(value as DestinationId)
  );
}

function restoreDraft(value: unknown): PlannerDraft {
  if (!value || typeof value !== "object") return emptyDraft;
  const candidate = value as Partial<Record<keyof PlannerDraft, unknown>>;
  const storedDestinationIds = Array.isArray(
    candidate.selectedDestinationIds,
  )
    ? candidate.selectedDestinationIds
    : [];
  const storedMustSeeIds = Array.isArray(candidate.mustSeeIds)
    ? candidate.mustSeeIds
    : [];
  const selectedDestinationIds = storedDestinationIds.length > 0
    ? destinationIds.filter((id) =>
        storedDestinationIds.includes(id),
      )
    : [];
  const mustSeeIds = storedMustSeeIds.length > 0
    ? destinationIds.filter(
        (id) =>
          storedMustSeeIds.includes(id) &&
          selectedDestinationIds.includes(id),
      )
    : [];
  const nightsChoice =
    candidate.nightsChoice === "custom" ||
    presetNights.includes(
      candidate.nightsChoice as (typeof presetNights)[number],
    )
      ? (candidate.nightsChoice as PlannerDraft["nightsChoice"])
      : "";
  const partyOptions: readonly DestinationPlannerPartyId[] = [
    "solo",
    "two-adults",
    "family-with-children",
    "older-relatives",
    "multigenerational-family",
    "friends-private-group",
  ];
  const paceOptions: readonly DestinationPaceId[] = [
    "essentials",
    "classic",
    "unhurried",
  ];

  return {
    destinationMode:
      candidate.destinationMode === "classic-start"
        ? "classic-start"
        : "wishlist",
    selectedDestinationIds,
    otherEnabled:
      candidate.destinationMode === "classic-start"
        ? false
        : candidate.otherEnabled === true,
    otherPlace:
      candidate.destinationMode === "classic-start" ||
      typeof candidate.otherPlace !== "string"
        ? ""
        : sanitizeOtherPlace(candidate.otherPlace),
    nightsChoice,
    customNights:
      typeof candidate.customNights === "string"
        ? candidate.customNights.slice(0, 2)
        : "",
    party: partyOptions.includes(
      candidate.party as DestinationPlannerPartyId,
    )
      ? (candidate.party as DestinationPlannerPartyId)
      : "",
    pace: paceOptions.includes(candidate.pace as DestinationPaceId)
      ? (candidate.pace as DestinationPaceId)
      : "",
    mustSeeIds,
  };
}

function draftNights(draft: PlannerDraft): number | null {
  const raw =
    draft.nightsChoice === "custom"
      ? draft.customNights
      : draft.nightsChoice;
  if (!raw || !/^[0-9]+$/u.test(raw)) return null;
  const value = Number.parseInt(raw, 10);
  return Number.isSafeInteger(value) && value >= 1 && value <= 60
    ? value
    : null;
}

function completeAnswers(
  draft: PlannerDraft,
): DestinationPlannerAnswers | null {
  const totalNights = draftNights(draft);
  if (!totalNights || !draft.party || !draft.pace) return null;
  if (
    draft.destinationMode === "wishlist" &&
    draft.selectedDestinationIds.length === 0 &&
    !draft.otherEnabled
  ) {
    return null;
  }
  if (
    draft.destinationMode === "wishlist" &&
    draft.otherEnabled &&
    draft.otherPlace.trim().length === 0
  ) {
    return null;
  }

  return {
    destinationMode: draft.destinationMode,
    destinationIds:
      draft.destinationMode === "classic-start"
        ? []
        : draft.selectedDestinationIds,
    otherPlace:
      draft.destinationMode === "wishlist" && draft.otherEnabled
        ? sanitizeOtherPlace(draft.otherPlace).trim()
        : null,
    totalNights,
    party: draft.party,
    pace: draft.pace,
    mustSeeIds:
      draft.destinationMode === "wishlist" ? draft.mustSeeIds : [],
  };
}

function plannerUrl(value: QuestionKey | "result"): string {
  const url = new URL(window.location.href);
  url.searchParams.set(plannerQueryKey, value);
  url.hash = "route-finder";
  return `${url.pathname}${url.search}${url.hash}`;
}

function stepFromUrl(): number | "result" | null {
  const value = new URL(window.location.href).searchParams.get(
    plannerQueryKey,
  );
  if (value === "result") return "result";
  const index = questions.indexOf(value as QuestionKey);
  return index >= 0 ? index : null;
}

function destinationsFromUrl(): DestinationId[] | null {
  const values = new URL(window.location.href)
    .searchParams
    .getAll(destinationsQueryKey)
    .flatMap((value) => value.split(","));
  const selected = destinationIds.filter((id) => values.includes(id));

  return selected.length > 0 ? selected : null;
}

function hasDestinationsQuery(): boolean {
  return new URL(window.location.href).searchParams.has(
    destinationsQueryKey,
  );
}

function clearDestinationsQuery(): void {
  const url = new URL(window.location.href);
  url.searchParams.delete(destinationsQueryKey);
  window.history.replaceState(
    window.history.state,
    "",
    `${url.pathname}${url.search}${url.hash}`,
  );
}

function applyLinkedDestinations(
  draft: PlannerDraft,
  selectedDestinationIds: DestinationId[],
): PlannerDraft {
  return {
    ...draft,
    destinationMode: "wishlist",
    selectedDestinationIds,
    otherEnabled: false,
    otherPlace: "",
    mustSeeIds: [],
  };
}

function readPlannerHistoryState(
  value: unknown,
): PlannerHistoryState | null {
  if (!value || typeof value !== "object") return null;
  const state = value as Partial<PlannerHistoryState>;
  const validView =
    state.homegroundPlanner === "result" ||
    questions.includes(state.homegroundPlanner as QuestionKey);
  if (
    !validView ||
    typeof state.homegroundPlannerFlowId !== "string" ||
    state.homegroundPlannerFlowId.length === 0 ||
    !Number.isInteger(state.homegroundPlannerDepth) ||
    (state.homegroundPlannerDepth ?? -1) < 0
  ) {
    return null;
  }
  return state as PlannerHistoryState;
}

function plannerHistoryState(
  view: PlannerHistoryView,
  flowId: string,
  depth: number,
): PlannerHistoryState {
  return {
    homegroundPlanner: view,
    homegroundPlannerFlowId: flowId,
    homegroundPlannerDepth: depth,
  };
}

function firstIncompleteStep(draft: PlannerDraft): number {
  const hasDestinations =
    draft.destinationMode === "classic-start" ||
    draft.selectedDestinationIds.length > 0 ||
    (draft.otherEnabled && draft.otherPlace.trim().length > 0);
  if (!hasDestinations) return 0;
  if (draftNights(draft) === null) return 1;
  if (!draft.party) return 2;
  if (!draft.pace) return 3;
  return questions.length;
}

export function RouteFinder({
  id = "route-finder",
  locale = "en",
  variant = "default",
  serviceInterest = null,
  interactionLocked = false,
  contactDraftDirty = false,
  handoff,
  onRouteFound,
  onRouteCleared,
  onStatusChange,
}: RouteFinderProps) {
  const copy = getDestinationPlannerCopy(locale);
  const [draft, setDraft] = useState<PlannerDraft>(emptyDraft);
  const [stepIndex, setStepIndex] = useState(0);
  const [view, setView] = useState<FinderView>("questions");
  const [match, setMatch] = useState<DestinationPlan | null>(null);
  const [journey, setJourney] = useState<RouteJourney | null>(null);
  const [questionError, setQuestionError] = useState("");
  const [mustSeeMessage, setMustSeeMessage] = useState("");
  const [sessionReady, setSessionReady] = useState(false);
  const [historyFocusRequest, setHistoryFocusRequest] = useState(0);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const otherPlaceRef = useRef<HTMLInputElement | null>(null);
  const customNightsRef = useRef<HTMLInputElement | null>(null);
  const hasTrackedStart = useRef(false);
  const hasMounted = useRef(false);
  const plannerFlowIdRef = useRef("");
  const plannerDepthRef = useRef(0);
  const pendingHistoryResetFlowIdRef = useRef<string | null>(null);
  const pendingHistoryFocusRef = useRef(false);
  const pendingStartRevealRef = useRef(false);
  const focusStartOnMountRef = useRef(false);
  const pendingScrollPositionRef = useRef<{
    left: number;
    top: number;
  } | null>(null);

  const questionKey = questions[stepIndex];
  const questionCopy = copy.questions[questionKey];
  const questionHelpId = `${id}-${questionKey}-help`;
  const questionErrorId = `${id}-${questionKey}-error`;
  const totalNights = draftNights(draft);

  const emitResult = useCallback(
    (
      answers: DestinationPlannerAnswers,
      nextJourney: RouteJourney,
      eventName: "planner_result_viewed" | "planner_result_revised",
    ) => {
      const nextMatch = createDestinationPlan(answers);
      setMatch(nextMatch);
      setJourney(nextJourney);
      setView("result");
      setQuestionError("");
      onStatusChange?.("result");
      onRouteFound?.(nextMatch, nextJourney);
      trackPlannerEvent(eventName, {
        page_language: locale,
        destination_count: answers.destinationIds.length,
        has_other_place: Boolean(answers.otherPlace),
        destination_mode: answers.destinationMode,
        timing_status: nextMatch.timing.status,
        total_nights: answers.totalNights,
      });
    },
    [locale, onRouteFound, onStatusChange],
  );

  useEffect(() => {
    try {
      focusStartOnMountRef.current =
        window.sessionStorage.getItem(startFocusStorageKey) === "true";
      const parsed = readStoredPlannerSession();
      const storedDraft = restoreDraft(parsed?.draft);
      const storedJourney =
        parsed?.journey &&
        typeof parsed.journey === "object" &&
        typeof (parsed.journey as RouteJourney).journeyId === "string" &&
        Number.isInteger((parsed.journey as RouteJourney).revision)
          ? (parsed.journey as RouteJourney)
          : null;
      const linkedDestinationIds = destinationsFromUrl();
      const arrivedWithDestinationQuery = hasDestinationsQuery();
      const restoredDraft = linkedDestinationIds
        ? applyLinkedDestinations(storedDraft, linkedDestinationIds)
        : arrivedWithDestinationQuery
          ? emptyDraft
          : storedDraft;
      const restoredJourney = arrivedWithDestinationQuery
        ? null
        : storedJourney;
      const urlState = stepFromUrl();
      const restoredAnswers = completeAnswers(restoredDraft);
      const canRestoreResult =
        urlState === "result" &&
        restoredAnswers !== null &&
        restoredJourney !== null;
      const savedStep =
        typeof parsed?.stepIndex === "number" &&
        parsed.stepIndex >= 0 &&
        parsed.stepIndex < questions.length
          ? parsed.stepIndex
          : 0;
      const requestedStep = arrivedWithDestinationQuery
        ? 0
        : typeof urlState === "number"
          ? urlState
          : savedStep;
      const nextStep = Math.min(
        requestedStep,
        firstIncompleteStep(restoredDraft),
      );
      const historyView: PlannerHistoryView = canRestoreResult
        ? "result"
        : questions[nextStep];
      const existingHistory = readPlannerHistoryState(
        window.history.state,
      );

      if (
        existingHistory &&
        existingHistory.homegroundPlanner === historyView
      ) {
        plannerFlowIdRef.current =
          existingHistory.homegroundPlannerFlowId;
        plannerDepthRef.current =
          existingHistory.homegroundPlannerDepth;
      } else {
        const flowId = window.crypto.randomUUID();
        plannerFlowIdRef.current = flowId;
        plannerDepthRef.current = 0;
        window.history.replaceState(
          plannerHistoryState(historyView, flowId, 0),
          "",
          plannerUrl(historyView),
        );
      }

      setDraft(restoredDraft);
      if (restoredJourney) setJourney(restoredJourney);

      if (canRestoreResult) {
        emitResult(
          restoredAnswers!,
          restoredJourney!,
          "planner_result_viewed",
        );
      } else {
        setStepIndex(nextStep);
        setView("questions");
        onStatusChange?.(
          nextStep > 0 ||
            restoredDraft.selectedDestinationIds.length > 0 ||
            restoredDraft.destinationMode === "classic-start" ||
            restoredDraft.otherEnabled
            ? "in-progress"
            : "new",
        );
        if (
          urlState === "result" ||
          (typeof urlState === "number" && urlState !== nextStep)
        ) {
          window.history.replaceState(
            plannerHistoryState(
              questions[nextStep],
              plannerFlowIdRef.current,
              plannerDepthRef.current,
            ),
            "",
            plannerUrl(questions[nextStep]),
          );
        }
      }
    } catch {
      window.sessionStorage.removeItem(sessionStorageKey);
    } finally {
      setSessionReady(true);
    }
  }, [emitResult, onStatusChange]);

  useEffect(() => {
    if (!sessionReady || !hasDestinationsQuery()) return;
    clearDestinationsQuery();
  }, [sessionReady]);

  useEffect(() => {
    if (!sessionReady) return;
    window.sessionStorage.setItem(
      sessionStorageKey,
      JSON.stringify({ draft, journey, stepIndex, view }),
    );
  }, [draft, journey, sessionReady, stepIndex, view]);

  useEffect(() => {
    if (!sessionReady) return;
    const handlePopState = (event: PopStateEvent) => {
      pendingHistoryFocusRef.current = true;
      setHistoryFocusRequest((request) => request + 1);
      const pendingFlowId = pendingHistoryResetFlowIdRef.current;
      if (pendingFlowId) {
        pendingHistoryResetFlowIdRef.current = null;
        plannerFlowIdRef.current = pendingFlowId;
        plannerDepthRef.current = 0;
        setStepIndex(0);
        setView("questions");
        setQuestionError("");
        onStatusChange?.("new");
        window.history.replaceState(
          plannerHistoryState(questions[0], pendingFlowId, 0),
          "",
          plannerUrl(questions[0]),
        );
        return;
      }

      const historyState = readPlannerHistoryState(event.state);
      if (
        !historyState ||
        historyState.homegroundPlannerFlowId !==
          plannerFlowIdRef.current
      ) {
        const flowId = window.crypto.randomUUID();
        plannerFlowIdRef.current = flowId;
        plannerDepthRef.current = 0;
        setStepIndex(0);
        setView("questions");
        setQuestionError("");
        onStatusChange?.("new");
        window.history.replaceState(
          plannerHistoryState(questions[0], flowId, 0),
          "",
          plannerUrl(questions[0]),
        );
        return;
      }

      plannerDepthRef.current =
        historyState.homegroundPlannerDepth;
      const urlState = stepFromUrl();
      if (urlState === "result") {
        const answers = completeAnswers(draft);
        if (answers && journey) {
          const restoredMatch = createDestinationPlan(answers);
          setMatch(restoredMatch);
          setView("result");
          onStatusChange?.("result");
          onRouteFound?.(restoredMatch, journey);
          return;
        }
      }

      const nextStep =
        typeof urlState === "number" ? urlState : 0;
      const allowedStep = Math.min(nextStep, firstIncompleteStep(draft));
      setStepIndex(allowedStep);
      setView("questions");
      setQuestionError("");
      onStatusChange?.(allowedStep === 0 ? "new" : "in-progress");
      if (allowedStep !== nextStep || urlState === "result") {
        window.history.replaceState(
          plannerHistoryState(
            questions[allowedStep],
            plannerFlowIdRef.current,
            plannerDepthRef.current,
          ),
          "",
          plannerUrl(questions[allowedStep]),
        );
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [draft, journey, onRouteFound, onStatusChange, sessionReady]);

  useLayoutEffect(() => {
    if (!sessionReady) return;
    const target =
      view === "result" ? resultHeadingRef.current : headingRef.current;
    if (!hasMounted.current) {
      hasMounted.current = true;
      if (!focusStartOnMountRef.current) return;
    }
    if (!target) return;
    target.focus({ preventScroll: true });
    const pendingScrollPosition = pendingScrollPositionRef.current;
    if (pendingScrollPosition) {
      window.scrollTo(
        pendingScrollPosition.left,
        pendingScrollPosition.top,
      );
      pendingScrollPositionRef.current = null;
    }
    if (
      pendingStartRevealRef.current &&
      view === "questions" &&
      stepIndex === 0
    ) {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
      pendingStartRevealRef.current = false;
    }
  }, [id, sessionReady, stepIndex, view]);

  useEffect(() => {
    if (!sessionReady || !focusStartOnMountRef.current) return;
    headingRef.current?.focus({ preventScroll: true });
    focusStartOnMountRef.current = false;
    window.sessionStorage.removeItem(startFocusStorageKey);
  }, [sessionReady]);

  useEffect(() => {
    if (!sessionReady || !pendingHistoryFocusRef.current) return;
    const target =
      view === "result" ? resultHeadingRef.current : headingRef.current;
    const frame = window.requestAnimationFrame(() => {
      target?.focus({ preventScroll: true });
      pendingHistoryFocusRef.current = false;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [historyFocusRequest, sessionReady, stepIndex, view]);

  const updateDraft = (next: PlannerDraft) => {
    setDraft(next);
    setQuestionError("");
    setMustSeeMessage("");
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackPlannerEvent("planner_started", { page_language: locale });
    }
    onStatusChange?.("in-progress");
  };

  const pushPlannerHistory = (nextView: PlannerHistoryView) => {
    const flowId =
      plannerFlowIdRef.current || window.crypto.randomUUID();
    const nextDepth = plannerDepthRef.current + 1;
    plannerFlowIdRef.current = flowId;
    plannerDepthRef.current = nextDepth;
    window.history.pushState(
      plannerHistoryState(nextView, flowId, nextDepth),
      "",
      plannerUrl(nextView),
    );
  };

  const returnPlannerHistoryToStart = () => {
    const currentHistory = readPlannerHistoryState(
      window.history.state,
    );
    const nextFlowId = window.crypto.randomUUID();
    if (
      currentHistory &&
      currentHistory.homegroundPlannerFlowId ===
        plannerFlowIdRef.current &&
      currentHistory.homegroundPlannerDepth > 0
    ) {
      pendingHistoryResetFlowIdRef.current = nextFlowId;
      window.sessionStorage.setItem(startFocusStorageKey, "true");
      window.addEventListener(
        "popstate",
        () => {
          pendingHistoryFocusRef.current = true;
          setHistoryFocusRequest((request) => request + 1);
          window.setTimeout(() => {
            window.sessionStorage.removeItem(startFocusStorageKey);
          }, 2000);
        },
        { once: true },
      );
      window.history.go(-currentHistory.homegroundPlannerDepth);
      return;
    }

    plannerFlowIdRef.current = nextFlowId;
    plannerDepthRef.current = 0;
    window.history.replaceState(
      plannerHistoryState(questions[0], nextFlowId, 0),
      "",
      plannerUrl(questions[0]),
    );
  };

  const validateCurrentQuestion = (): string => {
    if (questionKey === "destinations") {
      if (
        draft.destinationMode === "wishlist" &&
        draft.selectedDestinationIds.length === 0 &&
        !draft.otherEnabled
      ) {
        return copy.questions.destinations.error;
      }
      if (
        draft.destinationMode === "wishlist" &&
        draft.otherEnabled &&
        draft.otherPlace.trim().length === 0
      ) {
        return copy.questions.destinations.otherError;
      }
    }
    if (questionKey === "nights" && totalNights === null) {
      return copy.questions.nights.error;
    }
    if (questionKey === "party" && !draft.party) {
      return copy.questions.party.error;
    }
    if (questionKey === "pace" && !draft.pace) {
      return copy.questions.pace.error;
    }
    return "";
  };

  const showResult = () => {
    const answers = completeAnswers(draft);
    if (!answers) return;
    const nextJourney: RouteJourney = journey
      ? { ...journey, revision: journey.revision + 1 }
      : { journeyId: window.crypto.randomUUID(), revision: 1 };
    emitResult(
      answers,
      nextJourney,
      match ? "planner_result_revised" : "planner_result_viewed",
    );
    pushPlannerHistory("result");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validateCurrentQuestion();
    if (error) {
      setQuestionError(error);
      window.requestAnimationFrame(() => {
        if (
          questionKey === "destinations" &&
          draft.otherEnabled &&
          !draft.otherPlace.trim()
        ) {
          otherPlaceRef.current?.focus();
          return;
        }
        if (questionKey === "nights" && draft.nightsChoice === "custom") {
          customNightsRef.current?.focus();
          return;
        }
        headingRef.current?.focus();
      });
      return;
    }

    pendingScrollPositionRef.current = {
      left: window.scrollX,
      top: window.scrollY,
    };

    trackPlannerEvent("planner_step_completed", {
      page_language: locale,
      step: stepIndex + 1,
      question: questionKey,
    });
    if (stepIndex === questions.length - 1) {
      showResult();
      return;
    }

    const nextStep = stepIndex + 1;
    setStepIndex(nextStep);
    setQuestionError("");
    pushPlannerHistory(questions[nextStep]);
  };

  const handleBack = () => {
    if (stepIndex === 0) return;
    window.history.back();
  };

  const confirmDiscardContact = () =>
    !contactDraftDirty || window.confirm(copy.discardContactConfirm);

  const handleEdit = () => {
    if (!confirmDiscardContact()) return;
    pendingStartRevealRef.current = true;
    setView("questions");
    setStepIndex(0);
    setQuestionError("");
    onStatusChange?.("in-progress");
    returnPlannerHistoryToStart();
  };

  const handleRestart = () => {
    if (!confirmDiscardContact()) return;
    pendingStartRevealRef.current = true;
    setDraft(emptyDraft);
    setMatch(null);
    setJourney(null);
    setView("questions");
    setStepIndex(0);
    setQuestionError("");
    setMustSeeMessage("");
    hasTrackedStart.current = false;
    window.sessionStorage.removeItem(sessionStorageKey);
    onRouteCleared?.();
    onStatusChange?.("new");
    returnPlannerHistoryToStart();
  };

  const toggleDestination = (id: DestinationId) => {
    const selected = draft.selectedDestinationIds.includes(id);
    updateDraft({
      ...draft,
      destinationMode: "wishlist",
      selectedDestinationIds: selected
        ? draft.selectedDestinationIds.filter((item) => item !== id)
        : [...draft.selectedDestinationIds, id],
      mustSeeIds: selected
        ? draft.mustSeeIds.filter((item) => item !== id)
        : draft.mustSeeIds,
    });
  };

  const chooseClassicStart = () => {
    const hasWishlist =
      draft.selectedDestinationIds.length > 0 ||
      draft.otherEnabled ||
      draft.otherPlace.trim().length > 0;
    if (
      draft.destinationMode !== "classic-start" &&
      hasWishlist &&
      !window.confirm(copy.questions.destinations.classicStartConfirm)
    ) {
      return;
    }
    updateDraft({
      ...draft,
      destinationMode: "classic-start",
      selectedDestinationIds: [],
      otherEnabled: false,
      otherPlace: "",
      mustSeeIds: [],
    });
  };

  const updateMustSee = (id: DestinationId) => {
    if (interactionLocked || !match || !journey) return;
    const selected = match.answers.mustSeeIds.includes(id);
    if (!selected && match.answers.mustSeeIds.length >= 3) {
      setMustSeeMessage(copy.result.mustSeeLimit);
      return;
    }

    const mustSeeIds = selected
      ? match.answers.mustSeeIds.filter((item) => item !== id)
      : [...match.answers.mustSeeIds, id];
    const answers = { ...match.answers, mustSeeIds };
    const nextMatch = createDestinationPlan(answers);
    const nextJourney = { ...journey, revision: journey.revision + 1 };
    setDraft((current) => ({ ...current, mustSeeIds: [...mustSeeIds] }));
    setMatch(nextMatch);
    setJourney(nextJourney);
    setMustSeeMessage("");
    onRouteFound?.(nextMatch, nextJourney);
  };

  const resultMeta = useMemo(() => {
    if (!match) return null;
    const answerCopy = copy.result.answerLabels;
    return [
      {
        label: answerCopy.nights,
        value: copy.result.nights(match.answers.totalNights),
      },
      {
        label: answerCopy.party,
        value: copy.partyLabels[match.answers.party],
      },
      {
        label: answerCopy.pace,
        value: copy.paceLabels[match.answers.pace],
      },
    ];
  }, [copy, match]);

  const resultBody = useMemo(() => {
    if (!match) return "";
    const timing = match.timing;
    const paceLabel = copy.paceLabels[match.answers.pace];
    if (match.answers.destinationMode === "classic-start") {
      return copy.result.bodies.classicStart;
    }
    if (timing.status === "manual_only") {
      return copy.result.bodies.otherOnly(match.answers.otherPlace ?? "");
    }
    if (timing.status === "partial_manual_check") {
      return copy.result.bodies.partialManual(
        match.answers.otherPlace ?? "",
      );
    }
    if (timing.knownDestinationsStatus === "needs_prioritization") {
      return copy.result.bodies.needsPrioritization(
        timing.essentialsMinimumNights ?? 0,
        timing.totalNights,
        timing.essentialsShortfallNights ?? 0,
      );
    }
    if (
      timing.knownDestinationsStatus ===
      "tighter_than_selected_pace"
    ) {
      return copy.result.bodies.tighterThanPace(
        timing.totalNights,
        paceLabel,
        timing.selectedPaceRange?.minNights ?? 0,
      );
    }
    if (
      timing.knownDestinationsStatus === "within_reference_range"
    ) {
      return copy.result.bodies.withinRange(paceLabel);
    }
    return copy.result.bodies.roomToShape(
      timing.nightsAboveSelectedPaceMax ?? 0,
    );
  }, [copy, match]);

  const resultTitle = match
    ? copy.result.titles[match.timing.status]
    : "";
  const showMustSee =
    Boolean(match) &&
    match?.timing.knownDestinationsStatus === "needs_prioritization" &&
    match.answers.destinationIds.length > 1;
  const hasCompressedCondition =
    Boolean(match) &&
    match?.answers.pace === "essentials" &&
    match.answers.destinationIds.some(
      (id) =>
        id === "zhangjiajie" || id === "hangzhou-suzhou",
    );
  const destinationSelectionReady =
    questionKey === "destinations" &&
    (draft.destinationMode === "classic-start" ||
      (draft.destinationMode === "wishlist" &&
        (draft.selectedDestinationIds.length > 0 || draft.otherEnabled) &&
        (!draft.otherEnabled || draft.otherPlace.trim().length > 0)));
  const selectedDestinationLabels =
    draft.destinationMode === "classic-start"
      ? [copy.questions.destinations.classicStartLabel]
      : [
          ...draft.selectedDestinationIds.map(
            (destinationId) => copy.destinations[destinationId],
          ),
          ...(draft.otherEnabled && draft.otherPlace.trim()
            ? [draft.otherPlace.trim()]
            : []),
        ];
  const selectedDestinationPreview = selectedDestinationLabels.slice(0, 2);
  const remainingDestinationCount = Math.max(
    0,
    selectedDestinationLabels.length - selectedDestinationPreview.length,
  );

  if (!sessionReady) {
    return (
      <section
        id={id}
        className={`${styles.finder} ${
          variant === "hero" ? styles.heroVariant : ""
        }`}
        aria-busy="true"
      >
        <div className={styles.loadingShell} aria-hidden="true" />
      </section>
    );
  }

  return (
    <section
      id={id}
      className={`${styles.finder} ${
        variant === "hero" ? styles.heroVariant : ""
      }`}
      aria-labelledby={`${id}-title`}
    >
      {view === "questions" ? (
        <form
          className={
            destinationSelectionReady ? styles.hasMobileActionDock : undefined
          }
          noValidate
          onSubmit={handleSubmit}
        >
          <div className={styles.progressHeader}>
            <div className={styles.progressRow}>
              <span>
                {copy.progress(stepIndex + 1, questions.length)} ·{" "}
                {copy.stepLabels[questionKey]}
              </span>
              <progress
                value={stepIndex + 1}
                max={questions.length}
                aria-label={copy.progress(stepIndex + 1, questions.length)}
              />
            </div>
            <ol
              className={styles.stepRail}
              aria-label={copy.progress(stepIndex + 1, questions.length)}
            >
              {questions.map((step, index) => (
                <li
                  className={`${styles.stepItem} ${
                    index === stepIndex ? styles.stepActive : ""
                  } ${index < stepIndex ? styles.stepComplete : ""}`}
                  aria-current={index === stepIndex ? "step" : undefined}
                  aria-label={`${index + 1}. ${copy.stepLabels[step]}`}
                  key={step}
                >
                  <span className={styles.stepNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.stepLabel} aria-hidden="true">
                    {copy.stepLabels[step]}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.questionLayout}>
            {serviceInterest && (
              <aside
                className={styles.serviceIntent}
                aria-label="Selected Homeground planning service"
              >
                <span>Planning request</span>
                <strong>
                  {serviceInterest.label} · {serviceInterest.priceLabel}
                </strong>
                <p>{serviceInterest.finderSummary}</p>
              </aside>
            )}
            <div className={styles.questionHeader}>
              <p className={styles.kicker}>{questionCopy.eyebrow}</p>
              <h2 id={`${id}-title`} ref={headingRef} tabIndex={-1}>
                {stepIndex === 0 ? copy.introTitle : questionCopy.title}
              </h2>
              <p id={questionHelpId}>
                {stepIndex === 0 ? copy.introBody : questionCopy.help}
              </p>
            </div>

            <div className={styles.questionBody}>

          {questionKey === "destinations" && (
            <fieldset
              className={styles.fieldset}
              aria-describedby={`${questionHelpId}${
                questionError ? ` ${questionErrorId}` : ""
              }`}
            >
              <legend className={styles.srOnly}>
                {copy.questions.destinations.legend}
              </legend>
              <p className={styles.selectionNote}>
                {copy.questions.destinations.selectionNote}
              </p>
              <div className={styles.destinationGrid}>
                {destinationIds.map((destinationId) => {
                  const selected =
                    draft.destinationMode === "wishlist" &&
                    draft.selectedDestinationIds.includes(destinationId);
                  return (
                    <label
                      className={`${styles.destinationOption} ${
                        selected ? styles.optionSelected : ""
                      }`}
                      key={destinationId}
                    >
                      <input
                        type="checkbox"
                        value={destinationId}
                        checked={selected}
                        onChange={() => toggleDestination(destinationId)}
                      />
                      <span>{copy.destinations[destinationId]}</span>
                      <Check aria-hidden="true" size={17} />
                    </label>
                  );
                })}
              </div>

              <div className={styles.secondaryChoices}>
                <label
                  className={`${styles.secondaryOption} ${
                    draft.destinationMode === "wishlist" &&
                    draft.otherEnabled
                      ? styles.optionSelected
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={
                      draft.destinationMode === "wishlist" &&
                      draft.otherEnabled
                    }
                    onChange={(event) =>
                      updateDraft({
                        ...draft,
                        destinationMode: "wishlist",
                        otherEnabled: event.target.checked,
                        otherPlace: event.target.checked
                          ? draft.otherPlace
                          : "",
                      })
                    }
                  />
                  <span>{copy.questions.destinations.otherToggle}</span>
                </label>
                {draft.destinationMode === "wishlist" &&
                  draft.otherEnabled && (
                    <div className={styles.otherField}>
                      <label htmlFor={`${id}-other-place`}>
                        {copy.questions.destinations.otherLabel}
                      </label>
                      <input
                        id={`${id}-other-place`}
                        ref={otherPlaceRef}
                        type="text"
                        maxLength={120}
                        dir="auto"
                        value={draft.otherPlace}
                        placeholder={
                          copy.questions.destinations.otherPlaceholder
                        }
                        aria-invalid={Boolean(questionError)}
                        aria-describedby={`${id}-other-place-hint${
                          questionError ? ` ${questionErrorId}` : ""
                        }`}
                        onChange={(event) =>
                          updateDraft({
                            ...draft,
                            destinationMode: "wishlist",
                            otherPlace: sanitizeOtherPlace(
                              event.target.value,
                            ),
                          })
                        }
                      />
                      <small id={`${id}-other-place-hint`}>
                        {copy.questions.destinations.otherHint}
                      </small>
                    </div>
                  )}
                <button
                  className={`${styles.classicStartOption} ${
                    draft.destinationMode === "classic-start"
                      ? styles.optionSelected
                      : ""
                  }`}
                  type="button"
                  aria-pressed={
                    draft.destinationMode === "classic-start"
                  }
                  onClick={chooseClassicStart}
                >
                  <span>
                    <strong>
                      {copy.questions.destinations.classicStartLabel}
                    </strong>
                    <small>
                      {
                        copy.questions.destinations
                          .classicStartDescription
                      }
                    </small>
                  </span>
                  {draft.destinationMode === "classic-start" && (
                    <Check aria-hidden="true" size={17} />
                  )}
                </button>
              </div>
            </fieldset>
          )}

          {questionKey === "nights" && (
            <fieldset
              className={styles.fieldset}
              aria-describedby={`${questionHelpId}${
                questionError ? ` ${questionErrorId}` : ""
              }`}
            >
              <legend className={styles.srOnly}>
                {copy.questions.nights.legend}
              </legend>
              <div className={styles.nightsGrid}>
                {presetNights.map((value) => (
                  <label
                    className={`${styles.choiceOption} ${
                      draft.nightsChoice === value
                        ? styles.optionSelected
                        : ""
                    }`}
                    key={value}
                  >
                    <input
                      type="radio"
                      name={`${id}-nights`}
                      value={value}
                      checked={draft.nightsChoice === value}
                      onChange={() =>
                        updateDraft({
                          ...draft,
                          nightsChoice: value,
                        })
                      }
                    />
                    <span>{copy.questions.nights.nights(Number(value))}</span>
                  </label>
                ))}
                <label
                  className={`${styles.choiceOption} ${
                    draft.nightsChoice === "custom"
                      ? styles.optionSelected
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`${id}-nights`}
                    value="custom"
                    checked={draft.nightsChoice === "custom"}
                    onChange={() =>
                      updateDraft({
                        ...draft,
                        nightsChoice: "custom",
                      })
                    }
                  />
                  <span>{copy.questions.nights.custom}</span>
                </label>
              </div>
              {draft.nightsChoice === "custom" && (
                <div className={styles.customNights}>
                  <label htmlFor={`${id}-custom-nights`}>
                    {copy.questions.nights.customLabel}
                  </label>
                  <input
                    id={`${id}-custom-nights`}
                    ref={customNightsRef}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={2}
                    value={draft.customNights}
                    aria-invalid={Boolean(questionError)}
                    aria-describedby={
                      questionError ? questionErrorId : undefined
                    }
                    onChange={(event) =>
                      updateDraft({
                        ...draft,
                        customNights: event.target.value.replace(
                          /[^0-9]/gu,
                          "",
                        ),
                      })
                    }
                  />
                </div>
              )}
            </fieldset>
          )}

          {questionKey === "party" && (
            <fieldset
              className={styles.fieldset}
              aria-describedby={`${questionHelpId}${
                questionError ? ` ${questionErrorId}` : ""
              }`}
            >
              <legend className={styles.srOnly}>
                {copy.questions.party.legend}
              </legend>
              <div className={styles.optionGrid}>
                {copy.partyOptions.map((option) => (
                  <label
                    className={`${styles.choiceOption} ${
                      draft.party === option.id
                        ? styles.optionSelected
                        : ""
                    }`}
                    key={option.id}
                  >
                    <input
                      type="radio"
                      name={`${id}-party`}
                      value={option.id}
                      checked={draft.party === option.id}
                      onChange={() =>
                        updateDraft({ ...draft, party: option.id })
                      }
                    />
                    <span>
                      <strong>{option.label}</strong>
                      <small>{option.description}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {questionKey === "pace" && (
            <fieldset
              className={styles.fieldset}
              aria-describedby={`${questionHelpId}${
                questionError ? ` ${questionErrorId}` : ""
              }`}
            >
              <legend className={styles.srOnly}>
                {copy.questions.pace.legend}
              </legend>
              <div className={styles.paceGrid}>
                {copy.paceOptions.map((option) => (
                  <label
                    className={`${styles.choiceOption} ${
                      draft.pace === option.id
                        ? styles.optionSelected
                        : ""
                    }`}
                    key={option.id}
                  >
                    <input
                      type="radio"
                      name={`${id}-pace`}
                      value={option.id}
                      checked={draft.pace === option.id}
                      onChange={() =>
                        updateDraft({ ...draft, pace: option.id })
                      }
                    />
                    <span>
                      <strong>{option.label}</strong>
                      <small>{option.description}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

              {questionError && (
                <p
                  className={styles.questionError}
                  id={questionErrorId}
                  role="alert"
                >
                  {questionError}
                </p>
              )}

              <div className={styles.formActions}>
                {stepIndex > 0 && (
                  <button
                    className={styles.secondaryButton}
                    type="button"
                    onClick={handleBack}
                  >
                    <ArrowLeft aria-hidden="true" size={17} />
                    {copy.back}
                  </button>
                )}
                <button className={styles.primaryButton} type="submit">
                  {stepIndex === questions.length - 1
                    ? copy.showCheck
                    : copy.continue}
                  <ArrowRight aria-hidden="true" size={17} />
                </button>
              </div>
            </div>
          </div>

          {destinationSelectionReady && (
            <div
              className={styles.mobileActionDock}
              role="group"
              aria-label={copy.progress(stepIndex + 1, questions.length)}
            >
              <div className={styles.mobileSelectionSummary}>
                <strong>
                  {copy.selectedCount(selectedDestinationLabels.length)}
                </strong>
                <div>
                  {selectedDestinationPreview.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                  {remainingDestinationCount > 0 && (
                    <span>+{remainingDestinationCount}</span>
                  )}
                </div>
              </div>
              <ul className={styles.mobileTrust} aria-label={copy.introEyebrow}>
                {copy.mobileTrust.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <button className={styles.mobileDockButton} type="submit">
                {copy.continue}
                <ArrowRight aria-hidden="true" size={17} />
              </button>
            </div>
          )}
        </form>
      ) : (
        match && (
          <div className={styles.result}>
            <header className={styles.resultHeader}>
              <p className={styles.kicker}>{copy.result.kicker}</p>
              <h2
                id={`${id}-title`}
                ref={resultHeadingRef}
                tabIndex={-1}
              >
                {resultTitle}
              </h2>
              <p className={styles.resultLead}>{resultBody}</p>
              {resultMeta && (
                <div className={styles.resultMetaRow}>
                  <dl>
                    {resultMeta.map((item) => (
                      <div key={item.label}>
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <button
                    type="button"
                    disabled={interactionLocked}
                    onClick={handleEdit}
                  >
                    <Pencil aria-hidden="true" size={15} />
                    {copy.editAnswers}
                  </button>
                </div>
              )}
            </header>

            <section
              className={styles.wishlistSummary}
              aria-labelledby={`${id}-wishlist-title`}
            >
              <div className={styles.sectionHeading}>
                <h3 id={`${id}-wishlist-title`}>
                  {copy.result.wishlistTitle}
                </h3>
                <span>
                  {match.answers.destinationMode === "classic-start"
                    ? copy.result.classicStartValue
                    : match.answers.destinationIds.length +
                      (match.answers.otherPlace ? 1 : 0)}
                </span>
              </div>
              {match.answers.destinationMode === "classic-start" ? (
                <p className={styles.openChoice}>
                  {copy.result.classicStartValue}
                </p>
              ) : (
                <>
                  <ul className={styles.wishlist}>
                    {match.answers.destinationIds.map((destinationId) => (
                      <li key={destinationId}>
                        {copy.destinations[destinationId]}
                      </li>
                    ))}
                    {match.answers.otherPlace && (
                      <li dir="auto">
                        {copy.result.otherLabel}:{" "}
                        {match.answers.otherPlace}
                      </li>
                    )}
                  </ul>
                  <p className={styles.keptAll}>
                    <Check aria-hidden="true" size={16} />
                    {copy.result.keptAll}
                  </p>
                </>
              )}
            </section>

            <section
              className={styles.timingSummary}
              aria-labelledby={`${id}-timing-title`}
            >
              <h3 id={`${id}-timing-title`}>
                {copy.result.timingTitle}
              </h3>
              <dl>
                <div>
                  <dt>{copy.result.available}</dt>
                  <dd>
                    {copy.result.nights(match.answers.totalNights)}
                  </dd>
                </div>
                <div>
                  <dt>{copy.result.essentials}</dt>
                  <dd>
                    {match.timing.essentialsMinimumNights === null
                      ? copy.result.notCalculated
                      : copy.result.nights(
                          match.timing.essentialsMinimumNights,
                        )}
                  </dd>
                </div>
                {match.answers.pace !== "essentials" && (
                  <div>
                    <dt>
                      {copy.result.selectedPace(
                        copy.paceLabels[match.answers.pace],
                      )}
                    </dt>
                    <dd>
                      {match.timing.selectedPaceRange
                        ? copy.result.range(
                            match.timing.selectedPaceRange.minNights,
                            match.timing.selectedPaceRange.maxNights,
                          )
                        : copy.result.notCalculated}
                    </dd>
                  </div>
                )}
              </dl>
              {hasCompressedCondition && (
                <p className={styles.conditionalNote}>
                  {copy.result.conditionalNote}
                </p>
              )}
              <p className={styles.boundary}>
                {copy.result.boundary}
              </p>
            </section>

            {showMustSee && (
              <section
                className={styles.mustSee}
                aria-labelledby={`${id}-must-see-title`}
              >
                <h3 id={`${id}-must-see-title`}>
                  {copy.result.mustSeeTitle}
                </h3>
                <p>{copy.result.mustSeeBody}</p>
                <div className={styles.mustSeeGrid}>
                  {match.answers.destinationIds.map((destinationId) => {
                    const selected =
                      match.answers.mustSeeIds.includes(destinationId);
                    return (
                      <label
                        className={`${styles.mustSeeOption} ${
                          selected ? styles.optionSelected : ""
                        }`}
                        key={destinationId}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          disabled={interactionLocked}
                          onChange={() => updateMustSee(destinationId)}
                        />
                        <span>{copy.destinations[destinationId]}</span>
                      </label>
                    );
                  })}
                </div>
                <button
                  className={styles.equalPriority}
                  type="button"
                  disabled={
                    interactionLocked ||
                    match.answers.mustSeeIds.length === 0
                  }
                  onClick={() => {
                    if (!match.answers.mustSeeIds.length) return;
                    const answers = { ...match.answers, mustSeeIds: [] };
                    const nextMatch = createDestinationPlan(answers);
                    const nextJourney = journey
                      ? { ...journey, revision: journey.revision + 1 }
                      : {
                          journeyId: window.crypto.randomUUID(),
                          revision: 1,
                        };
                    setDraft((current) => ({
                      ...current,
                      mustSeeIds: [],
                    }));
                    setMatch(nextMatch);
                    setJourney(nextJourney);
                    onRouteFound?.(nextMatch, nextJourney);
                  }}
                >
                  {copy.result.mustSeeEqual}
                </button>
                <p
                  className={styles.mustSeeMessage}
                  role="status"
                  aria-live="polite"
                >
                  {mustSeeMessage}
                </p>
              </section>
            )}

            {handoff}

            <button
              className={styles.restartButton}
              type="button"
              disabled={interactionLocked}
              onClick={handleRestart}
            >
              <RotateCcw aria-hidden="true" size={16} />
              {copy.restart}
            </button>
          </div>
        )
      )}
    </section>
  );
}
