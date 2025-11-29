"use client";
import { Button } from "@/components/ui/button";
import { CardParent } from "@/components/ui/card";
import { logout } from "@/lib/actionLogin";
import { redirect } from "next/navigation";

export default function Page() {
  return (
    <div className="flex items-center justify-center w-full h-dvh">
      <CardParent>
        <div className="font-bold text-sm text-muted-foreground w-full text-center">
          Yakin ingin keluar?
        </div>
        <CardParent className="flex-row gap-x-1 items-center justify-between w-fit">
          <Button
            onClick={() => logout()}
            color="blue"
            className="text-center w-20"
          >
            Ya
          </Button>
          <Button
            onClick={() => redirect("/")}
            color="red"
            className="text-center w-20"
          >
            Tidak
          </Button>
        </CardParent>
      </CardParent>
    </div>
  );
}
