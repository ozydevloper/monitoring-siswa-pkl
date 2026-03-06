import { NextAuthRequest } from "next-auth";
import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth(async (request: NextAuthRequest) => {
  if (request.nextUrl.pathname.startsWith("/api/query")) {
    const signature = await request.headers.get("nothing-to-see");
    if (!signature) return NextResponse.json({ data: "Request ga lengkap" });
    NextResponse.next();
  }

  if (request.nextUrl.pathname === "/" && !request.auth) {
    return NextResponse.redirect(new URL("/login/siswa", request.url));
  }

  if (request.nextUrl.pathname === "/" && request.auth?.user?.role === "GURU") {
    return NextResponse.redirect(new URL("/monitoring", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/logout") && !request.auth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    request.nextUrl.pathname === "/" &&
    request.auth?.user?.role === "SISWA"
  ) {
    return NextResponse.redirect(new URL("/siswa", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/login") && request.auth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/siswa") &&
    request.auth?.user?.role === "GURU"
  ) {
    return NextResponse.redirect(new URL("/monitoring", request.url));
  }
  if (
    request.nextUrl.pathname.startsWith("/monitoring") &&
    request.auth?.user?.role === "SISWA"
  ) {
    return NextResponse.redirect(new URL("/siswa", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/auth/error") && request.auth) {
    return NextResponse.redirect(new URL("/", request.url));
  }
});
