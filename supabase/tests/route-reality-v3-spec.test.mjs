import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { isDeepStrictEqual } from "node:util";
import Ajv2020 from "ajv/dist/2020.js";

const specRoot =
  "docs/organic-growth/china-planning-hub-system/route-reality";

async function loadJson(file) {
  return JSON.parse(
    await readFile(new URL(`../../${specRoot}/${file}`, import.meta.url), "utf8"),
  );
}

const [requestSchema, draftOutcomeSchema, catalog, fixtures] = await Promise.all([
  loadJson("request.schema.json"),
  loadJson("draft-outcome.schema.json"),
  loadJson("contract-catalog.json"),
  loadJson("internal-examples.json"),
]);

const expectedRequestFields = [
  "totalNights",
  "arrivalWindow",
  "departureWindow",
  "crossCityMoves",
  "airportStationTransfers",
  "hotelChanges",
  "travellerPace",
];
const expectedCountFields = [
  "totalNights",
  "crossCityMoves",
  "airportStationTransfers",
  "hotelChanges",
];
const requestFields = expectedRequestFields;
const countFields = new Set(expectedCountFields);
const timeWindows = new Set([
  "before_09",
  "09_12",
  "12_15",
  "15_18",
  "after_18",
  "unknown",
]);
const paces = new Set(["fast", "balanced", "slow", "unknown"]);
const modelVersion = "route-reality-v3.0.0-internal-draft";

function compileStrictSchemas(requestArtifact, outcomeArtifact) {
  const ajv = new Ajv2020({
    strict: true,
    strictTuples: true,
    allErrors: true,
  });
  return {
    request: ajv.compile(requestArtifact),
    outcome: ajv.compile(outcomeArtifact),
  };
}

const standardValidators = compileStrictSchemas(
  requestSchema,
  draftOutcomeSchema,
);

function assertSchemaResult(validator, value, expected, label) {
  const actual = validator(value);
  assert.equal(
    actual,
    expected,
    `${label}: ${JSON.stringify(validator.errors ?? [])}`,
  );
}

const expectedValidationPhases = [
  "request_shape",
  "missing_fields",
  "scalar_fields",
  "extra_keys",
  "cross_city_relation",
  "hotel_relation",
  "interchange_topology",
];

const expectedAssumptionCatalog = [
  {
    id: "NIGHTS_CREATE_N_PLUS_ONE_CALENDAR_DAYS",
    emissionPredicate: "every relationally valid request",
    sourceFields: ["totalNights"],
    ruleId: "RR3-CALENDAR-001",
    targetContracts: ["validation.calendarTopology"],
  },
  {
    id: "EDGE_WINDOWS_ARE_BROAD_CAPACITY_BANDS",
    emissionPredicate: "every relationally valid request",
    sourceFields: ["arrivalWindow", "departureWindow"],
    ruleId: "RR3-WINDOW-001",
    targetContracts: ["futurePolicy.edgeCapacityOrdering"],
  },
  {
    id: "ORDINARY_EDGE_ACCESS_NOT_SEPARATE_COMPLEX_TRANSFER",
    emissionPredicate: "every relationally valid request",
    sourceFields: [
      "arrivalWindow",
      "departureWindow",
      "airportStationTransfers",
    ],
    ruleId: "RR3-TRANSFER-001",
    targetContracts: ["validation.transferSemantics"],
  },
  {
    id: "CROSS_CITY_COUNTS_OVERNIGHT_BASE_CHANGE_DAYS",
    emissionPredicate: "every relationally valid request",
    sourceFields: ["crossCityMoves"],
    ruleId: "RR3-MOVE-001",
    targetContracts: ["validation.crossCitySemantics"],
  },
  {
    id: "DAY_TRIPS_EXCLUDED_FROM_CROSS_CITY_MOVES",
    emissionPredicate: "every relationally valid request",
    sourceFields: ["crossCityMoves"],
    ruleId: "RR3-MOVE-002",
    targetContracts: ["validation.crossCitySemantics"],
  },
  {
    id: "HOTEL_CHANGES_EXCLUDE_CROSS_CITY_BASE_CHANGES",
    emissionPredicate: "every relationally valid request",
    sourceFields: ["crossCityMoves", "hotelChanges"],
    ruleId: "RR3-HOTEL-001",
    targetContracts: ["validation.hotelChangeSemantics"],
  },
  {
    id: "ONE_ACCOMMODATION_EVENT_PER_TRANSITION_DAY",
    emissionPredicate: "every relationally valid request",
    sourceFields: ["totalNights", "crossCityMoves", "hotelChanges"],
    ruleId: "RR3-TOPOLOGY-001",
    targetContracts: [
      "validation.accommodationTopology",
      "uncertainty.placement",
    ],
  },
  {
    id: "ONE_COMPLEX_INTERCHANGE_PER_CALENDAR_DAY",
    emissionPredicate: "every relationally valid request",
    sourceFields: ["totalNights", "airportStationTransfers"],
    ruleId: "RR3-TOPOLOGY-002",
    targetContracts: [
      "validation.interchangeTopology",
      "uncertainty.placement",
    ],
  },
];

const expectedAssumptionRecords = expectedAssumptionCatalog.map(
  ({ id, sourceFields, ruleId, targetContracts }) => ({
    id,
    sourceFields,
    ruleId,
    targetContracts,
  }),
);

const expectedUncertaintyOwnership = [
  {
    code: "INPUT_VALUE_UNKNOWN",
    emissionPredicate: "at least one request field equals unknown",
    sourceFieldMode: "all unknown request fields in request-field order",
    sourceFieldOrder: expectedRequestFields,
    ruleId: "RR3-UNCERTAINTY-001",
    targetContracts: ["uncertainty.inputDomain"],
  },
  {
    code: "RELATIONAL_DOMAIN_FILTERED",
    emissionPredicate:
      "an unknown count exists, at least one raw count tuple is rejected by a relation or topology predicate, and at least one feasible tuple remains",
    sourceFieldMode:
      "unknown count fields participating in a pruning rule, in request-field order",
    sourceFieldOrder: expectedCountFields,
    ruleId: "RR3-UNCERTAINTY-002",
    targetContracts: ["uncertainty.feasibleDomain"],
  },
  {
    code: "EVENT_PLACEMENT_UNSPECIFIED",
    emissionPredicate:
      "at least one feasible concrete count tuple has more than one canonical event placement",
    sourceFieldMode:
      "totalNights followed by each event-count field whose value is unknown or positive, in request-field order",
    sourceFieldOrder: expectedCountFields,
    ruleId: "RR3-UNCERTAINTY-003",
    targetContracts: [
      "uncertainty.placement",
      "futurePolicy.triggerWitnesses",
    ],
  },
  {
    code: "TRIGGER_EVALUATION_BLOCKED_BY_POLICY",
    emissionPredicate: "every relationally valid v3 internal-draft request",
    sourceFieldMode: "empty",
    sourceFieldOrder: [],
    ruleId: "RR3-POLICY-001",
    targetContracts: ["futurePolicy.numericResults", "futurePolicy.alerts"],
  },
];

const expectedEventPlacementSourceArrays = [
  ["totalNights", "crossCityMoves"],
  ["totalNights", "airportStationTransfers"],
  ["totalNights", "hotelChanges"],
  ["totalNights", "crossCityMoves", "airportStationTransfers"],
  ["totalNights", "crossCityMoves", "hotelChanges"],
  ["totalNights", "airportStationTransfers", "hotelChanges"],
  [
    "totalNights",
    "crossCityMoves",
    "airportStationTransfers",
    "hotelChanges",
  ],
];

const expectedSchemaUncertaintyBindings = [
  {
    definition: "InputValueUnknownUncertainty",
    code: "INPUT_VALUE_UNKNOWN",
    ruleId: "RR3-UNCERTAINTY-001",
    targetContracts: ["uncertainty.inputDomain"],
    sourceContract: {
      kind: "ordered_unique_subset",
      minimumItems: 1,
      fieldOrder: expectedRequestFields,
    },
  },
  {
    definition: "RelationalDomainFilteredUncertainty",
    code: "RELATIONAL_DOMAIN_FILTERED",
    ruleId: "RR3-UNCERTAINTY-002",
    targetContracts: ["uncertainty.feasibleDomain"],
    sourceContract: {
      kind: "ordered_unique_subset",
      minimumItems: 1,
      fieldOrder: expectedCountFields,
    },
  },
  {
    definition: "EventPlacementUnspecifiedUncertainty",
    code: "EVENT_PLACEMENT_UNSPECIFIED",
    ruleId: "RR3-UNCERTAINTY-003",
    targetContracts: [
      "uncertainty.placement",
      "futurePolicy.triggerWitnesses",
    ],
    sourceContract: {
      kind: "exact_ordered_arrays",
      arrays: expectedEventPlacementSourceArrays,
    },
  },
  {
    definition: "TriggerEvaluationBlockedUncertainty",
    code: "TRIGGER_EVALUATION_BLOCKED_BY_POLICY",
    ruleId: "RR3-POLICY-001",
    targetContracts: ["futurePolicy.numericResults", "futurePolicy.alerts"],
    sourceContract: { kind: "exact", fields: [] },
  },
];

const expectedValidationErrorOwnership = [
  {
    code: "REQUEST_NOT_PLAIN_OBJECT",
    ruleId: "RR3-SHAPE-001",
    fields: ["$request"],
    relatedFieldMode: "fixed",
    relatedFields: ["$request"],
    offendingKeyMode: "null",
    canonicalPriority: { phase: 0, fieldOrder: "fixed", keyOrder: "none" },
  },
  {
    code: "MISSING_FIELD",
    ruleId: "RR3-SHAPE-002",
    fields: expectedRequestFields,
    relatedFieldMode: "same_as_field",
    relatedFields: null,
    offendingKeyMode: "null",
    canonicalPriority: {
      phase: 1,
      fieldOrder: "request_field_order",
      keyOrder: "none",
    },
  },
  {
    code: "COUNT_NOT_INTEGER",
    ruleId: "RR3-SCALAR-001",
    fields: expectedCountFields,
    relatedFieldMode: "same_as_field",
    relatedFields: null,
    offendingKeyMode: "null",
    canonicalPriority: {
      phase: 2,
      fieldOrder: "request_field_order",
      keyOrder: "none",
    },
  },
  {
    code: "COUNT_OUT_OF_RANGE",
    ruleId: "RR3-SCALAR-002",
    fields: expectedCountFields,
    relatedFieldMode: "same_as_field",
    relatedFields: null,
    offendingKeyMode: "null",
    canonicalPriority: {
      phase: 2,
      fieldOrder: "request_field_order",
      keyOrder: "none",
    },
  },
  {
    code: "UNSUPPORTED_TIME_WINDOW",
    ruleId: "RR3-SCALAR-003",
    fields: ["arrivalWindow", "departureWindow"],
    relatedFieldMode: "same_as_field",
    relatedFields: null,
    offendingKeyMode: "null",
    canonicalPriority: {
      phase: 2,
      fieldOrder: "request_field_order",
      keyOrder: "none",
    },
  },
  {
    code: "UNSUPPORTED_PACE",
    ruleId: "RR3-SCALAR-004",
    fields: ["travellerPace"],
    relatedFieldMode: "same_as_field",
    relatedFields: null,
    offendingKeyMode: "null",
    canonicalPriority: {
      phase: 2,
      fieldOrder: "request_field_order",
      keyOrder: "none",
    },
  },
  {
    code: "EXTRA_FIELD",
    ruleId: "RR3-SHAPE-003",
    fields: ["$request"],
    relatedFieldMode: "fixed",
    relatedFields: [],
    offendingKeyMode: "canonical_extra_key",
    canonicalPriority: {
      phase: 3,
      fieldOrder: "fixed",
      keyOrder:
        "string_code_point_then_symbol_description_then_original_index",
    },
  },
  {
    code: "RELATIONAL_COUNT_CONFLICT",
    ruleId: "RR3-RELATION-001",
    fields: ["crossCityMoves"],
    relatedFieldMode: "fixed",
    relatedFields: ["totalNights", "crossCityMoves"],
    offendingKeyMode: "null",
    canonicalPriority: { phase: 4, fieldOrder: "fixed", keyOrder: "none" },
  },
  {
    code: "RELATIONAL_COUNT_CONFLICT",
    ruleId: "RR3-RELATION-002",
    fields: ["hotelChanges"],
    relatedFieldMode: "fixed",
    relatedFields: ["totalNights", "crossCityMoves", "hotelChanges"],
    offendingKeyMode: "null",
    canonicalPriority: { phase: 5, fieldOrder: "fixed", keyOrder: "none" },
  },
  {
    code: "EVENT_TOPOLOGY_OVERFLOW",
    ruleId: "RR3-TOPOLOGY-003",
    fields: ["airportStationTransfers"],
    relatedFieldMode: "fixed",
    relatedFields: ["totalNights", "airportStationTransfers"],
    offendingKeyMode: "null",
    canonicalPriority: { phase: 6, fieldOrder: "fixed", keyOrder: "none" },
  },
];

const expectedSchemaValidationErrorOwnership =
  expectedValidationErrorOwnership.map(
    ({ canonicalPriority: _canonicalPriority, ...ownership }) => ownership,
  );

const expectedValidationCodes = [
  "REQUEST_NOT_PLAIN_OBJECT",
  "MISSING_FIELD",
  "EXTRA_FIELD",
  "COUNT_NOT_INTEGER",
  "COUNT_OUT_OF_RANGE",
  "UNSUPPORTED_TIME_WINDOW",
  "UNSUPPORTED_PACE",
  "RELATIONAL_COUNT_CONFLICT",
  "EVENT_TOPOLOGY_OVERFLOW",
];

