import { BookOpenCheck, Castle, ChartNoAxesCombined, Crown, GraduationCap, ScrollText, ShieldCheck, Swords, Users } from "lucide-react";
import Link from "next/link";
import { AuthUser, UserRole } from "@/lib/auth";
import { LogoutButton } from "./LogoutButton";
import "@/app/portal.css";

const content: Record<UserRole, { label: string; title: string; intro: string; stats: [string, string][]; actions: [string, string, typeof Users][] }> = {
  student: { label: "Student campaign", title: "The Atlas Awaits", intro: "Continue your grammar campaign, strengthen weak realms and prepare for the next classroom assault.", stats: [["Realms secured", "6 / 18"], ["Current level", "12"], ["Battle accuracy", "84%"]], actions: [["Enter world atlas", "Continue the active learning campaign", Castle], ["Practice weak realms", "Concordia and Voicelands need attention", BookOpenCheck], ["Review battle history", "See results from previous assaults", ScrollText]] },
  teacher: { label: "Teacher command", title: "Class Command Hall", intro: "Prepare learning campaigns, direct live assaults and understand where every student needs support.", stats: [["Active classes", "4"], ["Students", "126"], ["Avg. accuracy", "78%"]], actions: [["Build an assault", "Choose topics, difficulty and battle rules", Swords], ["Manage classes", "Students, sections and access registry", Users], ["Open class intelligence", "Topic mastery and intervention insights", ChartNoAxesCombined]] },
  admin: { label: "Administrator council", title: "Realm Administration", intro: "Govern institutions, user access and the operational health of the Grammaria platform.", stats: [["Institutions", "3"], ["Total users", "842"], ["System status", "Stable"]], actions: [["Manage institutions", "Schools, licenses and academic years", Crown], ["Access registry", "Teachers, students and role permissions", ShieldCheck], ["Platform reports", "Usage, learning and system intelligence", ChartNoAxesCombined]] },
};

export function PortalDashboard({ user }: { user: AuthUser }) {
  const page = content[user.role];
  const RoleIcon = user.role === "student" ? GraduationCap : user.role === "teacher" ? BookOpenCheck : ShieldCheck;
  return <main className={`portal-shell portal-shell--${user.role}`}>
    <div className="portal-shell__map" /><div className="portal-shell__veil" />
    <header className="portal-header"><Link href="/" className="portal-brand"><Castle /><span><strong>Grammaria</strong><small>{page.label}</small></span></Link><div className="portal-user"><span><RoleIcon /></span><div><strong>{user.name}</strong><small>{user.subtitle}</small></div><LogoutButton /></div></header>
    <section className="portal-hero"><small>Welcome to your appointed command</small><h1>{page.title}</h1><p>{page.intro}</p></section>
    <section className="portal-stats">{page.stats.map(([label,value])=><article key={label}><small>{label}</small><strong>{value}</strong></article>)}</section>
    <section className="portal-actions">{page.actions.map(([title,copy,Icon],index)=><article key={title}><span>0{index+1}</span><div className="portal-actions__icon"><Icon /></div><div><h2>{title}</h2><p>{copy}</p></div><button aria-label={`Open ${title}`}>→</button></article>)}</section>
    <footer><span>Secure role: {user.role}</span><span>Backend session active</span></footer>
  </main>;
}
