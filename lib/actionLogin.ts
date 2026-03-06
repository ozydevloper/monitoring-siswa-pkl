import { signOut } from "@/auth";

export function logout() {
  return signOut({ redirectTo: "/login/siswa" });
}