const expectedRelationalRules = [
  {
    ruleId: "RR3-RELATION-001",
    predicate: "crossCityMoves > totalNights - 1",
    code: "RELATIONAL_COUNT_CONFLICT",
    field: "crossCityMoves",
    relatedFields: ["totalNights", "crossCityMoves"],
  },
  {
    ruleId: "RR3-RELATION-002",
    predicate:
      "hotelChanges > 0 and crossCityMoves + hotelChanges > totalNights - 1",
    code: "RELATIONAL_COUNT_CONFLICT",
    field: "hotelChanges",
    relatedFields: ["totalNights", "crossCityMoves", "hotelChanges"],
  },
  {
    ruleId: "RR3-TOPOLOGY-003",
    predicate: "airportStationTransfers > totalNights + 1",
    code: "EVENT_TOPOLOGY_OVERFLOW",
    field: "airportStationTransfers",
    relatedFields: ["totalNights", "airportStationTransfers"],
  },
];

const expectedTriggerStateSignature = {
  definition: "ordered Boolean vector across canonical feasible placements",
  encoding: "<length>:<0-or-1 at each canonical placement index>",
  differentWhen: "length or any placement-index value differs",
  sortingAllowed: false,
  summaryReductionAllowed: false,
};

const expectedUncertaintyCodes = [
  "INPUT_VALUE_UNKNOWN",
  "RELATIONAL_DOMAIN_FILTERED",
  "EVENT_PLACEMENT_UNSPECIFIED",
  "TRIGGER_EVALUATION_BLOCKED_BY_POLICY",
];

const expectedTerminalUncertaintyContracts = [
  {
    inputState: "fully_known",
    uncertaintyState: "none",
    terminalState: "policy_pending_fully_known_unique_placement",
    uncertaintyDefinitions: [
      ["TriggerEvaluationBlockedUncertainty"],
    ],
  },
  {
    inputState: "fully_known",
    uncertaintyState: "placement_unresolved",
    terminalState: "policy_pending_fully_known_placement_unresolved",
    uncertaintyDefinitions: [
      [
        "EventPlacementUnspecifiedUncertainty",
        "TriggerEvaluationBlockedUncertainty",
      ],
    ],
  },
  {
    inputState: "contains_unknown",
    uncertaintyState: "input_unresolved",
    terminalState: "policy_pending_input_unresolved",
    uncertaintyDefinitions: [
      [
        "InputValueUnknownUncertainty",
        "TriggerEvaluationBlockedUncertainty",
      ],
      [
        "InputValueUnknownUncertainty",
        "RelationalDomainFilteredUncertainty",
        "TriggerEvaluationBlockedUncertainty",
      ],
    ],
  },
  {
    inputState: "contains_unknown",
    uncertaintyState: "input_and_placement_unresolved",
    terminalState: "policy_pending_input_and_placement_unresolved",
    uncertaintyDefinitions: [
      [
        "InputValueUnknownUncertainty",
        "EventPlacementUnspecifiedUncertainty",
        "TriggerEvaluationBlockedUncertainty",
      ],
      [
        "InputValueUnknownUncertainty",
        "RelationalDomainFilteredUncertainty",
        "EventPlacementUnspecifiedUncertainty",
        "TriggerEvaluationBlockedUncertainty",
      ],
    ],
  },
];

const expectedTriggerWitnessFixtures = [
  {
    id: "WITNESS-NONE",
    assertionKind: "trigger_witness_basis",
    hasInputUncertainty: false,
    witnessMatrix: [[false]],
    expected: { emit: false, basis: null, sources: [] },
  },
  {
    id: "WITNESS-CONFIRMED",
    assertionKind: "trigger_witness_basis",
    hasInputUncertainty: false,
    witnessMatrix: [[true, true]],
    expected: { emit: true, basis: "confirmed", sources: [] },
  },
  {
    id: "WITNESS-FULLY-KNOWN-PLACEMENT-POSSIBLE",
    assertionKind: "trigger_witness_basis",
    sourceScenarioId: "UNC-FULLY-KNOWN-PLACEMENT-UNRESOLVED",
    hasInputUncertainty: false,
    witnessMatrix: [[false, true]],
    expected: {
      emit: true,
      basis: "possible_feasible_extreme",
      sources: ["event_placement"],
    },
  },
  {
    id: "WITNESS-INPUT-POSSIBLE",
    assertionKind: "trigger_witness_basis",
    hasInputUncertainty: true,
    witnessMatrix: [[false], [true]],
    expected: {
      emit: true,
      basis: "possible_feasible_extreme",
      sources: ["input_domain"],
    },
  },
  {
    id: "WITNESS-INPUT-AND-PLACEMENT-POSSIBLE",
    assertionKind: "trigger_witness_basis",
    hasInputUncertainty: true,
    witnessMatrix: [[false, true], [true, true]],
    expected: {
      emit: true,
      basis: "possible_feasible_extreme",
      sources: ["input_domain", "event_placement"],
    },
  },
  {
    id: "WITNESS-ASYMMETRIC-STATE-SIGNATURE",
    assertionKind: "trigger_witness_basis",
    hasInputUncertainty: true,
    witnessMatrix: [[false, true], [true, false]],
    expected: {
      emit: true,
      basis: "possible_feasible_extreme",
      sources: ["input_domain", "event_placement"],
    },
  },
];

const expectedMonotonicityCatalog = [
  {
    axis: "arrivalWindow",
    sequence: ["before_09", "09_12", "12_15", "15_18", "after_18"],
    capacityDirection: "non_increasing",
  },
  {
    axis: "departureWindow",
    sequence: ["before_09", "09_12", "12_15", "15_18", "after_18"],
    capacityDirection: "non_decreasing",
  },
  {
    axis: "travellerPace",
    sequence: ["fast", "balanced", "slow"],
    capacityDirection: "non_increasing",
    burdenDirection: "non_decreasing",
  },
  {
    axis: "crossCityMoves",
    sequence: "increasing count",
    capacityDirection: "non_increasing",
    burdenDirection: "non_decreasing",
  },
  {
    axis: "airportStationTransfers",
    sequence: "increasing count",
    capacityDirection: "non_increasing",
    burdenDirection: "non_decreasing",
  },
  {
    axis: "hotelChanges",
    sequence: "increasing count",
    capacityDirection: "non_increasing",
    burdenDirection: "non_decreasing",
  },
];

const expectedValidMonotonicFixture = {
  id: "MONO-ORDINAL-VALID",
  assertionKind: "monotonicity_contract",
  notPolicyPack: true,
  expectedValid: true,
  capacity: {
    arrivalWindow: [5, 4, 3, 2, 1],
    departureWindow: [1, 2, 3, 4, 5],
    travellerPace: [3, 2, 1],
    crossCityMoves: [3, 2, 1],
    airportStationTransfers: [3, 2, 1],
    hotelChanges: [3, 2, 1],
  },
  burden: {
    travellerPace: [1, 2, 3],
    crossCityMoves: [1, 2, 3],
    airportStationTransfers: [1, 2, 3],
    hotelChanges: [1, 2, 3],
  },
};

const expectedNegativeMonotonicContracts = [
  [
    "MONO-ARRIVAL-REVERSED",
    "arrivalWindow",
    "capacity",
    "non_increasing",
    [5, 4, 6, 2, 1],
  ],
  [
    "MONO-DEPARTURE-REVERSED",
    "departureWindow",
    "capacity",
    "non_decreasing",
    [1, 2, 0, 4, 5],
  ],
  [
    "MONO-PACE-CAPACITY-REVERSED",
    "travellerPace",
    "capacity",
    "non_increasing",
    [3, 4, 1],
  ],
  [
    "MONO-PACE-BURDEN-REVERSED",
    "travellerPace",
    "burden",
    "non_decreasing",
    [1, 0, 3],
  ],
  [
    "MONO-CROSS-CITY-CAPACITY-REVERSED",
    "crossCityMoves",
    "capacity",
    "non_increasing",
    [3, 4, 1],
  ],
  [
    "MONO-CROSS-CITY-BURDEN-REVERSED",
    "crossCityMoves",
    "burden",
    "non_decreasing",
    [1, 0, 3],
  ],
  [
    "MONO-TRANSFER-CAPACITY-REVERSED",
    "airportStationTransfers",
    "capacity",
    "non_increasing",
    [3, 4, 1],
  ],
  [
    "MONO-TRANSFER-BURDEN-REVERSED",
    "airportStationTransfers",
    "burden",
    "non_decreasing",
    [1, 0, 3],
  ],
  [
    "MONO-HOTEL-CAPACITY-REVERSED",
    "hotelChanges",
    "capacity",
    "non_increasing",
    [3, 4, 1],
  ],
  [
    "MONO-HOTEL-BURDEN-REVERSED",
    "hotelChanges",
    "burden",
    "non_decreasing",
    [1, 0, 3],
  ],
].map(([id, axis, metric, direction, values]) => ({
  id,
  axis,
  metric,
  direction,
  mutateFrom: "MONO-ORDINAL-VALID",
  mutation: { metric, axis, values },
  expectedValid: false,
  expectedViolation: `${axis}:${metric}:${direction}`,
}));
const requiredFixtureIds = [
  "REQ-PLAIN-VALID",
  "REQ-NULL-PROTOTYPE-VALID",
  "REQ-OUTPUT-SHAPED-REJECTED",
  "REQ-INVALID-OUTPUT-SHAPED-REJECTED",
  "REQ-SYMBOL-KEY-REJECTED",
  "REQ-UNICODE-EXTRA-ORDER",
  "REQ-COLLIDING-EXTRA-KEYS-CANONICAL",
  "REL-CROSS-CITY-OWNER",
  "REL-TRANSFER-OWNER",
  "REL-MULTI-ERROR-CANONICAL",
  "REL-SCALAR-MISSING-EXTRA-CANONICAL",
  "BND-HIGH-HOTEL-VALID",
  "BND-TOTAL-NIGHTS-ZERO-INVALID",
  "UNC-ZERO-EVENT-UNIQUE",
  "UNC-SINGLE-PLACEMENT-UNIQUE",
  "UNC-FULLY-KNOWN-PLACEMENT-UNRESOLVED",
  "UNC-ARRIVAL-ONLY-NO-RELATIONAL-FILTER",
  "UNC-NIGHTS-FILTERED",
  "UNC-PRUNING-SOURCES-EXACT",
  "UNC-MULTI-PRUNING-SOURCES-EXACT",
  "UNC-ALL-UNKNOWN",
  "ASSUMPTION-BINDINGS-EXACT",
  "DETERMINISM-DEEP-CLONE",
  "DRAFT-POLICY-PENDING-VALID",
  "DRAFT-INVALID-OUTCOME-VALID",
  "DRAFT-NUMERIC-RESULT-REJECTED",
  "DRAFT-INVALID-NUMERIC-RESULT-REJECTED",
  "DRAFT-OBJECT-RESULT-REJECTED",
  "DRAFT-NONNULL-POLICY-REJECTED",
  "DRAFT-OK-STATUS-REJECTED",
  "DRAFT-TERMINAL-MISMATCH-REJECTED",
  "DRAFT-ASSUMPTION-REBIND-REJECTED",
  "DRAFT-INVALID-NUMERIC-ERROR-REJECTED",
  "DRAFT-ERROR-MISATTRIBUTED-REJECTED",
  "DRAFT-EXTRA-KEY-ENCODING-MALFORMED-REJECTED",
  "DRAFT-DUPLICATE-ERROR-REJECTED",
  "DRAFT-UNCERTAINTY-EMPTY-SOURCES-REJECTED",
  "DRAFT-UNCERTAINTY-DUPLICATE-CODE-REJECTED",
  "DRAFT-PLACEMENT-RECORD-MISSING-REJECTED",
  "DRAFT-PLACEMENT-SOURCE-INCOMPLETE-REJECTED",
  "DRAFT-ERROR-ORDER-REVERSED-REJECTED",
  "DRAFT-V2-NUMERIC-BODY-REJECTED",
  "MATRIX-COUNT-INVALID",
  "MATRIX-TIME-WINDOW-INVALID",
  "MATRIX-PACE-INVALID",
  "MATRIX-MISSING-FIELDS",
  "MATRIX-NONPLAIN-ROOTS",
  "WITNESS-NONE",
  "WITNESS-CONFIRMED",
  "WITNESS-FULLY-KNOWN-PLACEMENT-POSSIBLE",
  "WITNESS-INPUT-POSSIBLE",
  "WITNESS-INPUT-AND-PLACEMENT-POSSIBLE",
  "WITNESS-ASYMMETRIC-STATE-SIGNATURE",
  "MONO-ORDINAL-VALID",
  "MONO-ARRIVAL-REVERSED",
  "MONO-DEPARTURE-REVERSED",
  "MONO-PACE-CAPACITY-REVERSED",
  "MONO-PACE-BURDEN-REVERSED",
  "MONO-CROSS-CITY-CAPACITY-REVERSED",
  "MONO-CROSS-CITY-BURDEN-REVERSED",
  "MONO-TRANSFER-CAPACITY-REVERSED",
  "MONO-TRANSFER-BURDEN-REVERSED",
  "MONO-HOTEL-CAPACITY-REVERSED",
  "MONO-HOTEL-BURDEN-REVERSED",
];
const requiredMatrixContracts = {
  "MATRIX-COUNT-INVALID": {
    assertionKind: "count_invalid_matrix",
    fields: [
      "totalNights",
      "crossCityMoves",
      "airportStationTransfers",
      "hotelChanges",
    ],
    valueFactories: [
      "negative_one",
      "above_max",
      "decimal",
      "numeric_string",
      "boolean_true",
      "boolean_false",
      "null",
      "array",
      "object",
      "nan",
      "positive_infinity",
      "negative_infinity",
    ],
    expectedCaseCount: 48,
  },
  "MATRIX-TIME-WINDOW-INVALID": {
    assertionKind: "enum_invalid_matrix",
    fields: ["arrivalWindow", "departureWindow"],
    valueFactories: [
      "invalid_token",
      "wrong_case",
      "padded_token",
      "number",
      "boolean_true",
      "boolean_false",
      "null",
      "array",
      "object",
    ],
    expectedCode: "UNSUPPORTED_TIME_WINDOW",
    expectedCaseCount: 18,
  },
  "MATRIX-PACE-INVALID": {
    assertionKind: "enum_invalid_matrix",
    fields: ["travellerPace"],
    valueFactories: [
      "invalid_token",
      "wrong_case",
      "padded_token",
      "number",
      "boolean_true",
      "boolean_false",
      "null",
      "array",
      "object",
    ],
    expectedCode: "UNSUPPORTED_PACE",
    expectedCaseCount: 9,
  },
  "MATRIX-MISSING-FIELDS": {
    assertionKind: "missing_field_matrix",
    fields: [
      "totalNights",
      "arrivalWindow",
      "departureWindow",
      "crossCityMoves",
      "airportStationTransfers",
      "hotelChanges",
      "travellerPace",
    ],
    expectedCaseCount: 7,
  },
  "MATRIX-NONPLAIN-ROOTS": {
    assertionKind: "nonplain_root_matrix",
    valueFactories: [
      "date",
      "map",
      "set",
      "class_instance",
      "boxed_string",
      "boxed_number",
      "array",
      "null",
    ],
    expectedCaseCount: 8,
  },
};

