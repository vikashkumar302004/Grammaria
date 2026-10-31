import { NextResponse } from "next/server";
import { authenticate, createSession, roleHome } from "@/lib/auth";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (!body.email || !body.password) {
    return NextResponse.json({ message: "Enter both email and password." }, { status: 400 });
  }

  const user = await authenticate(body.email, body.password);
  if (!user) {
    return NextResponse.json({ message: "The credentials do not match our royal records." }, { status: 401 });
  }

  await createSession(user);
  return NextResponse.json({ user, redirectTo: roleHome(user.role) });
}
