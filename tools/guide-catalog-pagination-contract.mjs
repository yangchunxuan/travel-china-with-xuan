import { parseFragment } from "parse5";

const canonicalGuideCatalogPageNamePattern = /^(?:[2-9]|[1-9]\d+)$/;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function isCanonicalGuideCatalogPageName(value) {
  return canonicalGuideCatalogPageNamePattern.test(value);
}

export function getGuideCatalogRoutePattern(guideHubRoute) {
  if (!guideHubRoute.startsWith("/") || !guideHubRoute.endsWith("/")) {
    throw new TypeError("Guide catalog routes must be root-relative and slash-terminated.");
  }

  return new RegExp(
    `^${escapeRegExp(guideHubRoute)}(?:page/(?:[2-9]|[1-9]\\d+)/)?$`,
  );
}

function documentAnchorHrefs(html) {
  const fragment = parseFragment(html);
  const hrefs = [];
  const nodes = [fragment];

  while (nodes.length > 0) {
    const node = nodes.pop();
    if (!node) continue;

    if (node.tagName === "a") {
      const href = node.attrs?.find((attribute) => attribute.name === "href")?.value;
      if (href) hrefs.push(href);
    }
    if (node.childNodes) {
      for (let index = node.childNodes.length - 1; index >= 0; index -= 1) {
        nodes.push(node.childNodes[index]);
      }
    }
  }

  return hrefs;
}

export function getSameOriginAnchorPathnames(html, currentRoute, siteUrl) {
  const site = new URL(siteUrl);
  const documentUrl = new URL(currentRoute, site);
  const pathnames = [];

  for (const href of documentAnchorHrefs(html)) {
    let target;
    try {
      target = new URL(href, documentUrl);
    } catch {
      continue;
    }
    if (target.origin === site.origin) pathnames.push(target.pathname);
  }

  return pathnames;
}
