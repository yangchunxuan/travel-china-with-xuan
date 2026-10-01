/**
 * A cached HTML document can outlive its Next.js chunks after a Pages deploy.
 * Keep this bootstrap independent of the React bundle so a missing chunk can
 * retry the document once through its index.html path before the page stays
 * inert. The distinct path uses a separate edge cache key where query strings
 * are ignored; it remains a best-effort fallback if that key is also stale.
 */
export const homegroundAssetRecoveryBootstrap = `(() => {
  var retryParameter = "_hgjs";
  var retrying = false;
  var armed = true;
  var initialUrl = new URL(window.location.href);
  var alreadyRetried = initialUrl.searchParams.has(retryParameter);

  if (alreadyRetried) {
    initialUrl.searchParams.delete(retryParameter);
    var canonicalPath = initialUrl.pathname.replace(/index\\.html$/, "");
    try {
      window.history.replaceState(
        window.history.state,
        "",
        canonicalPath + initialUrl.search + initialUrl.hash
      );
    } catch {
      // The retry document still works if this browser blocks history edits.
    }
  }

  window.addEventListener("load", function () { armed = false; }, { once: true });

  function retryDocument() {
    if (!armed || retrying || alreadyRetried) return;
    try {
      var url = new URL(window.location.href);
      retrying = true;
      url.pathname = /\\/index\\.html$/.test(url.pathname)
        ? url.pathname.replace(/index\\.html$/, "")
        : url.pathname.replace(/\\/?$/, "/") + "index.html";
      url.searchParams.set(retryParameter, String(Date.now()));
      window.location.replace(url.href);
    } catch {
      retrying = false;
    }
  }

  window.addEventListener("error", function (event) {
    var target = event.target;
    if (!target || target.tagName !== "SCRIPT" || !target.src) return;
    try {
      var source = new URL(target.src, window.location.href);
      if (source.origin === window.location.origin &&
          source.pathname.indexOf("/_next/static/") === 0) {
        retryDocument();
      }
    } catch {
      // An unrelated script error should not trigger navigation.
    }
  }, true);

  window.addEventListener("unhandledrejection", function (event) {
    var reason = event.reason;
    if (!reason) return;
    var message = typeof reason.message === "string" ? reason.message : "";
    if (reason.name === "ChunkLoadError" ||
        /Loading chunk .+ failed/.test(message)) {
      retryDocument();
    }
  });
})();`;
