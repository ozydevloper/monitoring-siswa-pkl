import { formatDate } from "@/lib/formatDate";
import { CardParent } from "./card";
import { IconInfo } from "./icon-status";
import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";
import { useState } from "react";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { apiFetch } from "@/lib/signature";
import { useKirimAbsensi } from "@/lib/zustand";

export function CardAbsensiPulang({
  id_absensi_hari,
  nama_siswa,
}: {
  id_absensi_hari: string | undefined;
  nama_siswa: string | undefined;
}) {
  const queryClient = useQueryClient();
  const status = "PULANG";
  const setMutateAbsensi = useKirimAbsensi((state) => state.setMutateAbsensi);

  const mutationAbsensiPulang = useMutation({
    mutationFn: async (formData: FormData | undefined) =>
      apiFetch("/api/query/absensi_pulang", {
        method: "POST",
        body: formData,
      }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["absensi_hari"],
      }),
  });

  return (
    <CardParent
      className={`w-full flex flex-row items-center justify-between bg-yellow-50`}
    >
      <div className="flex items-center justify-center w-fit gap-x-1 h-full ">
        <IconInfo />
        <div className="border h-full"></div>
        <div className="w-fit font-bold text-xs text-muted-foreground">
          {formatDate(new Date())}
        </div>
      </div>
      <div className="h-full flex items-center justify-between gap-x-1">
        <button
          onClick={() =>
            setMutateAbsensi({
              formName: "Pulang",
              id_absensi_hari: id_absensi_hari as string,
              nama_siswa: nama_siswa as string,
              status: status,
              mutateAsyncFn:
                mutationAbsensiPulang.mutateAsync as UseMutateAsyncFunction,
            })
          }
        >
          <Button color="red" className="text-[0.600rem]">
            {status}
          </Button>
        </button>
      </div>
    </CardParent>
  );
}

export default function CardAbsensiMasuk({
  id_absensi_hari,
  nama_siswa,
}: {
  id_absensi_hari: string | undefined;
  nama_siswa: string | undefined;
}) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<string>("HADIR");
  const setMutateAbsensi = useKirimAbsensi((state) => state.setMutateAbsensi);

  const mutationAbsensiMasuk = useMutation({
    mutationFn: async (formData: FormData | undefined) =>
      apiFetch("/api/query/absensi_masuk", {
        method: "POST",
        body: formData,
      }),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["absensi_hari"],
      }),
  });

  return (
    <CardParent
      className={`w-full flex flex-row items-center justify-between bg-yellow-50`}
    >
      <div className="flex items-center justify-center w-fit gap-x-1 h-full">
        <IconInfo />
        <div className="border h-full"></div>
        <div className="w-fit font-bold text-xs text-muted-foreground">
          {formatDate(new Date())}
        </div>
      </div>
      <div className="h-full flex items-center justify-between gap-x-1">
        <button
          onClick={() =>
            setMutateAbsensi({
              formName: "Masuk",
              id_absensi_hari: id_absensi_hari as string,
              nama_siswa: nama_siswa as string,
              status: status,
              mutateAsyncFn:
                mutationAbsensiMasuk.mutateAsync as UseMutateAsyncFunction,
            })
          }
        >
          <Button color="green" className="text-[0.600rem]">
            {status}
          </Button>
        </button>
        <Select onValueChange={(e) => setStatus(e)}>
          <SelectTrigger />
          <SelectContent>
            <SelectItem value="HADIR">Hadir</SelectItem>
            <SelectItem value="TIDAK_HADIR">Tidak Hadir</SelectItem>
            <SelectItem value="SAKIT">Sakit</SelectItem>
            <SelectItem value="IZIN">Izin</SelectItem>
            <SelectItem value="ALPHA">Alpha</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardParent>
  );
}
