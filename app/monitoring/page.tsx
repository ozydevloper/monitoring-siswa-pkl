"use client";
import { CardParent } from "@/components/ui/card";
import { TabelMurid, TabelTempatPKL } from "@/components/ui/tabel";
import { apiFetch } from "@/lib/signature";
import { useQuery } from "@tanstack/react-query";
import { DoorOpen, Loader, RefreshCcw } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  AbsensiMasuk,
  AbsensiPulang,
  Prisma,
} from "../generated/prisma/client";
import {
  ItemInbox,
  ItemInboxBelumAbsen,
} from "@/components/ui/item-approval-inbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const [onRefetch, setOnRefetch] = useState<boolean>(false);

  const item_inbox_lengkap = useQuery<{
    data: Prisma.SiswaGetPayload<{
      select: {
        name: true;
        absensi_hari: {
          select: {
            absensi_masuk_relation: true;
            absensipulang_relation: true;
          };
        };
      };
    }>[];
  }>({
    queryKey: ["inbox"],
    queryFn: () =>
      apiFetch("api/query/inbox/lengkapInbox").then((e) => e.json()),
  });

  return (
    <div className="w-full h-dvh flex justify-center">
      <div
        onClick={() => redirect("/logout")}
        className="right-3  bg-red-100  p-2 rounded-md hidden md:absolute md:block text-red-500 top-2"
      >
        <DoorOpen />
      </div>
      <div className="w-full md:max-w-3xl grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-2 p-2">
        <CardParent className="w-full h-full">
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
          <div className="hidden w-full h-full relative md:block">
            <Image
              alt="smk muhammadiyah 1 jakarta"
              src="/smkmutu.png"
              fill
              className="object-contain"
            />
          </div>
        </CardParent>
        <CardParent className="bg-yellow-50 w-full h-full">
          <div className="w-full flex items-center justify-between">
            <div>
              <div className="whitespace-nowrap text-muted-foreground font-bold text-base">
                Approval Inbox
              </div>
              <div className="text-xs font-light text-muted-foreground">
                Hari ini
              </div>
            </div>
            <Button
              color="blue"
              onClick={() => {
                setOnRefetch(true);
                item_inbox_lengkap.refetch().then(() => setOnRefetch(false));
              }}
            >
              <RefreshCcw
                size={15}
                className={onRefetch ? "animate-spin" : ""}
              />
            </Button>
          </div>
          {item_inbox_lengkap.isLoading ? (
            <CardParent className="bg-background w-full h-full overflow-hidden overflow-y-scroll items-center justify-center">
              <Loader size={25} className="animate-spin" />
            </CardParent>
          ) : item_inbox_lengkap.error ? (
            <CardParent className="bg-background w-full h-full overflow-hidden overflow-y-scroll items-center justify-center">
              {JSON.stringify(item_inbox_lengkap.error)}
            </CardParent>
          ) : (
            item_inbox_lengkap.data && (
              <CardParent className="bg-background w-full h-64 md:h-full overflow-auto gap-y-1">
                <div className="w-full flex items-center justify-between gap-x-2">
                  <div className="w-full border"></div>
                  <div className="text-muted-foreground">Masuk</div>
                  <div className="w-full border"></div>
                </div>
                {!item_inbox_lengkap.data.data
                  ? ""
                  : item_inbox_lengkap.data.data.map((e, i) => {
                      if (e.absensi_hari.length === 0) {
                        return (
                          <ItemInboxBelumAbsen
                            key={i}
                            name={e.name}
                            type="Masuk"
                          />
                        );
                      } else if (e.absensi_hari.length > 0) {
                        if (!e.absensi_hari[0].absensi_masuk_relation) {
                          return (
                            <ItemInboxBelumAbsen
                              key={i}
                              name={e.name}
                              type="Masuk"
                            />
                          );
                        } else {
                          return (
                            <ItemInbox
                              data={
                                e.absensi_hari[0]
                                  .absensi_masuk_relation as AbsensiMasuk
                              }
                              key={i}
                            />
                          );
                        }
                      }
                    })}
                <div className="w-full flex items-center justify-between gap-x-2 mt-5">
                  <div className="w-full border"></div>
                  <div className="text-muted-foreground">Pulang</div>
                  <div className="w-full border"></div>
                </div>
                {!item_inbox_lengkap.data.data
                  ? ""
                  : item_inbox_lengkap.data.data.map((e, i) => {
                      if (e.absensi_hari.length === 0) {
                        return (
                          <ItemInboxBelumAbsen
                            key={i}
                            name={e.name}
                            type="Pulang"
                          />
                        );
                      } else if (e.absensi_hari.length > 0) {
                        if (!e.absensi_hari[0].absensipulang_relation) {
                          return (
                            <ItemInboxBelumAbsen
                              key={i}
                              name={e.name}
                              type="Pulang"
                            />
                          );
                        } else {
                          return (
                            <ItemInbox
                              data={
                                e.absensi_hari[0]
                                  .absensipulang_relation as AbsensiPulang
                              }
                              key={i}
                            />
                          );
                        }
                      }
                    })}
              </CardParent>
            )
          )}
        </CardParent>
        <TabelMurid />
        <TabelTempatPKL />
      </div>
    </div>
  );
}
