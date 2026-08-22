import { getHomepageGuideRailItems } from "../../../../lib/homepageEditorial";

export const dynamic = "force-static";

export function GET() {
  return Response.json(getHomepageGuideRailItems("en"), {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
