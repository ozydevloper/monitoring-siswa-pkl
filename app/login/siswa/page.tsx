"use client";
import { Login } from "@/components/ui/login";
import { useSearchParams } from "next/navigation";

export default function Page() {
  return <Login namePage="Siswa" redirect_to="guru" />;
}
