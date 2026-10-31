import { cookies } from "next/headers";

export type UserRole = "student" | "teacher" | "admin";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subtitle: string;
};

type StoredUser = AuthUser & { password: string };

const users: StoredUser[] = [
  { id: "student-arjun", name: "Arjun Verma", email: "student@grammaria.edu", password: "Student@123", role: "student", subtitle: "Class 10 · Section A" },
  { id: "teacher-meera", name: "Meera Sharma", email: "teacher@grammaria.edu", password: "Teacher@123", role: "teacher", subtitle: "English Faculty · Class Commander" },
  { id: "admin-vikash", name: "Vikash Kumar", email: "admin@grammaria.edu", password: "Admin@123", role: "admin", subtitle: "Realm Administrator" },
];

const COOKIE_NAME = "grammaria_session";
const encoder = new TextEncoder();

function toAuthUser(user: StoredUser): AuthUser {
  return { id: user.id, name: user.name, email: user.email, role: user.role, subtitle: user.subtitle };
}

function sessionSecret() {
  return process.env.SESSION_SECRET ?? "grammaria-local-development-secret-change-before-production";
}

function encode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

async function signature(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(sessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signed = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Buffer.from(signed).toString("base64url");
}

export async function authenticate(email: string, password: string): Promise<AuthUser | null> {
  const match = users.find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password,
  );
  if (!match) return null;
  return toAuthUser(match);
}

export async function createSession(user: AuthUser) {
  const payload = encode(JSON.stringify({ userId: user.id, expiresAt: Date.now() + 1000 * 60 * 60 * 12 }));
  const token = `${payload}.${await signature(payload)}`;
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getSessionUser(): Promise<AuthUser | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const [payload, suppliedSignature] = token.split(".");
  if (!payload || !suppliedSignature || (await signature(payload)) !== suppliedSignature) return null;

  try {
    const session = JSON.parse(decode(payload)) as { userId: string; expiresAt: number };
    if (session.expiresAt < Date.now()) return null;
    const match = users.find((user) => user.id === session.userId);
    if (!match) return null;
    return toAuthUser(match);
  } catch {
    return null;
  }
}

export function roleHome(role: UserRole) {
  return `/${role}`;
}
