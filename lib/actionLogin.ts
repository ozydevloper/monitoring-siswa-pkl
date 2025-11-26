import { signOut } from "next-auth/react";

export function logout() {
  return signOut({ redirectTo: "/login/siswa" });
}
