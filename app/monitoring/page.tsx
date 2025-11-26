"use client";
import { CardParent } from "@/components/ui/card";
import { ItemInbox } from "@/components/ui/item-approval-inbox";
import { TabelMurid, TabelTempatPKL } from "@/components/ui/tabel";
import { DoorOpen } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();
  return (
    <div className="flex w-full h-dvh items-center flex-col p-2 md:p-0 md:pt-2 gap-y-2">
      <div
        onClick={() => redirect("/logout")}
        className="right-3  bg-red-100  p-2 rounded-md hidden md:absolute md:block text-red-500"
      >
        <DoorOpen />
      </div>

      <div className="flex flex-col md:flex-row gap-1.5 w-full md:max-w-fit items-center md:items-start justify-center">
        <div className="max-h-fit w-full md:max-w-2xs">
          <CardParent className="w-full bg-green-50 flex-row items-center justify-between">
            <div className="flex flex-col w-full truncate ">
              <p className="font-bold text-base text-muted-foreground">
                {session?.user?.name ?? "Nama Guru"}
              </p>
              <p className="text-xs font-light text-muted-foreground">
                SMK Muhammadiyah 1 Jakarta
              </p>
            </div>
            <div
              className="w-fit h-fit bg-red-100 p-1 rounded-md md:hidden text-red-500 "
              onClick={() => redirect("/logout")}
            >
              <DoorOpen size={20} />
            </div>
          </CardParent>
          <div className="w-full h-49 relative hidden md:block">
            <Image
              alt="smk muhammadiyah 1 jakarta"
              src="/smkmutu.png"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="border w-xs md:w-0 md:hidden"></div>

        <CardParent className="bg-yellow-50 w-full h-64 max-h-64 md:w-md">
          <div className="whitespace-nowrap text-muted-foreground font-bold text-base">
            Approval Inbox
          </div>
          <div className="text-xs font-light text-muted-foreground">
            Hari ini
          </div>
          <CardParent className="bg-background w-full h-full overflow-hidden overflow-y-scroll">
            <ItemInbox />
            <ItemInbox />
            <ItemInbox />
            <ItemInbox />
            <ItemInbox />
            <ItemInbox />
            <ItemInbox />
            <ItemInbox />
          </CardParent>
        </CardParent>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        <TabelMurid />
        <TabelTempatPKL />
      </div>
    </div>
  );
}
