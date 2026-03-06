import { NextAuthRequest } from "next-auth";
import { auth } from "./auth";
import { NextResponse } from "next/server";

export default async function proxy(request: NextAuthRequest) {
  const session = await auth();

  if (request.nextUrl.pathname.startsWith("/api/query")) {
    const signature = await request.headers.get("nothing-to-see");
    if (!signature) return NextResponse.json({ data: "Request ga lengkap" });
    NextResponse.next();
  }

  if (request.nextUrl.pathname === "/" && !session) {
    return NextResponse.redirect(new URL("/login/siswa", request.url));
  }

  if (request.nextUrl.pathname === "/" && session?.user?.role === "GURU") {
    return NextResponse.redirect(new URL("/monitoring", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/logout") && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname === "/" && session?.user?.role === "SISWA") {
    return NextResponse.redirect(new URL("/siswa", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/login") && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/siswa") &&
    session?.user?.role === "GURU"
  ) {
    return NextResponse.redirect(new URL("/monitoring", request.url));
  }
  if (
    request.nextUrl.pathname.startsWith("/monitoring") &&
    session?.user?.role === "SISWA"
  ) {
    return NextResponse.redirect(new URL("/siswa", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/auth/error") && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
