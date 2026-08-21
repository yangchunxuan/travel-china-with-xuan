import { getGuideSearchDocuments } from "../../../../lib/guideSearchRuntime";

export const dynamic = "force-static";

export function GET() {
  return Response.json(getGuideSearchDocuments("en"), {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
