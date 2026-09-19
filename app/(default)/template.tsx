import type { ReactNode } from "react";
import { PageArrivalFrame } from "../../components/PageArrivalFrame";

export default function DefaultRouteTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return <PageArrivalFrame>{children}</PageArrivalFrame>;
}
