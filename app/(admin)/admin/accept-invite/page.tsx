import type { Metadata } from "next";
import { AdminInvitePage } from "../../../../components/admin/AdminInvitePage";

export const metadata: Metadata = {
  title: "设置私有后台密码",
};

export default function AdminAcceptInvitePage() {
  return <AdminInvitePage />;
}
