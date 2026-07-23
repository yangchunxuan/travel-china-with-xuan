/**
 * A response may update the page only if it still belongs to the latest
 * request and the same authenticated administrator session.
 */
export function canCommitAdminResponse(
  requestEpoch: number,
  requestUserId: string,
  currentEpoch: number,
  currentUserId: string | null,
): boolean {
  return (
    requestEpoch === currentEpoch &&
    requestUserId.length > 0 &&
    requestUserId === currentUserId
  );
}
