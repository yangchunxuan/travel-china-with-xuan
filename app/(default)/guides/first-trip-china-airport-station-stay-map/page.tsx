import {
  FIRST_TRIP_TEN_CITY_GUIDE_ID,
  FirstTripTenCityMapPage,
} from "../../../../components/FirstTripTenCityMapPage";
import { buildEditorialGuideMetadata } from "../../../../lib/editorialGuideRuntime";
import { getGuideEntry } from "../../../../lib/guideRegistry";

export const dynamic = "force-static";

export function generateMetadata() {
  return buildEditorialGuideMetadata(
    getGuideEntry(FIRST_TRIP_TEN_CITY_GUIDE_ID, "en"),
    "en",
  );
}

export default function FirstTripTenCityMapRoute() {
  return <FirstTripTenCityMapPage />;
}
