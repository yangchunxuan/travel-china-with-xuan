import type { Metadata } from "next";
import { AdminInsightsPage } from "../../../components/admin/AdminInsightsPage";

export const metadata: Metadata = {
  title: "已保存询盘洞察",
};

export default function AdminPage() {
  return <AdminInsightsPage />;
}
