"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton({ className = "portal-logout", label = "Leave portal" }: { className?: string; label?: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return <button className={className} onClick={logout}><LogOut /> {label}</button>;
}
