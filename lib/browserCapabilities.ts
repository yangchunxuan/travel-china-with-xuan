/** Subscribe without assuming a WebView implements MediaQueryList as EventTarget. */
export function subscribeMediaQuery(query: MediaQueryList, listener: () => void): () => void {
  if (typeof query.addEventListener === "function" && typeof query.removeEventListener === "function") {
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }
  if (typeof query.addListener === "function" && typeof query.removeListener === "function") {
    query.addListener(listener);
    return () => query.removeListener(listener);
  }
  return () => {};
}

/** A missing native dialog keeps the original contact link usable. */
export function supportsModalDialog(dialog?: HTMLDialogElement): boolean {
  if (!dialog && typeof document === "undefined") return false;
  try {
    const candidate = dialog ?? document.createElement("dialog");
    return typeof candidate.showModal === "function" && typeof candidate.close === "function";
  } catch {
    return false;
  }
}

export function closeModalDialog(dialog?: HTMLDialogElement | null): void {
  if (!dialog || typeof dialog.close !== "function" || !dialog.open) return;
  try {
    dialog.close();
  } catch {
    dialog.removeAttribute("open");
  }
}

/** Open before claiming a link, so a failed modal leaves its native action intact. */
export function tryOpenModalDialog(dialog?: HTMLDialogElement | null): boolean {
  if (!dialog || !supportsModalDialog(dialog)) return false;
  try {
    if (!dialog.open) dialog.showModal();
    return true;
  } catch {
    closeModalDialog(dialog);
    return false;
  }
}
