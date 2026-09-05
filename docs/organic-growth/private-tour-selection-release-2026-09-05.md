# Private-tour selection release order

Local implementation only; no remote migration, Edge deployment or production inquiry was performed during this change.

The homepage email contract accepts an optional `productInterest.selection` with exactly `packageId` and numeric `travelers` (2 or 4). Package IDs are checked against the selected tour. The canonical product name is checked server-side; customer names, prices and free text are rejected. Old email-only and product-identity-only requests retain their existing semantic hash shape. A changed selection changes the semantic hash, so reusing a submission key with a changed selection remains a conflict.

Apply in this order when release is authorized:

1. Deploy `notify-inquiries`, including its updated shared inquiry-context module. It can process old jobs and the new optional selection.
2. Apply `202609050001_homeground_private_tour_selection.sql`. It preserves the existing RPC signature, transaction, rate limits, idempotency and outbox. It also adds the published forest-tour name missing from the previous database allowlist. It accepts old request shapes and stores the validated selection under `answers_json.productInterest.selection`.
3. Deploy `v1-inquiries` with the updated contract and context module. Its existing traffic wrapper passes the additional JSON through to the revised RPC.
4. Release the frontend that sends the selection. Verify one authorized test inquiry per Beijing service version reaches storage and both notification formats with the selected 2- or 4-person basis. Check an unchanged retry keeps one inquiry and a changed selection with the same key returns a conflict.

Deploying the frontend or intake before the database migration can reject new requests. Keep the new notification worker in place if the frontend is rolled back: stored jobs with selections must remain readable. Do not edit or replay the old migration, bulk-push unreviewed migrations, or rewrite existing inquiry rows to add inferred selections.

The technical homepage snapshot and `informationStatus` keep their existing shape for compatibility; they describe the absence of a full itinerary brief. Notification text explicitly distinguishes a recorded service/group selection from uncollected dates, traveller identities, budget and free text.

Validation: contract tests cover all tour/package/group combinations and locales, reject partial/extra/forged fields, and compare old semantic shapes. Stubbed Edge tests exercise the real intake and notification handlers without network delivery. SQL checks verify canonical names and strict JSON construction; no local PostgreSQL executable was available, so the migration still needs database execution verification in the authorized release environment.
