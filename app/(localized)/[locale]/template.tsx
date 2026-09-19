import type { ReactNode } from "react";
import { PageArrivalFrame } from "../../../components/PageArrivalFrame";

export default function LocalizedRouteTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return <PageArrivalFrame>{children}</PageArrivalFrame>;
}