function clone(value) {
  return structuredClone(value);
}

function isPlainRecord(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function error(code, field, ruleId, relatedFields = [], offendingKey = null) {
  return { code, field, ruleId, relatedFields, offendingKey };
}

function scalarError(field, value) {
  if (countFields.has(field)) {
    if (value === "unknown") return null;
    if (typeof value !== "number" || !Number.isInteger(value)) {
      return error("COUNT_NOT_INTEGER", field, "RR3-SCALAR-001", [field]);
    }
    const minimum = field === "totalNights" ? 1 : 0;
    if (value < minimum || value > 30) {
      return error("COUNT_OUT_OF_RANGE", field, "RR3-SCALAR-002", [field]);
    }
    return null;
  }
  if (field === "arrivalWindow" || field === "departureWindow") {
    return timeWindows.has(value)
      ? null
      : error("UNSUPPORTED_TIME_WINDOW", field, "RR3-SCALAR-003", [field]);
  }
  if (field === "travellerPace") {
    return paces.has(value)
      ? null
      : error("UNSUPPORTED_PACE", field, "RR3-SCALAR-004", [field]);
  }
  throw new Error(`unhandled scalar field ${field}`);
}

function compareCodePoint(left, right) {
  const leftPoints = Array.from(left, (character) => character.codePointAt(0));
  const rightPoints = Array.from(right, (character) => character.codePointAt(0));
  const length = Math.min(leftPoints.length, rightPoints.length);
  for (let index = 0; index < length; index += 1) {
    if (leftPoints[index] < rightPoints[index]) return -1;
    if (leftPoints[index] > rightPoints[index]) return 1;
  }
  return leftPoints.length - rightPoints.length;
}

function validateRequest(input) {
  if (!isPlainRecord(input)) {
    return {
      valid: false,
      errors: [
        error(
          "REQUEST_NOT_PLAIN_OBJECT",
          "$request",
          "RR3-SHAPE-001",
          ["$request"],
        ),
      ],
    };
  }

  const errors = [];
  for (const field of requestFields) {
    if (!Object.hasOwn(input, field)) {
      errors.push(error("MISSING_FIELD", field, "RR3-SHAPE-002", [field]));
    }
  }

  for (const field of requestFields) {
    if (!Object.hasOwn(input, field)) continue;
    const fieldError = scalarError(field, input[field]);
    if (fieldError) errors.push(fieldError);
  }

  const extraStringKeys = Object.getOwnPropertyNames(input)
    .filter((key) => !requestFields.includes(key))
    .sort(compareCodePoint);
  for (const key of extraStringKeys) {
    errors.push(
      error(
        "EXTRA_FIELD",
        "$request",
        "RR3-SHAPE-003",
        [],
        `string:${JSON.stringify(key)}`,
      ),
    );
  }
  const symbolKeys = Object.getOwnPropertySymbols(input)
    .map((key, originalIndex) => ({
      key,
      originalIndex,
      description: key.description,
    }))
    .sort((left, right) => {
      if (left.description === undefined && right.description !== undefined) {
        return -1;
      }
      if (left.description !== undefined && right.description === undefined) {
        return 1;
      }
      const descriptionOrder = compareCodePoint(
        left.description ?? "",
        right.description ?? "",
      );
      return descriptionOrder || left.originalIndex - right.originalIndex;
    });
  for (const { description, originalIndex } of symbolKeys) {
    errors.push(
      error(
        "EXTRA_FIELD",
        "$request",
        "RR3-SHAPE-003",
        [],
        `symbol:${JSON.stringify(description ?? null)}#${originalIndex}`,
      ),
    );
  }

  if (errors.length > 0) return { valid: false, errors };

  const maximumNights =
    input.totalNights === "unknown" ? 30 : input.totalNights;
  const minimumCrossCity =
    input.crossCityMoves === "unknown" ? 0 : input.crossCityMoves;
  const minimumHotels = input.hotelChanges === "unknown" ? 0 : input.hotelChanges;
  const minimumTransfers =
    input.airportStationTransfers === "unknown"
      ? 0
      : input.airportStationTransfers;

  if (minimumCrossCity > maximumNights - 1) {
    errors.push(
      error(
        "RELATIONAL_COUNT_CONFLICT",
        "crossCityMoves",
        "RR3-RELATION-001",
        ["totalNights", "crossCityMoves"],
      ),
    );
  }
  if (
    minimumHotels > 0 &&
    minimumCrossCity + minimumHotels > maximumNights - 1
  ) {
    errors.push(
      error(
        "RELATIONAL_COUNT_CONFLICT",
        "hotelChanges",
        "RR3-RELATION-002",
        ["totalNights", "crossCityMoves", "hotelChanges"],
      ),
    );
  }
  if (minimumTransfers > maximumNights + 1) {
    errors.push(
      error(
        "EVENT_TOPOLOGY_OVERFLOW",
        "airportStationTransfers",
        "RR3-TOPOLOGY-003",
        ["totalNights", "airportStationTransfers"],
      ),
    );
  }

  return { valid: errors.length === 0, errors };
}

function integerDomain(value, minimum) {
  if (value !== "unknown") return [value];
  return Array.from({ length: 31 - minimum }, (_, index) => minimum + index);
}

function binomialHasMultiple(total, selected) {
  return selected > 0 && selected < total;
}

function placementIsAmbiguous(nights, crossCity, transfers, hotels) {
  const transitionSlots = nights - 1;
  const accommodationEvents = crossCity + hotels;
  const accommodationDayChoice = binomialHasMultiple(
    transitionSlots,
    accommodationEvents,
  );
  const accommodationTypeChoice = binomialHasMultiple(
    accommodationEvents,
    crossCity,
  );
  const transferDayChoice = binomialHasMultiple(nights + 1, transfers);
  return accommodationDayChoice || accommodationTypeChoice || transferDayChoice;
}

function analyzeFeasibleDomain(input) {
  const nightsDomain = integerDomain(input.totalNights, 1);
  const crossCityDomain = integerDomain(input.crossCityMoves, 0);
  const transferDomain = integerDomain(input.airportStationTransfers, 0);
  const hotelDomain = integerDomain(input.hotelChanges, 0);
  let feasible = false;
  let rejected = false;
  let placementAmbiguous = false;
  const prunedUnknownFields = new Set();

  function bindPruningFields(fields) {
    for (const field of fields) {
      if (input[field] === "unknown") prunedUnknownFields.add(field);
    }
  }

  for (const nights of nightsDomain) {
    for (const crossCity of crossCityDomain) {
      for (const hotels of hotelDomain) {
        for (const transfers of transferDomain) {
          const crossCityRejected = crossCity > nights - 1;
          const hotelRejected =
            hotels > 0 && crossCity + hotels > nights - 1;
          const transferRejected = transfers > nights + 1;
          const valid =
            !crossCityRejected && !hotelRejected && !transferRejected;
          if (!valid) {
            rejected = true;
            if (crossCityRejected) {
              bindPruningFields(["totalNights", "crossCityMoves"]);
            }
            if (hotelRejected) {
              bindPruningFields([
                "totalNights",
                "crossCityMoves",
                "hotelChanges",
              ]);
            }
            if (transferRejected) {
              bindPruningFields([
                "totalNights",
                "airportStationTransfers",
              ]);
            }
            continue;
          }
          feasible = true;
          if (placementIsAmbiguous(nights, crossCity, transfers, hotels)) {
            placementAmbiguous = true;
          }
        }
      }
    }
  }
  return {
    feasible,
    rejected,
    placementAmbiguous,
    prunedUnknownFields: requestFields.filter((field) =>
      prunedUnknownFields.has(field),
    ),
  };
}

function assumptionRecords() {
  return catalog.assumptions.map(
    ({ id, sourceFields, ruleId, targetContracts }) => ({
      id,
      sourceFields,
      ruleId,
      targetContracts,
    }),
  );
}

function uncertaintyRecord(code, sourceFields) {
  const definition = catalog.uncertainties.find((item) => item.code === code);
  assert.ok(definition, `missing uncertainty definition ${code}`);
  return {
    code,
    sourceFields,
    ruleId: definition.ruleId,
    targetContracts: definition.targetContracts,
  };
}

function invalidOutcome(errors) {
  return {
    status: "invalid",
    terminalState: "validation_failed",
    modelVersion,
    policyPackVersion: null,
    terminalReason: "REQUEST_INVALID",
    decisionUseful: false,
    errors,
    inputState: null,
    uncertaintyState: null,
    uncertainties: [],
    assumptions: [],
    result: null,
    publicImplementationAuthorized: false,
    indexablePageAuthorized: false,
  };
}

function buildDraftOutcome(input) {
  const validation = validateRequest(input);
  if (!validation.valid) return invalidOutcome(validation.errors);

  const unknownFields = requestFields.filter((field) => input[field] === "unknown");
  const inputState = unknownFields.length === 0 ? "fully_known" : "contains_unknown";
  const domain = analyzeFeasibleDomain(input);
  assert.equal(domain.feasible, true, "validated request must have a feasible domain");
  const uncertainties = [];

  if (unknownFields.length > 0) {
    uncertainties.push(uncertaintyRecord("INPUT_VALUE_UNKNOWN", unknownFields));
  }
  if (domain.prunedUnknownFields.length > 0 && domain.rejected) {
    uncertainties.push(
      uncertaintyRecord(
        "RELATIONAL_DOMAIN_FILTERED",
        domain.prunedUnknownFields,
      ),
    );
  }
  if (domain.placementAmbiguous) {
    const placementFields = [
      "totalNights",
      "crossCityMoves",
      "airportStationTransfers",
      "hotelChanges",
    ].filter((field) => input[field] === "unknown" || input[field] > 0);
    uncertainties.push(
      uncertaintyRecord("EVENT_PLACEMENT_UNSPECIFIED", placementFields),
    );
  }
  uncertainties.push(
    uncertaintyRecord("TRIGGER_EVALUATION_BLOCKED_BY_POLICY", []),
  );

  const terminal = catalog.terminalStates.find(
    (candidate) =>
      candidate.inputState === inputState &&
      candidate.placementAmbiguous === domain.placementAmbiguous,
  );
  assert.ok(terminal, "terminal state mapping must be exhaustive");

  return {
    status: "policy_pending",
    terminalState: terminal.terminalState,
    modelVersion,
    policyPackVersion: null,
    terminalReason: "NUMERIC_POLICY_PACK_NOT_APPROVED",
    decisionUseful: false,
    errors: [],
    inputState,
    uncertaintyState: terminal.uncertaintyState,
    uncertainties,
    assumptions: assumptionRecords(),
    result: null,
    publicImplementationAuthorized: false,
    indexablePageAuthorized: false,
  };
}

function sameKeys(value, expectedKeys) {
  if (!isPlainRecord(value)) return false;
  const actual = Object.keys(value).sort(compareCodePoint);
  const expected = [...expectedKeys].sort(compareCodePoint);
  return JSON.stringify(actual) === JSON.stringify(expected);
}

function decodeOffendingKey(value) {
  if (typeof value !== "string") return null;
  if (value.startsWith("string:")) {
    try {
      const key = JSON.parse(value.slice("string:".length));
      return typeof key === "string" && `string:${JSON.stringify(key)}` === value
        ? { kind: 0, key, originalIndex: 0 }
        : null;
    } catch {
      return null;
    }
  }
  const match = /^symbol:(.*)#(0|[1-9][0-9]*)$/u.exec(value);
  if (!match) return null;
  try {
    const key = JSON.parse(match[1]);
    const originalIndex = Number(match[2]);
    if (
      (key !== null && typeof key !== "string") ||
      !Number.isSafeInteger(originalIndex) ||
      `symbol:${JSON.stringify(key)}#${originalIndex}` !== value
    ) {
      return null;
    }
    return { kind: 1, key, originalIndex };
  } catch {
    return null;
  }
}

const outcomeKeys = [
  "status",
  "terminalState",
  "modelVersion",
  "policyPackVersion",
  "terminalReason",
  "decisionUseful",
  "errors",
  "inputState",
  "uncertaintyState",
  "uncertainties",
  "assumptions",
  "result",
  "publicImplementationAuthorized",
  "indexablePageAuthorized",
];

function validateErrorRecord(item) {
  if (
    !sameKeys(item, [
      "code",
      "field",
      "ruleId",
      "relatedFields",
      "offendingKey",
    ]) ||
    !Array.isArray(item.relatedFields)
  ) {
    return false;
  }
  const exact = (field, ruleId, relatedFields, offendingKey = null) =>
    item.field === field &&
    item.ruleId === ruleId &&
    JSON.stringify(item.relatedFields) === JSON.stringify(relatedFields) &&
    item.offendingKey === offendingKey;
  switch (item.code) {
    case "REQUEST_NOT_PLAIN_OBJECT":
      return exact("$request", "RR3-SHAPE-001", ["$request"]);
    case "MISSING_FIELD":
      return (
        requestFields.includes(item.field) &&
        exact(item.field, "RR3-SHAPE-002", [item.field])
      );
    case "EXTRA_FIELD":
      return (
        decodeOffendingKey(item.offendingKey) !== null &&
        exact("$request", "RR3-SHAPE-003", [], item.offendingKey)
      );
    case "COUNT_NOT_INTEGER":
      return (
        countFields.has(item.field) &&
        exact(item.field, "RR3-SCALAR-001", [item.field])
      );
    case "COUNT_OUT_OF_RANGE":
      return (
        countFields.has(item.field) &&
        exact(item.field, "RR3-SCALAR-002", [item.field])
      );
    case "UNSUPPORTED_TIME_WINDOW":
      return (
        ["arrivalWindow", "departureWindow"].includes(item.field) &&
        exact(item.field, "RR3-SCALAR-003", [item.field])
      );
    case "UNSUPPORTED_PACE":
      return exact("travellerPace", "RR3-SCALAR-004", ["travellerPace"]);
    case "RELATIONAL_COUNT_CONFLICT":
      if (item.field === "crossCityMoves") {
        return exact("crossCityMoves", "RR3-RELATION-001", [
          "totalNights",
          "crossCityMoves",
        ]);
      }
      return exact("hotelChanges", "RR3-RELATION-002", [
        "totalNights",
        "crossCityMoves",
        "hotelChanges",
      ]);
    case "EVENT_TOPOLOGY_OVERFLOW":
      return exact("airportStationTransfers", "RR3-TOPOLOGY-003", [
        "totalNights",
        "airportStationTransfers",
      ]);
    default:
      return false;
  }
}

function errorOrderKey(item) {
  if (item.code === "REQUEST_NOT_PLAIN_OBJECT") return [0, 0, ""];
  if (item.code === "MISSING_FIELD") {
    return [1, requestFields.indexOf(item.field), ""];
  }
  if (
    [
      "COUNT_NOT_INTEGER",
      "COUNT_OUT_OF_RANGE",
      "UNSUPPORTED_TIME_WINDOW",
      "UNSUPPORTED_PACE",
    ].includes(item.code)
  ) {
    return [2, requestFields.indexOf(item.field), ""];
  }
  if (item.code === "EXTRA_FIELD") return [3, 0, ""];
  if (item.field === "crossCityMoves") return [4, 0, ""];
  if (item.field === "hotelChanges") return [5, 0, ""];
  return [6, 0, ""];
}

function compareErrorOrder(left, right) {
  if (left.code === "EXTRA_FIELD" && right.code === "EXTRA_FIELD") {
    const leftExtra = decodeOffendingKey(left.offendingKey) ?? {
      kind: 2,
      key: left.offendingKey,
      originalIndex: 0,
    };
    const rightExtra = decodeOffendingKey(right.offendingKey) ?? {
      kind: 2,
      key: right.offendingKey,
      originalIndex: 0,
    };
    if (leftExtra.kind !== rightExtra.kind) {
      return leftExtra.kind - rightExtra.kind;
    }
    if (leftExtra.kind === 1) {
      if (leftExtra.key === null && rightExtra.key !== null) return -1;
      if (leftExtra.key !== null && rightExtra.key === null) return 1;
    }
    const keyOrder = compareCodePoint(leftExtra.key ?? "", rightExtra.key ?? "");
    return keyOrder || leftExtra.originalIndex - rightExtra.originalIndex;
  }
  const leftKey = errorOrderKey(left);
  const rightKey = errorOrderKey(right);
  if (leftKey[0] !== rightKey[0]) return leftKey[0] - rightKey[0];
  if (leftKey[1] !== rightKey[1]) return leftKey[1] - rightKey[1];
  return compareCodePoint(leftKey[2], rightKey[2]);
}

function validateDraftOutcome(value) {
  if (!sameKeys(value, outcomeKeys)) return false;
  if (
    value.modelVersion !== modelVersion ||
    value.policyPackVersion !== null ||
    value.decisionUseful !== false ||
    value.result !== null ||
    value.publicImplementationAuthorized !== false ||
    value.indexablePageAuthorized !== false
  ) {
    return false;
  }
  if (value.status === "invalid") {
    const orderedErrors = Array.isArray(value.errors)
      ? [...value.errors].sort(compareErrorOrder)
      : [];
    return (
      value.terminalState === "validation_failed" &&
      value.terminalReason === "REQUEST_INVALID" &&
      Array.isArray(value.errors) &&
      value.errors.length > 0 &&
      value.errors.every(validateErrorRecord) &&
      new Set(value.errors.map((item) => JSON.stringify(item))).size ===
        value.errors.length &&
      JSON.stringify(value.errors) === JSON.stringify(orderedErrors) &&
      containsNumber(value.errors) === false &&
      value.inputState === null &&
      value.uncertaintyState === null &&
      Array.isArray(value.uncertainties) &&
      value.uncertainties.length === 0 &&
      Array.isArray(value.assumptions) &&
      value.assumptions.length === 0
    );
  }
  if (value.status !== "policy_pending") return false;
  const terminal = catalog.terminalStates.find(
    (candidate) => candidate.terminalState === value.terminalState,
  );
  const uncertaintyCodes = value.uncertainties?.map(({ code }) => code) ?? [];
  const orderedCodes = [...uncertaintyCodes].sort(
    (left, right) =>
      catalog.uncertaintyOrder.indexOf(left) -
      catalog.uncertaintyOrder.indexOf(right),
  );
  const uncertaintyBindingsValid = value.uncertainties?.every((item) => {
    const definition = catalog.uncertainties.find(
      ({ code }) => code === item.code,
    );
    const sourceModeValid = (() => {
      if (item.code === "TRIGGER_EVALUATION_BLOCKED_BY_POLICY") {
        return item.sourceFields.length === 0;
      }
      if (item.code === "RELATIONAL_DOMAIN_FILTERED") {
        return (
          item.sourceFields.length > 0 &&
          item.sourceFields.every((field) => countFields.has(field))
        );
      }
      if (item.code === "EVENT_PLACEMENT_UNSPECIFIED") {
        return (
          item.sourceFields.length >= 2 &&
          item.sourceFields[0] === "totalNights" &&
          item.sourceFields.every((field) => countFields.has(field))
        );
      }
      return item.code === "INPUT_VALUE_UNKNOWN" && item.sourceFields.length > 0;
    })();
    return (
      definition &&
      sourceModeValid &&
      item.ruleId === definition.ruleId &&
      JSON.stringify(item.targetContracts) ===
        JSON.stringify(definition.targetContracts) &&
      item.sourceFields.every((field) => requestFields.includes(field)) &&
      new Set(item.sourceFields).size === item.sourceFields.length &&
      JSON.stringify(item.sourceFields) ===
        JSON.stringify(
          [...item.sourceFields].sort(
            (left, right) =>
              requestFields.indexOf(left) - requestFields.indexOf(right),
          ),
        )
    );
  });
  const inputUnresolved = value.inputState === "contains_unknown";
  const placementUnresolved = value.uncertaintyState.includes("placement");
  return (
    value.terminalReason === "NUMERIC_POLICY_PACK_NOT_APPROVED" &&
    Array.isArray(value.errors) &&
    value.errors.length === 0 &&
    terminal?.inputState === value.inputState &&
    terminal?.uncertaintyState === value.uncertaintyState &&
    Array.isArray(value.uncertainties) &&
    new Set(uncertaintyCodes).size === uncertaintyCodes.length &&
    JSON.stringify(uncertaintyCodes) === JSON.stringify(orderedCodes) &&
    uncertaintyBindingsValid &&
    uncertaintyCodes.includes("INPUT_VALUE_UNKNOWN") === inputUnresolved &&
    uncertaintyCodes.includes("EVENT_PLACEMENT_UNSPECIFIED") ===
      placementUnresolved &&
    uncertaintyCodes.at(-1) === "TRIGGER_EVALUATION_BLOCKED_BY_POLICY" &&
    JSON.stringify(value.assumptions) === JSON.stringify(assumptionRecords())
  );
}

function containsNumber(value) {
  if (typeof value === "number") return true;
  if (Array.isArray(value)) return value.some(containsNumber);
  if (isPlainRecord(value)) return Object.values(value).some(containsNumber);
  return false;
}

function triggerStateSignature(row) {
  assert.ok(row.length > 0);
  assert.ok(row.every((value) => typeof value === "boolean"));
  return `${row.length}:${row.map((value) => (value ? "1" : "0")).join("")}`;
}

function classifyTriggerWitnesses(witnessMatrix, hasInputUncertainty) {
  assert.ok(witnessMatrix.length > 0);
  assert.ok(witnessMatrix.every((row) => row.length > 0));
  const flattened = witnessMatrix.flat();
  if (flattened.every((value) => value === false)) {
    return { emit: false, basis: null, sources: [] };
  }
  if (flattened.every((value) => value === true)) {
    return { emit: true, basis: "confirmed", sources: [] };
  }
  const placementVaries = witnessMatrix.some(
    (row) => row.some(Boolean) && row.some((value) => !value),
  );
  const stateSignatures = witnessMatrix.map(triggerStateSignature);
  const inputVaries =
    hasInputUncertainty && new Set(stateSignatures).size > 1;
  const sources = [];
  if (inputVaries) sources.push("input_domain");
  if (placementVaries) sources.push("event_placement");
  return { emit: true, basis: "possible_feasible_extreme", sources };
}

function firstDirectionViolation(values, direction) {
  for (let index = 1; index < values.length; index += 1) {
    if (direction === "non_increasing" && values[index] > values[index - 1]) {
      return true;
    }
    if (direction === "non_decreasing" && values[index] < values[index - 1]) {
      return true;
    }
  }
  return false;
}

const monotonicChecks = [
  ["capacity", "arrivalWindow", "non_increasing"],
  ["capacity", "departureWindow", "non_decreasing"],
  ["capacity", "travellerPace", "non_increasing"],
  ["burden", "travellerPace", "non_decreasing"],
  ["capacity", "crossCityMoves", "non_increasing"],
  ["burden", "crossCityMoves", "non_decreasing"],
  ["capacity", "airportStationTransfers", "non_increasing"],
  ["burden", "airportStationTransfers", "non_decreasing"],
  ["capacity", "hotelChanges", "non_increasing"],
  ["burden", "hotelChanges", "non_decreasing"],
];

function validateOrdinalMonotonicity(candidate) {
  assert.equal(candidate.notPolicyPack, true);
  const violations = [];
  for (const [metric, axis, direction] of monotonicChecks) {
    const values = candidate[metric]?.[axis];
    const exactLength =
      axis === "arrivalWindow" || axis === "departureWindow"
        ? catalog.timeWindowOrder.length
        : axis === "travellerPace"
          ? catalog.paceOrder.length
          : null;
    const shapeInvalid =
      !Array.isArray(values) ||
      (exactLength === null ? values.length < 2 : values.length !== exactLength) ||
      !values.every((value) => typeof value === "number" && Number.isFinite(value));
    if (shapeInvalid || firstDirectionViolation(values, direction)) {
      violations.push(`${axis}:${metric}:${direction}`);
    }
  }
  return { valid: violations.length === 0, violations };
}

class FixtureClass {}

function valueFactory(id, field) {
  const factories = {
    negative_one: () => -1,
    above_max: () => 31,
    decimal: () => 1.5,
    numeric_string: () => "1",
    boolean_true: () => true,
    boolean_false: () => false,
    null: () => null,
    array: () => [],
    object: () => ({}),
    nan: () => Number.NaN,
    positive_infinity: () => Number.POSITIVE_INFINITY,
    negative_infinity: () => Number.NEGATIVE_INFINITY,
    invalid_token: () => (field === "travellerPace" ? "normal" : "morning"),
    wrong_case: () => (field === "travellerPace" ? "Balanced" : "Before_09"),
    padded_token: () =>
      field === "travellerPace" ? " balanced " : " before_09 ",
    number: () => 9,
    date: () => new Date(0),
    map: () => new Map(),
    set: () => new Set(),
    class_instance: () => new FixtureClass(),
    boxed_string: () => new String("boxed"),
    boxed_number: () => new Number(1),
  };
  const factory = factories[id];
  assert.ok(factory, `unknown value factory ${id}`);
  return factory();
}

function requestFactory(fixture) {
  const base = clone(fixtures.baseRequest);
  switch (fixture.factory) {
    case "plain_base":
      return base;
    case "null_prototype_base":
      return Object.assign(Object.create(null), base);
    case "base_override":
      return Object.assign(base, clone(fixture.override ?? {}));
    case "all_unknown":
      return Object.fromEntries(requestFields.map((field) => [field, "unknown"]));
    case "base_with_symbol_key":
      base[Symbol("secret")] = true;
      return base;
    case "base_with_unicode_extra_keys":
      base["\uE000"] = true;
      base["\u{10000}"] = true;
      return base;
    case "base_with_colliding_extra_keys":
      base["@@symbol:secret"] = true;
      base[Symbol("secret")] = true;
      base[Symbol("secret")] = true;
      base[Symbol()] = true;
      base[Symbol("")] = true;
      return base;
    case "scalar_multi_error": {
      const value = {
        totalNights: 3.5,
        arrivalWindow: "morning",
        crossCityMoves: false,
        airportStationTransfers: 31,
        hotelChanges: null,
        travellerPace: "Balanced",
        z: true,
        a: true,
      };
      return value;
    }
    case "policy_pending_outcome":
      return buildDraftOutcome(base);
    case "invalid_outcome":
      return buildDraftOutcome({ ...base, totalNights: 0 });
    case "policy_pending_numeric_result":
      return { ...buildDraftOutcome(base), result: 1 };
    case "invalid_numeric_result":
      return {
        ...buildDraftOutcome({ ...base, totalNights: 0 }),
        result: 1,
      };
    case "policy_pending_object_result":
      return { ...buildDraftOutcome(base), result: { min: 0, max: 1 } };
    case "policy_pending_nonnull_policy":
      return { ...buildDraftOutcome(base), policyPackVersion: "rr-policy-1" };
    case "policy_pending_ok_status":
      return { ...buildDraftOutcome(base), status: "ok" };
    case "policy_pending_terminal_mismatch":
      return {
        ...buildDraftOutcome(base),
        terminalState: "policy_pending_input_unresolved",
      };
    case "policy_pending_assumption_rebound": {
      const output = buildDraftOutcome(base);
      output.assumptions[0].sourceFields = ["travellerPace"];
      return output;
    }
    case "invalid_numeric_error":
      return { ...buildDraftOutcome({ ...base, totalNights: 0 }), errors: [1] };
    case "invalid_misattributed_error": {
      const output = buildDraftOutcome({ ...base, totalNights: 0 });
      output.errors[0] = {
        ...output.errors[0],
        field: "$request",
        ruleId: "RR3-WINDOW-999",
        relatedFields: [],
        offendingKey: "unrelated",
      };
      return output;
    }
    case "invalid_malformed_extra_key": {
      const output = buildDraftOutcome({ ...base, bad: true });
      output.errors[0].offendingKey = "string:not-json";
      return output;
    }
    case "invalid_duplicate_error": {
      const output = buildDraftOutcome({ ...base, totalNights: 0 });
      output.errors.push(clone(output.errors[0]));
      return output;
    }
    case "policy_pending_empty_unknown_sources": {
      const output = buildDraftOutcome({ ...base, arrivalWindow: "unknown" });
      output.uncertainties[0].sourceFields = [];
      return output;
    }
    case "policy_pending_duplicate_uncertainty": {
      const output = buildDraftOutcome({ ...base, arrivalWindow: "unknown" });
      output.uncertainties.splice(1, 0, clone(output.uncertainties[0]));
      return output;
    }
    case "policy_pending_missing_placement_uncertainty": {
      const output = buildDraftOutcome({
        ...base,
        totalNights: 2,
        crossCityMoves: 1,
        airportStationTransfers: 1,
      });
      output.uncertainties = output.uncertainties.filter(
        ({ code }) => code !== "EVENT_PLACEMENT_UNSPECIFIED",
      );
      return output;
    }
    case "policy_pending_incomplete_placement_sources": {
      const output = buildDraftOutcome({
        ...base,
        totalNights: 2,
        crossCityMoves: 1,
        airportStationTransfers: 1,
      });
      const placement = output.uncertainties.find(
        ({ code }) => code === "EVENT_PLACEMENT_UNSPECIFIED",
      );
      placement.sourceFields = ["totalNights"];
      return output;
    }
    case "invalid_reversed_canonical_errors": {
      const output = buildDraftOutcome({
        ...base,
        totalNights: 3,
        crossCityMoves: 3,
        airportStationTransfers: 5,
        hotelChanges: 1,
      });
      output.errors.reverse();
      return output;
    }
    case "v2_numeric_result":
      return {
        ...buildDraftOutcome(base),
        result: {
          baselineSightseeingEquivalentDays: { min: 1, max: 5 },
          appliedTransferTaxEquivalentDays: { min: 0, max: 2 },
          suggestedBufferDays: 1,
          confidence: "high",
        },
      };
    default:
      throw new Error(`unknown request factory ${fixture.factory}`);
  }
}

function errorSignature(item) {
  const suffix = item.offendingKey === null ? "" : `:${item.offendingKey}`;
  return `${item.field}:${item.code}${suffix}`;
}

const requestSchemaAcceptsSemanticInvalid = new Set([
  "REQ-SYMBOL-KEY-REJECTED",
  "REL-CROSS-CITY-OWNER",
  "REL-TRANSFER-OWNER",
  "REL-MULTI-ERROR-CANONICAL",
]);

function assertValidInvalidOutcomeFromRequest(value, expectedErrors, label) {
  const output = buildDraftOutcome(value);
  assert.equal(output.status, "invalid", `${label}/status`);
  assert.deepEqual(output.errors, expectedErrors, `${label}/errors`);
  assertSchemaResult(
    standardValidators.outcome,
    output,
    true,
    `${label}/outcome-schema`,
  );
  assert.equal(validateDraftOutcome(output), true, `${label}/outcome-semantic`);
}

function executeScenario(fixture) {
  const value = requestFactory(fixture);
  switch (fixture.assertionKind) {
    case "request_valid": {
      const validation = validateRequest(value);
      assert.equal(validation.valid, true, JSON.stringify(validation.errors));
      assertSchemaResult(
        standardValidators.request,
        value,
        true,
        `${fixture.id}/request-schema`,
      );
      return;
    }
    case "request_invalid": {
      const validation = validateRequest(value);
      assert.equal(validation.valid, false);
      assertSchemaResult(
        standardValidators.request,
        value,
        requestSchemaAcceptsSemanticInvalid.has(fixture.id),
        `${fixture.id}/request-schema`,
      );
      if (fixture.expectedFirstCode) {
        assert.equal(validation.errors[0].code, fixture.expectedFirstCode);
      }
      if (fixture.expectedErrors) {
        assert.deepEqual(validation.errors, fixture.expectedErrors);
      }
      if (fixture.expectedErrorSignature) {
        assert.deepEqual(
          validation.errors.map(errorSignature),
          fixture.expectedErrorSignature,
        );
      }
      assertValidInvalidOutcomeFromRequest(
        value,
        validation.errors,
        fixture.id,
      );
      return;
    }
    case "invalid_outcome": {
      const validation = validateRequest(value);
      assert.equal(validation.valid, false);
      assertSchemaResult(
        standardValidators.request,
        value,
        false,
        `${fixture.id}/request-schema`,
      );
      const output = buildDraftOutcome(value);
      assert.equal(output.status, "invalid");
      assert.equal(validateDraftOutcome(output), true);
      assertSchemaResult(
        standardValidators.outcome,
        output,
        true,
        `${fixture.id}/outcome-schema`,
      );
      assert.deepEqual(
        output.errors.map(errorSignature),
        fixture.expectedErrorSignature,
      );
      return;
    }
    case "draft_outcome": {
      assertSchemaResult(
        standardValidators.request,
        value,
        true,
        `${fixture.id}/request-schema`,
      );
      const output = buildDraftOutcome(value);
      assert.equal(validateDraftOutcome(output), true);
      assertSchemaResult(
        standardValidators.outcome,
        output,
        true,
        `${fixture.id}/outcome-schema`,
      );
      assert.equal(output.terminalState, fixture.expectedTerminalState);
      assert.equal(output.uncertaintyState, fixture.expectedUncertaintyState);
      assert.deepEqual(
        output.uncertainties.map(({ code }) => code),
        fixture.expectedUncertaintyCodes,
      );
      if (fixture.expectedUncertaintySources) {
        assert.deepEqual(
          Object.fromEntries(
            output.uncertainties.map(({ code, sourceFields }) => [
              code,
              sourceFields,
            ]),
          ),
          fixture.expectedUncertaintySources,
        );
      }
      assert.equal(containsNumber(output), false);
      return;
    }
    case "assumption_bindings": {
      assertSchemaResult(
        standardValidators.request,
        value,
        true,
        `${fixture.id}/request-schema`,
      );
      const output = buildDraftOutcome(value);
      assertSchemaResult(
        standardValidators.outcome,
        output,
        true,
        `${fixture.id}/outcome-schema`,
      );
      assert.deepEqual(output.assumptions, expectedAssumptionRecords);
      assert.deepEqual(assumptionRecords(), expectedAssumptionRecords);
      for (const item of output.assumptions) {
        const definition = catalog.assumptions.find(({ id }) => id === item.id);
        assert.ok(definition);
        assert.deepEqual(item.sourceFields, definition.sourceFields);
        assert.equal(item.ruleId, definition.ruleId);
        assert.deepEqual(item.targetContracts, definition.targetContracts);
      }
      return;
    }
    case "deterministic_outcome": {
      assertSchemaResult(
        standardValidators.request,
        value,
        true,
        `${fixture.id}/request-schema`,
      );
      const first = buildDraftOutcome(value);
      const second = buildDraftOutcome(clone(value));
      assertSchemaResult(
        standardValidators.outcome,
        first,
        true,
        `${fixture.id}/outcome-schema`,
      );
      assert.equal(JSON.stringify(first), JSON.stringify(second));
      assert.equal(
        new Set(first.uncertainties.map(({ code }) => code)).size,
        first.uncertainties.length,
      );
      assert.equal(
        new Set(first.assumptions.map(({ id }) => id)).size,
        first.assumptions.length,
      );
      return;
    }
    case "draft_schema_valid":
      assertSchemaResult(
        standardValidators.outcome,
        value,
        true,
        `${fixture.id}/outcome-schema`,
      );
      assert.equal(validateDraftOutcome(value), true);
      assert.equal(containsNumber(value), false);
      return;
    case "draft_schema_invalid":
      assertSchemaResult(
        standardValidators.outcome,
        value,
        false,
        `${fixture.id}/outcome-schema`,
      );
      assert.equal(validateDraftOutcome(value), false);
      return;
    case "draft_semantic_invalid_schema_valid":
      assertSchemaResult(
        standardValidators.outcome,
        value,
        true,
        `${fixture.id}/outcome-schema`,
      );
      assert.equal(validateDraftOutcome(value), false);
      return;
    default:
      throw new Error(`unknown assertion kind ${fixture.assertionKind}`);
  }
}

function expectedOwnedError(code, field, offendingKey = null) {
  const owner = expectedValidationErrorOwnership.find(
    (item) => item.code === code && item.fields.includes(field),
  );
  assert.ok(owner, `missing independent error owner for ${code}/${field}`);
  return {
    code,
    field,
    ruleId: owner.ruleId,
    relatedFields:
      owner.relatedFieldMode === "same_as_field"
        ? [field]
        : clone(owner.relatedFields),
    offendingKey,
  };
}

function executeMatrix(matrix) {
  switch (matrix.assertionKind) {
    case "count_invalid_matrix": {
      let count = 0;
      for (const field of matrix.fields) {
        for (const factory of matrix.valueFactories) {
          const input = clone(fixtures.baseRequest);
          input[field] = valueFactory(factory, field);
          const validation = validateRequest(input);
          assert.equal(validation.valid, false, `${field}/${factory}`);
          assert.equal(validation.errors.length, 1, `${field}/${factory}`);
          const expectedCode =
            factory === "negative_one" || factory === "above_max"
              ? "COUNT_OUT_OF_RANGE"
              : "COUNT_NOT_INTEGER";
          const expectedError = expectedOwnedError(expectedCode, field);
          assert.deepEqual(validation.errors, [expectedError]);
          assertSchemaResult(
            standardValidators.request,
            input,
            false,
            `${matrix.id}/${field}/${factory}/request-schema`,
          );
          assertValidInvalidOutcomeFromRequest(
            input,
            [expectedError],
            `${matrix.id}/${field}/${factory}`,
          );
          count += 1;
        }
      }
      assert.equal(count, matrix.expectedCaseCount);
      return;
    }
    case "enum_invalid_matrix": {
      let count = 0;
      for (const field of matrix.fields) {
        for (const factory of matrix.valueFactories) {
          const input = clone(fixtures.baseRequest);
          input[field] = valueFactory(factory, field);
          const validation = validateRequest(input);
          assert.equal(validation.valid, false, `${field}/${factory}`);
          assert.equal(validation.errors.length, 1, `${field}/${factory}`);
          const expectedError = expectedOwnedError(matrix.expectedCode, field);
          assert.deepEqual(validation.errors, [expectedError]);
          assertSchemaResult(
            standardValidators.request,
            input,
            false,
            `${matrix.id}/${field}/${factory}/request-schema`,
          );
          assertValidInvalidOutcomeFromRequest(
            input,
            [expectedError],
            `${matrix.id}/${field}/${factory}`,
          );
          count += 1;
        }
      }
      assert.equal(count, matrix.expectedCaseCount);
      return;
    }
    case "missing_field_matrix": {
      let count = 0;
      for (const field of matrix.fields) {
        const input = clone(fixtures.baseRequest);
        delete input[field];
        const validation = validateRequest(input);
        const expectedError = expectedOwnedError("MISSING_FIELD", field);
        assert.deepEqual(validation.errors, [expectedError]);
        assertSchemaResult(
          standardValidators.request,
          input,
          false,
          `${matrix.id}/${field}/request-schema`,
        );
        assertValidInvalidOutcomeFromRequest(
          input,
          [expectedError],
          `${matrix.id}/${field}`,
        );
        count += 1;
      }
      assert.equal(count, matrix.expectedCaseCount);
      return;
    }
    case "nonplain_root_matrix": {
      let count = 0;
      for (const factory of matrix.valueFactories) {
        const input = valueFactory(factory, "$request");
        const validation = validateRequest(input);
        const expectedError = expectedOwnedError(
          "REQUEST_NOT_PLAIN_OBJECT",
          "$request",
        );
        assert.deepEqual(validation.errors, [expectedError]);
        assertSchemaResult(
          standardValidators.request,
          input,
          false,
          `${matrix.id}/${factory}/request-schema`,
        );
        assertValidInvalidOutcomeFromRequest(
          input,
          [expectedError],
          `${matrix.id}/${factory}`,
        );
        count += 1;
      }
      assert.equal(count, matrix.expectedCaseCount);
      return;
    }
    default:
      throw new Error(`unknown matrix assertion kind ${matrix.assertionKind}`);
  }
}

function monotonicityCandidate(fixture) {
  const baseFixture = fixtures.monotonicityFixtures.find(
    ({ id }) => id === (fixture.mutateFrom ?? fixture.id),
  );
  assert.ok(baseFixture);
  const candidate = clone(baseFixture);
  if (fixture.mutation) {
    candidate[fixture.mutation.metric][fixture.mutation.axis] =
      fixture.mutation.values;
  }
  return candidate;
}

function schemaAssumptionRecords(schema) {
  return schema.$defs.Assumptions.prefixItems.map((item) => {
    const properties = item.allOf[1].properties;
    return {
      id: properties.id.const,
      sourceFields: properties.sourceFields.const,
      ruleId: properties.ruleId.const,
      targetContracts: properties.targetContracts.const,
    };
  });
}

function schemaUncertaintyBindings(schema) {
  const records = Object.entries(schema.$defs)
    .filter(
      ([, definition]) =>
        definition?.allOf?.[0]?.$ref === "#/$defs/BaseUncertaintyRecord" &&
        definition?.allOf?.[1]?.properties?.code?.const,
    )
    .map(([definition, contract]) => {
    const properties = contract.allOf[1].properties;
    let sourceContract;
    if (Array.isArray(properties.sourceFields.enum)) {
      sourceContract = {
        kind: "exact_ordered_arrays",
        arrays: properties.sourceFields.enum,
      };
    } else if (Object.hasOwn(properties.sourceFields, "const")) {
      sourceContract = {
        kind: "exact",
        fields: properties.sourceFields.const,
      };
    } else {
      sourceContract = {
        kind: "ordered_unique_subset",
        minimumItems: properties.sourceFields.minItems,
        fieldOrder: properties.sourceFields.items.enum,
      };
    }
    return {
      definition,
      code: properties.code.const,
      ruleId: properties.ruleId.const,
      targetContracts: properties.targetContracts.const,
      sourceContract,
    };
  });

  const expectedOrder = new Map(
    expectedSchemaUncertaintyBindings.map(({ code }, index) => [code, index]),
  );
  return records.sort((left, right) => {
    const leftOrder = expectedOrder.get(left.code);
    const rightOrder = expectedOrder.get(right.code);
    if (leftOrder !== undefined || rightOrder !== undefined) {
      return (
        (leftOrder ?? expectedSchemaUncertaintyBindings.length) -
        (rightOrder ?? expectedSchemaUncertaintyBindings.length)
      );
    }
    return compareCodePoint(JSON.stringify(left), JSON.stringify(right));
  });
}

function schemaTerminalUncertaintyContracts(schema) {
  const definitionName = (reference) =>
    reference.$ref.slice("#/$defs/".length);
  const resolveSequence = (reference) => {
    const definition = schema.$defs[definitionName(reference)];
    return definition.prefixItems.map(definitionName);
  };
  const resolveAlternatives = (contract) => {
    if (contract.$ref) return [resolveSequence(contract)];
    return contract.oneOf.map(resolveSequence);
  };
  return schema.$defs.PolicyPendingOutcome.allOf[0].oneOf.map((arm) => {
    const properties = arm.properties;
    return {
      inputState: properties.inputState.const,
      uncertaintyState: properties.uncertaintyState.const,
      terminalState: properties.terminalState.const,
      uncertaintyDefinitions: resolveAlternatives(properties.uncertainties),
    };
  });
}

function schemaValidationErrorOwnership(schema) {
  const records = [];
  const normalizeOffendingKeyMode = (properties) => {
    const contract = properties.offendingKey;
    if (contract?.type === "null") return "null";
    if (typeof contract?.pattern === "string") return "canonical_extra_key";
    return "unrecognized";
  };
  const appendRecord = ({ code, ruleId, fields, relatedFields, offendingKeyMode }) => {
    const fieldOwnedFamilies = new Set([
      "MISSING_FIELD",
      "COUNT_NOT_INTEGER",
      "COUNT_OUT_OF_RANGE",
      "UNSUPPORTED_TIME_WINDOW",
      "UNSUPPORTED_PACE",
    ]);
    const sameAsField =
      fieldOwnedFamilies.has(code) &&
      fields.every((field, index) =>
        isDeepStrictEqual(relatedFields[index], [field]),
      );
    records.push({
      code,
      ruleId,
      fields,
      relatedFieldMode: sameAsField ? "same_as_field" : "fixed",
      relatedFields: sameAsField ? null : relatedFields[0],
      offendingKeyMode,
    });
  };

  for (const arm of schema.$defs.ValidationError.oneOf) {
    const contract = arm.allOf[1];
    if (Array.isArray(contract.allOf)) {
      const codeVariants = contract.allOf[0].oneOf;
      const fieldVariants = contract.allOf[1].oneOf;
      for (const codeVariant of codeVariants) {
        appendRecord({
          code: codeVariant.properties.code.const,
          ruleId: codeVariant.properties.ruleId.const,
          fields: fieldVariants.map(({ properties }) => properties.field.const),
          relatedFields: fieldVariants.map(
            ({ properties }) => properties.relatedFields.const,
          ),
          offendingKeyMode: normalizeOffendingKeyMode(contract.properties),
        });
      }
      continue;
    }

    const properties = contract.properties;
    const fieldVariants = contract.oneOf;
    const fields = fieldVariants
      ? fieldVariants.map((variant) => variant.properties.field.const)
      : [properties.field.const];
    const relatedFields = fieldVariants
      ? fieldVariants.map((variant) => variant.properties.relatedFields.const)
      : [properties.relatedFields.const];
    appendRecord({
      code: properties.code.const,
      ruleId: properties.ruleId.const,
      fields,
      relatedFields,
      offendingKeyMode: normalizeOffendingKeyMode(properties),
    });
  }

  const identity = (record) =>
    `${record.code}:${JSON.stringify(record.fields)}`;
  const expectedOrder = new Map(
    expectedSchemaValidationErrorOwnership.map((record, index) => [
      identity(record),
      index,
    ]),
  );
  return records.sort((left, right) => {
    const leftOrder = expectedOrder.get(identity(left));
    const rightOrder = expectedOrder.get(identity(right));
    if (leftOrder !== undefined || rightOrder !== undefined) {
      return (
        (leftOrder ?? expectedSchemaValidationErrorOwnership.length) -
        (rightOrder ?? expectedSchemaValidationErrorOwnership.length)
      );
    }
    return compareCodePoint(JSON.stringify(left), JSON.stringify(right));
  });
}

function canonicalInvalidOutcome(errors) {
  return {
    status: "invalid",
    terminalState: "validation_failed",
    modelVersion,
    policyPackVersion: null,
    terminalReason: "REQUEST_INVALID",
    decisionUseful: false,
    errors,
    inputState: null,
    uncertaintyState: null,
    uncertainties: [],
    assumptions: [],
    result: null,
    publicImplementationAuthorized: false,
    indexablePageAuthorized: false,
  };
}

function expectedCanonicalErrorRecords() {
  return expectedValidationErrorOwnership.flatMap((owner) =>
    owner.fields.map((field) => ({
      code: owner.code,
      field,
      ruleId: owner.ruleId,
      relatedFields:
        owner.relatedFieldMode === "same_as_field"
          ? [field]
          : clone(owner.relatedFields),
      offendingKey:
        owner.offendingKeyMode === "canonical_extra_key"
          ? 'string:"audit"'
          : null,
    })),
  );
}

function negativeMonotonicProjection(fixture) {
  return {
    id: fixture.id,
    axis: fixture.axis,
    metric: fixture.metric,
    direction: fixture.direction,
    mutateFrom: fixture.mutateFrom,
    mutation: fixture.mutation,
    expectedValid: fixture.expectedValid,
    expectedViolation: fixture.expectedViolation,
  };
}

function collectArtifactDrifts(bundle) {
  const drifts = [];
  const check = (code, actual, expected) => {
    if (!isDeepStrictEqual(actual, expected)) drifts.push(code);
  };

  check("REQUEST_FIELD_ORDER_DRIFT", bundle.catalog.requestFields, expectedRequestFields);
  check("COUNT_FIELD_ORDER_DRIFT", bundle.catalog.countFields, expectedCountFields);
  check(
    "VALIDATION_PHASE_PRIORITY_DRIFT",
    bundle.catalog.validationPhases,
    expectedValidationPhases,
  );
  check(
    "CATALOG_ASSUMPTION_OWNERSHIP_DRIFT",
    bundle.catalog.assumptions,
    expectedAssumptionCatalog,
  );
  check(
    "SCHEMA_ASSUMPTION_OWNERSHIP_DRIFT",
    schemaAssumptionRecords(bundle.draftOutcomeSchema),
    expectedAssumptionRecords,
  );
  check(
    "FIXTURE_ASSUMPTION_OWNERSHIP_DRIFT",
    bundle.fixtures.expectedAssumptions,
    expectedAssumptionRecords,
  );
  check(
    "CATALOG_UNCERTAINTY_OWNERSHIP_DRIFT",
    bundle.catalog.uncertainties,
    expectedUncertaintyOwnership,
  );
  const schemaUncertaintyInventory = schemaUncertaintyBindings(
    bundle.draftOutcomeSchema,
  );
  check(
    "SCHEMA_UNCERTAINTY_OWNERSHIP_DRIFT",
    schemaUncertaintyInventory,
    expectedSchemaUncertaintyBindings,
  );
  if (
    new Set(schemaUncertaintyInventory.map(({ code }) => code)).size !==
    schemaUncertaintyInventory.length
  ) {
    drifts.push("SCHEMA_UNCERTAINTY_OWNERSHIP_DRIFT");
  }
  check(
    "SCHEMA_UNCERTAINTY_OWNERSHIP_DRIFT",
    bundle.draftOutcomeSchema.$defs.UncertaintyCode.enum,
    expectedUncertaintyCodes,
  );
  check(
    "SCHEMA_UNCERTAINTY_OWNERSHIP_DRIFT",
    schemaTerminalUncertaintyContracts(bundle.draftOutcomeSchema),
    expectedTerminalUncertaintyContracts,
  );
  check(
    "CATALOG_ERROR_OWNERSHIP_DRIFT",
    bundle.catalog.validationErrorOwnership,
    expectedValidationErrorOwnership,
  );
  check(
    "SCHEMA_ERROR_OWNERSHIP_DRIFT",
    bundle.draftOutcomeSchema.$defs.ValidationCode.enum,
    expectedValidationCodes,
  );
  try {
    const schemaErrorInventory = schemaValidationErrorOwnership(
      bundle.draftOutcomeSchema,
    );
    check(
      "SCHEMA_ERROR_OWNERSHIP_DRIFT",
      schemaErrorInventory,
      expectedSchemaValidationErrorOwnership,
    );
    const errorIdentities = schemaErrorInventory.map(
      ({ code, fields }) => `${code}:${JSON.stringify(fields)}`,
    );
    if (new Set(errorIdentities).size !== errorIdentities.length) {
      drifts.push("SCHEMA_ERROR_OWNERSHIP_DRIFT");
    }
  } catch {
    drifts.push("SCHEMA_ERROR_OWNERSHIP_DRIFT");
  }
  check(
    "CATALOG_RELATIONAL_RULE_DRIFT",
    bundle.catalog.relationalRules,
    expectedRelationalRules,
  );
  check(
    "TRIGGER_STATE_SIGNATURE_DRIFT",
    bundle.catalog.triggerStateSignature,
    expectedTriggerStateSignature,
  );
  check(
    "TRIGGER_WITNESS_FIXTURE_DRIFT",
    bundle.fixtures.triggerWitnessFixtures,
    expectedTriggerWitnessFixtures,
  );
  check(
    "MONOTONIC_CATALOG_DRIFT",
    bundle.catalog.monotonicity,
    expectedMonotonicityCatalog,
  );
  check(
    "MONOTONIC_VALID_FIXTURE_DRIFT",
    bundle.fixtures.monotonicityFixtures[0],
    expectedValidMonotonicFixture,
  );
  check(
    "MONOTONIC_NEGATIVE_FIXTURE_DRIFT",
    bundle.fixtures.monotonicityFixtures
      .slice(1)
      .map(negativeMonotonicProjection),
    expectedNegativeMonotonicContracts,
  );
  check(
    "REQUEST_PACE_ENUM_DRIFT",
    bundle.requestSchema.$defs.KnownPace.enum,
    ["fast", "balanced", "slow", "unknown"],
  );
  check(
    "POLICY_RESULT_CONSTRAINT_DRIFT",
    bundle.draftOutcomeSchema.$defs.PolicyPendingOutcome.properties.result,
    { type: "null" },
  );
  check(
    "INVALID_RESULT_CONSTRAINT_DRIFT",
    bundle.draftOutcomeSchema.$defs.InvalidOutcome.properties.result,
    { type: "null" },
  );

  try {
    const validators = compileStrictSchemas(
      bundle.requestSchema,
      bundle.draftOutcomeSchema,
    );
    if (
      expectedCanonicalErrorRecords().some(
        (record) => !validators.outcome(canonicalInvalidOutcome([record])),
      )
    ) {
      drifts.push("SCHEMA_ERROR_OWNERSHIP_DRIFT");
    }
  } catch {
    drifts.push("SCHEMA_STRICT_COMPILE_DRIFT");
  }

  return [...new Set(drifts)];
}

const baselineArtifacts = {
  requestSchema,
  draftOutcomeSchema,
  catalog,
  fixtures,
};

function mutatedArtifacts(mutator) {
  const artifacts = clone(baselineArtifacts);
  mutator(artifacts);
  return artifacts;
}

function assertExactDrifts(artifacts, expectedDrifts, label) {
  assert.deepEqual(
    collectArtifactDrifts(artifacts).sort(compareCodePoint),
    [...expectedDrifts].sort(compareCodePoint),
    label,
  );
}

function collectBuilderErrorDrifts(output, expectedErrors) {
  return isDeepStrictEqual(output.errors, expectedErrors)
    ? []
    : ["BUILDER_ERROR_OWNERSHIP_DRIFT"];
}

test("independent golden contracts match catalog, schemas, builders, and fixtures", () => {
  assertExactDrifts(baselineArtifacts, [], "unmodified artifacts must have zero drift");
  assert.deepEqual(assumptionRecords(), expectedAssumptionRecords);
  assert.deepEqual(
    schemaValidationErrorOwnership(draftOutcomeSchema),
    expectedSchemaValidationErrorOwnership,
  );

  const expectedUncertaintyRecord = (code, sourceFields) => {
    const owner = expectedUncertaintyOwnership.find((item) => item.code === code);
    assert.ok(owner, `missing independent uncertainty owner for ${code}`);
    return {
      code,
      sourceFields,
      ruleId: owner.ruleId,
      targetContracts: owner.targetContracts,
    };
  };
  const arrivalUnknown = buildDraftOutcome({
    ...fixtures.baseRequest,
    arrivalWindow: "unknown",
    crossCityMoves: 0,
    airportStationTransfers: 0,
    hotelChanges: 0,
  });
  assert.deepEqual(arrivalUnknown.uncertainties, [
    expectedUncertaintyRecord("INPUT_VALUE_UNKNOWN", ["arrivalWindow"]),
    expectedUncertaintyRecord("TRIGGER_EVALUATION_BLOCKED_BY_POLICY", []),
  ]);
  const placementUnknown = buildDraftOutcome({
    ...fixtures.baseRequest,
    totalNights: 2,
    crossCityMoves: 1,
    airportStationTransfers: 1,
    hotelChanges: 0,
  });
  assert.deepEqual(placementUnknown.uncertainties, [
    expectedUncertaintyRecord("EVENT_PLACEMENT_UNSPECIFIED", [
      "totalNights",
      "crossCityMoves",
      "airportStationTransfers",
    ]),
    expectedUncertaintyRecord("TRIGGER_EVALUATION_BLOCKED_BY_POLICY", []),
  ]);
  const filteredUnknown = buildDraftOutcome({
    ...fixtures.baseRequest,
    totalNights: 30,
    crossCityMoves: "unknown",
    airportStationTransfers: "unknown",
    hotelChanges: 0,
  });
  assert.deepEqual(filteredUnknown.uncertainties, [
    expectedUncertaintyRecord("INPUT_VALUE_UNKNOWN", [
      "crossCityMoves",
      "airportStationTransfers",
    ]),
    expectedUncertaintyRecord("RELATIONAL_DOMAIN_FILTERED", [
      "crossCityMoves",
    ]),
    expectedUncertaintyRecord("EVENT_PLACEMENT_UNSPECIFIED", [
      "totalNights",
      "crossCityMoves",
      "airportStationTransfers",
    ]),
    expectedUncertaintyRecord("TRIGGER_EVALUATION_BLOCKED_BY_POLICY", []),
  ]);

  const relationInput = {
    ...fixtures.baseRequest,
    totalNights: 3,
    crossCityMoves: 3,
    airportStationTransfers: 5,
    hotelChanges: 1,
  };
  assertSchemaResult(
    standardValidators.request,
    relationInput,
    true,
    "relation-invalid/schema-only",
  );
  assert.equal(validateRequest(relationInput).valid, false);
  const expectedErrors = [
    expectedOwnedError("RELATIONAL_COUNT_CONFLICT", "crossCityMoves"),
    expectedOwnedError("RELATIONAL_COUNT_CONFLICT", "hotelChanges"),
    expectedOwnedError("EVENT_TOPOLOGY_OVERFLOW", "airportStationTransfers"),
  ];
  assert.deepEqual(validateRequest(relationInput).errors, expectedErrors);
  assert.deepEqual(buildDraftOutcome(relationInput).errors, expectedErrors);
  const reversed = canonicalInvalidOutcome([...expectedErrors].reverse());
  assertSchemaResult(
    standardValidators.outcome,
    reversed,
    true,
    "relation-order/schema-shape",
  );
  assert.equal(validateDraftOutcome(reversed), false);
});

test("known review mutations are killed by independent artifact clones", () => {
  const balancedPace = mutatedArtifacts((artifacts) => {
    artifacts.requestSchema.$defs.KnownPace.enum.push("Balanced");
  });
  assertExactDrifts(balancedPace, ["REQUEST_PACE_ENUM_DRIFT"], "pace enum attack");
  const balancedValidator = compileStrictSchemas(
    balancedPace.requestSchema,
    balancedPace.draftOutcomeSchema,
  ).request;
  assert.equal(
    balancedValidator({ ...fixtures.baseRequest, travellerPace: "Balanced" }),
    true,
  );
  assert.equal(
    validateRequest({ ...fixtures.baseRequest, travellerPace: "Balanced" }).valid,
    false,
  );

  const policyResult = mutatedArtifacts((artifacts) => {
    artifacts.draftOutcomeSchema.$defs.PolicyPendingOutcome.properties.result = {};
  });
  assertExactDrifts(
    policyResult,
    ["POLICY_RESULT_CONSTRAINT_DRIFT"],
    "policy result attack",
  );
  const policyResultValidator = compileStrictSchemas(
    policyResult.requestSchema,
    policyResult.draftOutcomeSchema,
  ).outcome;
  assert.equal(
    policyResultValidator({ ...buildDraftOutcome(fixtures.baseRequest), result: 1 }),
    true,
  );

  const invalidResult = mutatedArtifacts((artifacts) => {
    artifacts.draftOutcomeSchema.$defs.InvalidOutcome.properties.result = {};
  });
  assertExactDrifts(
    invalidResult,
    ["INVALID_RESULT_CONSTRAINT_DRIFT"],
    "invalid result attack",
  );
  const invalidResultValidator = compileStrictSchemas(
    invalidResult.requestSchema,
    invalidResult.draftOutcomeSchema,
  ).outcome;
  assert.equal(
    invalidResultValidator({
      ...buildDraftOutcome({ ...fixtures.baseRequest, totalNights: 0 }),
      result: 1,
    }),
    true,
  );

  const uncertaintyRule = mutatedArtifacts((artifacts) => {
    artifacts.catalog.uncertainties[0].ruleId = "RR3-UNCERTAINTY-999";
  });
  assertExactDrifts(
    uncertaintyRule,
    ["CATALOG_UNCERTAINTY_OWNERSHIP_DRIFT"],
    "uncertainty rule attack",
  );
  const uncertaintyMode = mutatedArtifacts((artifacts) => {
    artifacts.catalog.uncertainties[0].sourceFieldMode = "empty";
  });
  assertExactDrifts(
    uncertaintyMode,
    ["CATALOG_UNCERTAINTY_OWNERSHIP_DRIFT"],
    "uncertainty source mode attack",
  );
  const uncertaintySchemaRule = mutatedArtifacts((artifacts) => {
    artifacts.draftOutcomeSchema.$defs.InputValueUnknownUncertainty.allOf[1]
      .properties.ruleId.const = "RR3-UNCERTAINTY-999";
  });
  assertExactDrifts(
    uncertaintySchemaRule,
    ["SCHEMA_UNCERTAINTY_OWNERSHIP_DRIFT"],
    "uncertainty schema rule attack",
  );
  const uncertaintySchemaValidator = compileStrictSchemas(
    uncertaintySchemaRule.requestSchema,
    uncertaintySchemaRule.draftOutcomeSchema,
  ).outcome;
  assert.equal(
    uncertaintySchemaValidator(
      buildDraftOutcome({
        ...fixtures.baseRequest,
        arrivalWindow: "unknown",
        crossCityMoves: 0,
        airportStationTransfers: 0,
        hotelChanges: 0,
      }),
    ),
    false,
  );

  const scalarRule = mutatedArtifacts((artifacts) => {
    artifacts.draftOutcomeSchema.$defs.ValidationError.oneOf[3].allOf[1]
      .allOf[0].oneOf[0].properties.ruleId.const = "RR3-SCALAR-999";
  });
  assertExactDrifts(
    scalarRule,
    ["SCHEMA_ERROR_OWNERSHIP_DRIFT"],
    "scalar error rule attack",
  );
  const scalarValidator = compileStrictSchemas(
    scalarRule.requestSchema,
    scalarRule.draftOutcomeSchema,
  ).outcome;
  assert.equal(
    scalarValidator(
      canonicalInvalidOutcome([
        expectedOwnedError("COUNT_NOT_INTEGER", "totalNights"),
      ]),
    ),
    false,
  );
  const scalarInput = { ...fixtures.baseRequest, totalNights: 1.5 };
  const expectedScalarErrors = [
    expectedOwnedError("COUNT_NOT_INTEGER", "totalNights"),
  ];
  const emittedScalarBaseline = buildDraftOutcome(scalarInput);
  assert.deepEqual(
    collectBuilderErrorDrifts(emittedScalarBaseline, expectedScalarErrors),
    [],
  );
  const emittedScalarRuleMutant = clone(emittedScalarBaseline);
  emittedScalarRuleMutant.errors[0].ruleId = "RR3-SCALAR-999";
  assert.deepEqual(
    collectBuilderErrorDrifts(
      emittedScalarRuleMutant,
      expectedScalarErrors,
    ),
    ["BUILDER_ERROR_OWNERSHIP_DRIFT"],
  );
  assertSchemaResult(
    standardValidators.outcome,
    emittedScalarRuleMutant,
    false,
    "scalar-emitter-rule-attack/outcome-schema",
  );
  assert.equal(validateDraftOutcome(emittedScalarRuleMutant), false);

  const extraErrorArm = mutatedArtifacts((artifacts) => {
    artifacts.draftOutcomeSchema.$defs.ValidationCode.enum.push(
      "UNDECLARED_ERROR",
    );
    artifacts.draftOutcomeSchema.$defs.ValidationError.oneOf.push({
      allOf: [
        { $ref: "#/$defs/BaseValidationError" },
        {
          type: "object",
          properties: {
            code: { const: "UNDECLARED_ERROR" },
            field: { const: "$request" },
            ruleId: { const: "RR3-UNDECLARED-001" },
            relatedFields: { const: [] },
            offendingKey: { type: "null" },
          },
        },
      ],
    });
  });
  assertExactDrifts(
    extraErrorArm,
    ["SCHEMA_ERROR_OWNERSHIP_DRIFT"],
    "undeclared schema error arm attack",
  );
  const extraErrorValidator = compileStrictSchemas(
    extraErrorArm.requestSchema,
    extraErrorArm.draftOutcomeSchema,
  ).outcome;
  assert.equal(
    extraErrorValidator(
      canonicalInvalidOutcome([
        {
          code: "UNDECLARED_ERROR",
          field: "$request",
          ruleId: "RR3-UNDECLARED-001",
          relatedFields: [],
          offendingKey: null,
        },
      ]),
    ),
    true,
  );

  const extraUncertaintyArm = mutatedArtifacts((artifacts) => {
    artifacts.draftOutcomeSchema.$defs.UncertaintyCode.enum.push(
      "UNDECLARED_UNCERTAINTY",
    );
    artifacts.draftOutcomeSchema.$defs.UndeclaredUncertainty = {
      allOf: [
        { $ref: "#/$defs/BaseUncertaintyRecord" },
        {
          type: "object",
          properties: {
            code: { const: "UNDECLARED_UNCERTAINTY" },
            sourceFields: { const: [] },
            ruleId: { const: "RR3-UNDECLARED-001" },
            targetContracts: { const: ["uncertainty.inputDomain"] },
          },
        },
      ],
    };
    artifacts.draftOutcomeSchema.$defs.TriggerAndUndeclaredUncertainties = {
      type: "array",
      minItems: 2,
      maxItems: 2,
      prefixItems: [
        { $ref: "#/$defs/TriggerEvaluationBlockedUncertainty" },
        { $ref: "#/$defs/UndeclaredUncertainty" },
      ],
      items: false,
    };
    artifacts.draftOutcomeSchema.$defs.PolicyPendingOutcome.allOf[0].oneOf[0]
      .properties.uncertainties = {
        oneOf: [
          { $ref: "#/$defs/TriggerOnlyUncertainties" },
          { $ref: "#/$defs/TriggerAndUndeclaredUncertainties" },
        ],
      };
  });
  assertExactDrifts(
    extraUncertaintyArm,
    ["SCHEMA_UNCERTAINTY_OWNERSHIP_DRIFT"],
    "undeclared schema uncertainty arm attack",
  );
  const extraUncertaintyValidator = compileStrictSchemas(
    extraUncertaintyArm.requestSchema,
    extraUncertaintyArm.draftOutcomeSchema,
  ).outcome;
  const extraUncertaintyOutcome = buildDraftOutcome(fixtures.baseRequest);
  extraUncertaintyOutcome.uncertainties.push({
    code: "UNDECLARED_UNCERTAINTY",
    sourceFields: [],
    ruleId: "RR3-UNDECLARED-001",
    targetContracts: ["uncertainty.inputDomain"],
  });
  assertSchemaResult(
    extraUncertaintyValidator,
    extraUncertaintyOutcome,
    true,
    "undeclared schema uncertainty arm/outcome-schema",
  );
  assert.equal(validateDraftOutcome(extraUncertaintyOutcome), false);

  const reversedPriority = mutatedArtifacts((artifacts) => {
    artifacts.catalog.validationPhases.reverse();
  });
  assertExactDrifts(
    reversedPriority,
    ["VALIDATION_PHASE_PRIORITY_DRIFT"],
    "canonical priority attack",
  );
  const reversedOwnerPriority = mutatedArtifacts((artifacts) => {
    artifacts.catalog.validationErrorOwnership
      .map((owner) => owner.canonicalPriority)
      .reverse()
      .forEach((priority, index) => {
        artifacts.catalog.validationErrorOwnership[index].canonicalPriority =
          priority;
      });
  });
  assertExactDrifts(
    reversedOwnerPriority,
    ["CATALOG_ERROR_OWNERSHIP_DRIFT"],
    "error owner priority attack",
  );

  const reboundArrival = mutatedArtifacts((artifacts) => {
    const fixture = artifacts.fixtures.monotonicityFixtures.find(
      ({ id }) => id === "MONO-ARRIVAL-REVERSED",
    );
    Object.assign(fixture, {
      axis: "departureWindow",
      direction: "non_decreasing",
      mutation: {
        metric: "capacity",
        axis: "departureWindow",
        values: [1, 2, 0, 4, 5],
      },
      expectedViolation: "departureWindow:capacity:non_decreasing",
    });
  });
  assertExactDrifts(
    reboundArrival,
    ["MONOTONIC_NEGATIVE_FIXTURE_DRIFT"],
    "arrival fixture rebound attack",
  );

  const removedViolations = mutatedArtifacts((artifacts) => {
    for (const fixture of artifacts.fixtures.monotonicityFixtures.slice(1)) {
      delete fixture.expectedViolation;
    }
  });
  assertExactDrifts(
    removedViolations,
    ["MONOTONIC_NEGATIVE_FIXTURE_DRIFT"],
    "expectedViolation removal attack",
  );

  const asymmetricWitnessRebound = mutatedArtifacts((artifacts) => {
    const fixture = artifacts.fixtures.triggerWitnessFixtures.find(
      ({ id }) => id === "WITNESS-ASYMMETRIC-STATE-SIGNATURE",
    );
    fixture.witnessMatrix = [[false, true], [true, true]];
  });
  assert.deepEqual(
    classifyTriggerWitnesses(
      asymmetricWitnessRebound.fixtures.triggerWitnessFixtures.at(-1)
        .witnessMatrix,
      true,
    ),
    expectedTriggerWitnessFixtures.at(-1).expected,
  );
  assertExactDrifts(
    asymmetricWitnessRebound,
    ["TRIGGER_WITNESS_FIXTURE_DRIFT"],
    "asymmetric trigger fixture rebound attack",
  );
});

test("Ajv schema validation and JS-only preflight retain separate authority", () => {
  class ExactSevenFieldRequest {}
  const classRequest = Object.assign(
    new ExactSevenFieldRequest(),
    clone(fixtures.baseRequest),
  );
  assertSchemaResult(
    standardValidators.request,
    classRequest,
    true,
    "class-container/schema-cannot-see-prototype",
  );
  assert.deepEqual(validateRequest(classRequest), {
    valid: false,
    errors: [
      expectedOwnedError("REQUEST_NOT_PLAIN_OBJECT", "$request"),
    ],
  });

  const nullPrototypeRequest = Object.assign(
    Object.create(null),
    clone(fixtures.baseRequest),
  );
  assertSchemaResult(
    standardValidators.request,
    nullPrototypeRequest,
    true,
    "null-prototype/schema",
  );
  assert.equal(validateRequest(nullPrototypeRequest).valid, true);

  const symbolRequest = clone(fixtures.baseRequest);
  symbolRequest[Symbol("schema-invisible")] = true;
  assertSchemaResult(
    standardValidators.request,
    symbolRequest,
    true,
    "symbol-key/schema-cannot-see-symbol",
  );
  assert.equal(validateRequest(symbolRequest).valid, false);
});

test("trigger state signatures preserve length, order, and asymmetric states", () => {
  assert.equal(triggerStateSignature([false]), "1:0");
  assert.equal(triggerStateSignature([false, false]), "2:00");
  assert.notEqual(
    triggerStateSignature([false]),
    triggerStateSignature([false, false]),
  );
  assert.notEqual(
    triggerStateSignature([false, true]),
    triggerStateSignature([true, false]),
  );
  assert.deepEqual(
    classifyTriggerWitnesses(
      [
        [false, true],
        [true, false],
      ],
      true,
    ),
    {
      emit: true,
      basis: "possible_feasible_extreme",
      sources: ["input_domain", "event_placement"],
    },
  );
});

test("v3 publishes separate strict request and non-numeric draft-outcome roots", () => {
  assert.equal(requestSchema.$id, catalog.requestSchemaId);
  assert.equal(draftOutcomeSchema.$id, catalog.draftOutcomeSchemaId);
  assert.notEqual(requestSchema.$id, draftOutcomeSchema.$id);
  assert.equal(requestSchema.$ref, "#/$defs/RouteRealityRequest");
  assert.equal(Object.hasOwn(requestSchema, "oneOf"), false);
  const request = requestSchema.$defs.RouteRealityRequest;
  assert.equal(request.type, "object");
  assert.equal(request.minProperties, 7);
  assert.equal(request.maxProperties, 7);
  assert.equal(request.additionalProperties, false);
  assert.deepEqual(request.required, requestFields);
  assert.deepEqual(Object.keys(request.properties), requestFields);
  assert.equal(JSON.stringify(requestSchema).includes("RouteRealityOutput"), false);

  const draftText = JSON.stringify(draftOutcomeSchema);
  assert.equal(draftText.includes('"type":"number"'), false);
  assert.equal(draftText.includes('"type":"integer"'), false);
  assert.equal(draftText.includes("ValidResultBody"), false);
  assert.equal(draftText.includes("baselineSightseeingEquivalentDays"), false);
  assert.equal(
    draftOutcomeSchema.$defs.PendingPolicyPackVersion.type,
    "null",
  );
  assert.equal(
    draftOutcomeSchema.$defs.PolicyPendingOutcome.allOf[0].oneOf.length,
    4,
  );
  const schemaAssumptions =
    draftOutcomeSchema.$defs.Assumptions.prefixItems.map((item) => {
      const properties = item.allOf[1].properties;
      return {
        id: properties.id.const,
        sourceFields: properties.sourceFields.const,
        ruleId: properties.ruleId.const,
        targetContracts: properties.targetContracts.const,
      };
    });
  assert.deepEqual(schemaAssumptions, fixtures.expectedAssumptions);
});

test("every declared fixture is executable and no prose-only property escapes", async (t) => {
  const groups = [
    fixtures.scenarios,
    fixtures.matrices,
    fixtures.triggerWitnessFixtures,
    fixtures.monotonicityFixtures,
  ];
  const declared = groups.flat().map(({ id }) => id);
  assert.equal(new Set(declared).size, declared.length);
  assert.deepEqual(declared, requiredFixtureIds);
  assert.deepEqual(
    fixtures.matrices.map(({ id }) => id),
    Object.keys(requiredMatrixContracts),
  );
  for (const [id, expected] of Object.entries(requiredMatrixContracts)) {
    const matrix = fixtures.matrices.find((item) => item.id === id);
    assert.ok(matrix, `required matrix removed: ${id}`);
    assert.deepEqual(matrix, { id, ...expected });
  }
  const fixtureText = JSON.stringify(fixtures);
  assert.equal(fixtureText.includes("expectedProperty"), false);
  assert.equal(fixtureText.includes("inputExpression"), false);
  assert.equal(fixtures.modelVersion, modelVersion);
  assert.equal(fixtures.policyPackVersion, null);
  assert.equal(fixtures.status, "INTERNAL_CONTRACT_FIXTURES_ONLY");
  assert.equal(fixtures.fixtureRules.everyDeclaredIdMustExecute, true);
  assert.equal(fixtures.fixtureRules.unknownAssertionKindsFail, true);
  assert.equal(fixtures.fixtureRules.evalAllowed, false);
  assert.equal(fixtures.fixtureRules.skipHandlersAllowed, false);
  assert.equal(fixtures.fixtureRules.numericPolicyWitnessesAreOrdinalOnly, true);

  assert.deepEqual(catalog.timeWindowOrder, [
    "before_09",
    "09_12",
    "12_15",
    "15_18",
    "after_18",
  ]);
  assert.deepEqual(catalog.paceOrder, ["fast", "balanced", "slow"]);
  const catalogMonotonicChecks = catalog.monotonicity.flatMap((item) => {
    const checks = [];
    if (item.capacityDirection) {
      checks.push(["capacity", item.axis, item.capacityDirection]);
    }
    if (item.burdenDirection) {
      checks.push(["burden", item.axis, item.burdenDirection]);
    }
    return checks;
  });
  assert.deepEqual(catalogMonotonicChecks, monotonicChecks);

  const executed = [];
  for (const scenario of fixtures.scenarios) {
    await t.test(scenario.id, () => executeScenario(scenario));
    executed.push(scenario.id);
  }
  for (const matrix of fixtures.matrices) {
    await t.test(matrix.id, () => executeMatrix(matrix));
    executed.push(matrix.id);
  }
  for (const fixture of fixtures.triggerWitnessFixtures) {
    await t.test(fixture.id, () => {
      assert.equal(fixture.assertionKind, "trigger_witness_basis");
      assert.deepEqual(
        classifyTriggerWitnesses(
          fixture.witnessMatrix,
          fixture.hasInputUncertainty,
        ),
        fixture.expected,
      );
      if (fixture.id === "WITNESS-FULLY-KNOWN-PLACEMENT-POSSIBLE") {
        const source = fixtures.scenarios.find(
          ({ id }) => id === fixture.sourceScenarioId,
        );
        assert.ok(source);
        assert.deepEqual(source.override, {
          totalNights: 2,
          crossCityMoves: 1,
          airportStationTransfers: 1,
          hotelChanges: 0,
        });
        assert.notEqual(fixture.expected.basis, "confirmed");
      }
    });
    executed.push(fixture.id);
  }
  const negativeMonotonicSemantics = new Set();
  for (const fixture of fixtures.monotonicityFixtures) {
    await t.test(fixture.id, () => {
      assert.equal(fixture.assertionKind, "monotonicity_contract");
      const result = validateOrdinalMonotonicity(monotonicityCandidate(fixture));
      assert.equal(result.valid, fixture.expectedValid);
      if (fixture.expectedValid) {
        assert.deepEqual(result.violations, []);
      } else {
        assert.equal(Object.hasOwn(fixture, "expectedViolation"), true);
        assert.equal(typeof fixture.expectedViolation, "string");
        assert.notEqual(fixture.expectedViolation.length, 0);
        assert.deepEqual(result.violations, [fixture.expectedViolation]);
        const semanticKey = [
          fixture.axis,
          fixture.metric,
          fixture.direction,
        ].join(":");
        assert.equal(
          negativeMonotonicSemantics.has(semanticKey),
          false,
          `duplicate monotonic negative semantic ${semanticKey}`,
        );
        negativeMonotonicSemantics.add(semanticKey);
      }
    });
    executed.push(fixture.id);
  }
  assert.deepEqual(
    [...negativeMonotonicSemantics].sort(compareCodePoint),
    expectedNegativeMonotonicContracts
      .map(({ axis, metric, direction }) => `${axis}:${metric}:${direction}`)
      .sort(compareCodePoint),
  );
  assert.deepEqual(executed, requiredFixtureIds);
});

test("ordinal witnesses reject incomplete and non-finite sequences", () => {
  const validFixture = fixtures.monotonicityFixtures.find(
    ({ id }) => id === "MONO-ORDINAL-VALID",
  );
  assert.ok(validFixture);
  const shortArrival = monotonicityCandidate(validFixture);
  shortArrival.capacity.arrivalWindow = [5];
  assert.equal(validateOrdinalMonotonicity(shortArrival).valid, false);
  const nonFinitePace = monotonicityCandidate(validFixture);
  nonFinitePace.burden.travellerPace = [1, Number.NaN, 3];
  assert.equal(validateOrdinalMonotonicity(nonFinitePace).valid, false);
});

test("request and outcome authorization boundaries remain internal-only", () => {
  assert.equal(catalog.policyPackVersion, null);
  assert.deepEqual(catalog.authorization, {
    publicImplementationAuthorized: false,
    indexablePageAuthorized: false,
    apiAuthorized: false,
    numericPolicyApproved: false,
  });
  const output = buildDraftOutcome(fixtures.baseRequest);
  assert.equal(output.status, "policy_pending");
  assert.equal(output.result, null);
  assert.equal(output.decisionUseful, false);
  assert.equal(validateRequest(output).valid, false);
  assert.equal(validateDraftOutcome(output), true);
  assert.equal(containsNumber(output), false);
});
