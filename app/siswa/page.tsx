"use client";
import { CardParent } from "@/components/ui/card";
import { IconCheck, IconInfo, IconX } from "@/components/ui/icon-status";
import { DoorOpen, Loader, LucideLoader, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/signature";
import {
  AbsensiMasuk,
  AbsensiPulang,
  Prisma,
} from "../generated/prisma/client";
import { redirect } from "next/navigation";
import { useState } from "react";
import CardAbsensiMasuk, {
  CardAbsensiPulang,
} from "@/components/ui/card-absensi";
import {
  CardHistoryAbsensiHari,
  CardHistoryAbsensiMasuk,
  CardHistoryAbsensiPulang,
} from "@/components/ui/card-history-absensi";
import { FormAbsensi } from "@/components/ui/form-absensi";

export default function Page() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [onCreate, setOnCreate] = useState<boolean>(false);
  const [onRefreshAbsensiHari, setOnRefreshAbsensiHari] =
    useState<boolean>(false);
  const [onRefreshGetSiswa, setOnRefreshGetSiswa] = useState<boolean>(false);

  const getSiswa = useQuery<{
    data: Prisma.SiswaGetPayload<{
      include: {
        absensi_hari: {
          include: {
            absensi_masuk_relation: {
              include: {
                absensi_hari: true;
              };
            };
            absensipulang_relation: {
              include: {
                absensi_hari: true;
              };
            };
          };
        };
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
        absensi_masuk_relation: true;
        absensipulang_relation: true;
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

  const mutationAbsensiHari = useMutation({
    mutationFn: () =>
      apiFetch("/api/query/absensi_hari/createById", {
        method: "POST",
        body: JSON.stringify({ id: session?.user?.id }),
      }).then((e) => e.json()),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["absensi_hari"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getSiswa"],
      });
    },
  });

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <FormAbsensi />

      <CardParent className="w-full h-dvh md:max-h-fit md:max-w-md gap-y-2 items-center">
        <CardParent className="flex-row items-center justify-between gap-x-3 w-full">
          <div className="flex flex-col w-full truncate ">
            <p className="font-bold text-base text-muted-foreground">
              {session?.user?.name ?? "Nama Siswa"}
            </p>
            <p className="text-xs font-light text-muted-foreground">
              {getSiswa.data?.data?.tempat_pkl_relation?.name ?? "Tempat PKL"}
            </p>
            <p className="text-[0.650rem] font-bold text-muted-foreground ">
              {getSiswa.data?.data.guru_relation.name ?? "Nama Guru Monitoring"}
            </p>
          </div>
          <div className="border h-full"></div>

          <div
            onClick={() => redirect("/logout")}
            className="font-bold text-xl text-muted-foreground bg-red-100 flex items-center justify-center text-center rounded-md p-1.5 border-2 border-red-200"
          >
            <DoorOpen />
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
                  {getSiswa.data?.data?.tempat_pkl_relation?.jam_masuk ?? "-"}
                </div>
              </div>
              <div className="flex w-full items-center text-center justify-start gap-x-1">
                <div>Status:</div>
                <div className="font-bold">
                  {getAbsensiHari?.data?.data?.absensi_masuk_relation?.status ??
                    "-"}
                </div>
              </div>
              <div className="flex w-full items-center text-center justify-start gap-x-1">
                <div>Approval:</div>
                {getAbsensiHari.data?.data?.absensi_masuk_relation?.approval ===
                true ? (
                  <IconCheck size={15} />
                ) : getAbsensiHari.data?.data?.absensi_masuk_relation
                    ?.approval === false ? (
                  <IconX size={15} />
                ) : (
                  <IconInfo size={15} />
                )}
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
                  {getSiswa.data?.data?.tempat_pkl_relation?.jam_pulang ?? "-"}
                </div>
              </div>
              <div className="flex w-full items-center text-center justify-start gap-x-1">
                <div>Status:</div>
                <div className="font-bold">
                  {getAbsensiHari.data?.data?.absensipulang_relation?.status ??
                    "-"}
                </div>
              </div>
              <div className="flex w-full items-center text-center justify-start gap-x-1 ">
                <div>Approval:</div>
                <div>
                  {getAbsensiHari.data?.data?.absensipulang_relation
                    ?.approval === true ? (
                    <IconCheck size={15} />
                  ) : getAbsensiHari.data?.data?.absensipulang_relation
                      ?.approval === false ? (
                    <IconX size={15} />
                  ) : (
                    <IconInfo size={15} />
                  )}
                </div>
              </div>
            </CardParent>
          </CardParent>

          <div className="border w-xs md:w-sm"></div>
        </CardParent>

        <div className="border w-xs md:w-sm"></div>

        <div className="w-full flex flex-col gap-y-2 relative">
          <div
            className={`absolute inset-0 bg-foreground/4 rounded-md backdrop-blur-[0.08rem] top-0 z-50  items-center justify-center py-5 ${
              getAbsensiHari.data?.data ? "hidden" : "flex"
            }`}
          >
            <CardParent className="w-xs bg-background h-full items-center justify-evenly">
              <div className="border w-full"></div>

              <button
                onClick={() => {
                  setOnCreate(true);
                  mutationAbsensiHari
                    .mutateAsync()
                    .then(() => setOnCreate(false));
                }}
                disabled={onCreate}
                className="w-full"
              >
                <Button
                  color="green"
                  className="w-full text-center flex items-center justify-center"
                >
                  {!session || onCreate || getAbsensiHari.isLoading ? (
                    <LucideLoader className="animate-spin" />
                  ) : (
                    "Absen"
                  )}
                </Button>
              </button>
              <div className="border w-full"></div>
            </CardParent>
          </div>
          <div className="flex flex-col gap-y-1 w-full h-fit relative">
            <Button
              onClick={() => {
                setOnRefreshAbsensiHari(true);
                queryClient
                  .invalidateQueries({
                    queryKey: ["absensi_hari"],
                  })
                  .then(() => setOnRefreshAbsensiHari(false));
              }}
              color="blue"
              className="text-sm text-center flex items-center justify-center flex-row gap-x-2"
            >
              Absen hari ini{" "}
              <RefreshCcw
                size={10}
                strokeWidth={4}
                className={onRefreshAbsensiHari ? "animate-spin" : ""}
              />
            </Button>
          </div>
          {getAbsensiHari.data?.data?.absensi_masuk_id ||
          getAbsensiHari.data?.data?.absensi_masuk_relation ? (
            <CardHistoryAbsensiMasuk
              data={
                getAbsensiHari.data.data.absensi_masuk_relation as AbsensiMasuk
              }
            />
          ) : (
            <CardAbsensiMasuk
              nama_siswa={getAbsensiHari.data?.data?.siswa_relation?.name}
              id_absensi_hari={getAbsensiHari.data?.data?.id}
            />
          )}
          {getAbsensiHari.data?.data?.absensi_pulang_id ? (
            <CardHistoryAbsensiPulang
              data={
                getAbsensiHari.data.data.absensipulang_relation as AbsensiPulang
              }
            />
          ) : (
            <CardAbsensiPulang
              nama_siswa={getAbsensiHari.data?.data?.siswa_relation?.name}
              id_absensi_hari={getAbsensiHari.data?.data?.id}
            />
          )}
        </div>
        <div className="border w-xs md:w-sm"></div>
        <CardParent className="bg-yellow-100  w-full max-w-md h-64 gap-y-1">
          <div
            onClick={() => {
              setOnRefreshGetSiswa(true);
              getSiswa.refetch().then(() => setOnRefreshGetSiswa(false));
            }}
            className="w-full items-center justify-center text-center font-bold flex gap-2 text-yellow-500"
          >
            History Absensi{" "}
            <RefreshCcw
              size={10}
              strokeWidth={4}
              className={onRefreshGetSiswa ? "animate-spin" : ""}
            />
          </div>
          <CardParent className="bg-background overflow-auto h-full">
            {getSiswa.isLoading ? (
              <div className="w-full h-full flex items-center justify-center text-center">
                <Loader className="animate-spin" />
              </div>
            ) : getSiswa.error ? (
              <div>{JSON.stringify(getSiswa.error)}</div>
            ) : (
              getSiswa.data?.data.absensi_hari.map((e, i) => {
                return <CardHistoryAbsensiHari key={i} data={e} />;
              })
            )}
          </CardParent>
        </CardParent>
      </CardParent>
    </div>
  );
}
