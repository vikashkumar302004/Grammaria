import { redirect } from "next/navigation";
import { getSessionUser, roleHome } from "@/lib/auth";
import { LoginForm } from "@/components/LoginForm";
import "./login.css";
import "./login-fixes.css";

export default async function LoginPage() {
  const user = await getSessionUser();
  if (user) redirect(roleHome(user.role));
  return <LoginForm />;
}
