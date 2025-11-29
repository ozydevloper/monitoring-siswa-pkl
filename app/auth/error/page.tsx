"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function ErrorPage() {
  return (
    <div className="w-full flex items-center justify-center h-dvh">
      <div className="text-center justify-center gap-y-1 flex flex-col items-center text-xs">
        <div className="w-40 relative h-40">
          <Image
            src={"/smkmutu.png"}
            alt="smkmutu"
            fill
            className="object-contain"
          />
        </div>
        <Button color="red"> Gagal Login</Button>
        Kembali ke halaman login
        <div className="w-full flex items-center justify-center gap-x-1">
          <Button color="blue" onClick={() => redirect("/login/siswa")}>
            Siswa
          </Button>
          <Button color="blue" onClick={() => redirect("/login/guru")}>
            Guru
          </Button>
        </div>
      </div>
    </div>
  );
}
