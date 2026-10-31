import { requireRole } from "@/components/RoleGuard";
import { TeacherDashboard } from "@/components/TeacherDashboard";

export default async function TeacherPage() {
  const user = await requireRole("teacher");
  return <TeacherDashboard user={user} />;
}
