"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GlobalLoading() {
  return (
    <div className="h-dvh w-full flex items-center justify-center flex-col">
      <div className="w-40 relative h-40 animate-pulse">
        <Image
          src={"/smkmutu.png"}
          alt="smkmutu"
          fill
          className="object-contain"
        />
      </div>
      <Button color="blue" className="animate-pulse">
        SMK Muhammadiyah 1 Jakarta
      </Button>
    </div>
  );
}
