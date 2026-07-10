import type { Metadata } from "next";
import MotionLab from "../../components/motion-lab/MotionLab";

export const metadata: Metadata = {
  title: "Beijing Motion Lab",
  description: "Private watercolor reveal prototype for route-story testing.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function MotionLabPage() {
  return <MotionLab />;
}
