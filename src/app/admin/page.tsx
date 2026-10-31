import { AdminDashboard } from "@/components/AdminDashboard";
import { requireRole } from "@/components/RoleGuard";

export default async function AdminPage() {
  const user = await requireRole("admin");
  return <AdminDashboard user={user} />;
}
