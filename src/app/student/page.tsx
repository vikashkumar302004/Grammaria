import Home from "@/app/page";
import { requireRole } from "@/components/RoleGuard";

export default async function StudentPage() {
  await requireRole("student");
  return <Home />;
}
