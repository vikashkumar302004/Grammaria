import { redirect } from "next/navigation";
import { getSessionUser, UserRole } from "@/lib/auth";

export async function requireRole(role: UserRole) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== role) redirect(`/${user.role}`);
  return user;
}
