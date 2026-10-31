"use client";

import { FormEvent, useState } from "react";
import { BookOpen, Castle, Eye, EyeOff, GraduationCap, LoaderCircle, ShieldCheck, Sparkles } from "lucide-react";

const portals = [
  { role: "Student", email: "student@grammaria.edu", password: "Student@123", icon: GraduationCap, copy: "Enter the atlas, learn and conquer realms." },
  { role: "Teacher", email: "teacher@grammaria.edu", password: "Teacher@123", icon: BookOpen, copy: "Command classes, assaults and learning." },
  { role: "Admin", email: "admin@grammaria.edu", password: "Admin@123", icon: ShieldCheck, copy: "Govern institutions, people and access." },
];

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message ?? "Login failed.");
      window.location.assign(data.redirectTo);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Login failed.");
      setPending(false);
    }
  }

  function choosePortal(portal: (typeof portals)[number]) {
    setEmail(portal.email);
    setPassword(portal.password);
    setError("");
  }

  return (
    <main className="login-realm">
      <div className="login-realm__map" aria-hidden="true" />
      <div className="login-realm__veil" aria-hidden="true" />
      <section className="login-intro">
        <div className="login-crest"><Castle /><span /></div>
        <p className="login-kicker"><Sparkles /> The gates of learning await</p>
        <h1>Grammaria</h1>
        <p className="login-tagline">Master the language.<br />Conquer the world.</p>
        <div className="login-divider"><i /><b>G</b><i /></div>
        <p className="login-lore">One realm. Three callings. Enter through your appointed gate and continue the campaign.</p>
      </section>

      <section className="login-scroll" aria-labelledby="login-title">
        <div className="login-scroll__rod login-scroll__rod--top" />
        <div className="login-scroll__content">
          <header>
            <small>Royal access registry</small>
            <h2 id="login-title">Enter your portal</h2>
            <p>Choose a calling or enter credentials issued by your institution.</p>
          </header>

          <div className="portal-choices">
            {portals.map((portal) => {
              const Icon = portal.icon;
              const selected = email === portal.email;
              return <button type="button" className={selected ? "is-selected" : ""} key={portal.role} onClick={() => choosePortal(portal)}>
                <span><Icon /></span><strong>{portal.role}</strong><small>{portal.copy}</small>
              </button>;
            })}
          </div>

          <form onSubmit={submit}>
            <label>Institutional email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@institution.edu" autoComplete="username" required /></label>
            <label>Password<span className="password-field"><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff /> : <Eye />}</button></span></label>
            {error && <p className="login-error" role="alert">{error}</p>}
            <button className="login-submit" disabled={pending}>{pending ? <><LoaderCircle className="is-spinning" /> Opening the gates</> : <>Enter Grammaria <span>→</span></>}</button>
          </form>
          <p className="login-demo">Prototype access: select a portal to load its demo credentials.</p>
        </div>
        <div className="login-scroll__rod login-scroll__rod--bottom" />
      </section>
    </main>
  );
}
