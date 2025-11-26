"use client";
import { CardParent } from "@/components/ui/card";
import {
  IconCheck,
  IconCircle,
  IconInfo,
  IconX,
} from "@/components/ui/icon-status";
import { formatDate } from "@/lib/formatDate";
import { EllipsisVertical } from "lucide-react";
import { TypeStatus } from "../generated/prisma/enums";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/signature";
import { Prisma } from "../generated/prisma/client";

export default function Page() {
  const { data: session } = useSession();

  const getSiswa = useQuery<{
    data: Prisma.SiswaGetPayload<{
      include: {
        absensi_hari: true;
        guru_relation: true;
        tempat_pkl_relation: true;
      };
    }>;
  }>({
    queryKey: ["getSiswa"],
    queryFn: () =>
      apiFetch("/api/query/siswa/getById", {
        method: "POST",
        body: JSON.stringify({
          id: session?.user?.id,
        }),
      }).then((e) => e.json()),
    enabled: !!session,
  });

  const getAbsensiHari = useQuery<{
    data: Prisma.AbsensiHariGetPayload<{
      include: {
        absensi_masuk_id: true;
        absensi_pulang_id: true;
        siswa_relation: true;
      };
    }>;
  }>({
    queryKey: ["absensi_hari"],
    queryFn: () =>
      apiFetch("/api/query/absensi_hari", {
        method: "POST",
        body: JSON.stringify({ id: session?.user?.id }),
      }).then((e) => e.json()),
    enabled: !!session,
  });

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <CardParent className="w-full h-dvh md:max-h-fit md:max-w-md gap-y-2 items-center">
        <CardParent className="flex-row items-center justify-between gap-x-3 w-full">
          <div className="flex flex-col w-full truncate ">
            <p className="font-bold text-base text-muted-foreground">
              {session?.user?.name ?? "Nama Siswa"}
            </p>
            <p className="text-xs font-light text-muted-foreground">
              {getSiswa.data?.data.tempat_pkl_relation.name ?? "Tempat PKL"}
            </p>
            <p className="text-[0.650rem] font-bold text-muted-foreground ">
              {getSiswa.data?.data.guru_relation.name ?? "Nama Guru Monitoring"}
            </p>
          </div>
          <div className="border h-full"></div>

          <div className="font-bold text-xl text-muted-foreground bg-green-100 flex items-center justify-center text-center rounded-md p-1.5 border-2 border-green-200">
            MUTU
          </div>
        </CardParent>
        <div className="border w-xs md:w-sm"></div>
        <CardParent className="w-full flex-row items-center justify-around gap-x-1">
          <div className="border w-xs md:w-sm"></div>
          <CardParent className="min-w-fit">
            <div className="flex items-center justify-between gap-x-2">
              <div className="min-w-fit font-semibold text-muted-foreground">
                Masuk
              </div>
              <div className="border w-full"></div>
            </div>
            <CardParent className="bg-green-100  text-muted-foreground gap-y-1">
              <div className="flex w-full items-center text-center justify-start gap-x-1">
                <div>Jam Masuk:</div>
                <div className="font-bold">
                  {getSiswa.data?.data.tempat_pkl_relation.jam_masuk ?? "-"}
                </div>
              </div>
              <div className="flex w-full items-center text-center justify-start gap-x-1">
                <div>Status:</div>
                <div className="font-bold">-</div>
              </div>
              <div className="flex w-full items-center text-center justify-start gap-x-1">
                <div>Approval:</div>
                <IconX size={15} />
              </div>
            </CardParent>
          </CardParent>

          <div className="border w-xs md:w-sm"></div>
          <CardParent className="min-w-fit">
            <div className="flex items-center justify-between gap-x-2">
              <div className="min-w-fit font-semibold text-muted-foreground">
                Pulang
              </div>
              <div className="border w-full"></div>
            </div>
            <CardParent className="bg-red-100  text-muted-foreground gap-y-1 ">
              <div className="flex w-full items-center text-center justify-start gap-x-1">
                <div>Jam Pulang:</div>
                <div className="font-bold">
                  {getSiswa.data?.data.tempat_pkl_relation.jam_pulang ?? "-"}
                </div>
              </div>
              <div className="flex w-full items-center text-center justify-start gap-x-1">
                <div>Status:</div>
                <div className="font-bold">-</div>
              </div>
              <div className="flex w-full items-center text-center justify-start gap-x-1 ">
                <div>Approval:</div>
                <div>
                  <IconX size={15} />
                </div>
              </div>
            </CardParent>
          </CardParent>

          <div className="border w-xs md:w-sm"></div>
        </CardParent>

        <div className="border w-xs md:w-sm"></div>

        <div className="flex flex-col gap-y-1 w-full h-fit relative">
          <Button color="green" className="text-sm">
            Absen hari ini
          </Button>
        </div>
        <CardParent className="w-full flex flex-row items-center justify-between bg-green-50">
          <div className="flex items-center justify-center w-fit gap-x-1 h-full">
            <IconInfo />

            <div className="border h-full"></div>
            <div className="w-fit font-bold text-muted-foreground">
              {formatDate(new Date())} - Sekarang
            </div>
          </div>
          <div className="h-full flex items-center justify-between gap-x-1">
            <Button color="green">Masuk</Button>
            <EllipsisVertical size={15} />
          </div>
        </CardParent>

        <CardParent className="w-full flex flex-row items-center justify-between bg-red-50 ">
          <div className="flex items-center justify-center w-fit gap-x-1 h-full">
            <IconInfo />
            <div className="border h-full"></div>
            <div className="w-fit font-bold text-muted-foreground ">
              {formatDate(new Date())} - Sekarang
            </div>
          </div>
          <div className="h-full flex items-center justify-between gap-x-1">
            <Button color="red">Pulang</Button>
            <EllipsisVertical size={15} />
          </div>
        </CardParent>
        <div className="border w-xs md:w-sm"></div>
      </CardParent>
    </div>
  );
}
