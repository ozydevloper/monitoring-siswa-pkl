import { formatDate } from "@/lib/formatDate";
import { CardParent } from "./card";
import { IconInfo } from "./icon-status";
import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/signature";
import { Loader } from "lucide-react";
import { TypeStatus } from "@/app/generated/prisma/enums";

export function CardAbsensiPulang({
  id_absensi_hari,
  nama_siswa,
}: {
  id_absensi_hari: string | undefined;
  nama_siswa: string | undefined;
}) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<string>("PULANG");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const mutationAbsensiPulang = useMutation({
    mutationFn: () =>
      apiFetch("/api/query/absensi_pulang", {
        method: "POST",
        body: JSON.stringify({
          time_now: new Date(),
          id_absensi_hari: id_absensi_hari,
          note: "Benran note",
          status: status,
          image: ["image url", "public id"],
          nama_siswa: nama_siswa,
        }),
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
          disabled={isSubmit}
          onClick={() => {
            setIsSubmit(true);
            mutationAbsensiPulang.mutateAsync().then(() => setIsSubmit(false));
          }}
        >
          <Button color="red" className="text-[0.600rem]">
            {isSubmit ? <Loader size={15} className="animate-spin" /> : status}
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
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const mutationAbsensiMasuk = useMutation({
    mutationFn: () =>
      apiFetch("/api/query/absensi_masuk", {
        method: "POST",
        body: JSON.stringify({
          time_now: new Date(),
          id_absensi_hari: id_absensi_hari,
          note: "Benran note",
          status: status,
          image: ["image url", "public id"],
          nama_siswa: nama_siswa,
        }),
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
          disabled={isSubmit}
          onClick={() => {
            setIsSubmit(true);
            mutationAbsensiMasuk.mutateAsync().then(() => setIsSubmit(false));
          }}
        >
          <Button color="green" className="text-[0.600rem]">
            {isSubmit ? <Loader size={15} className="animate-spin" /> : status}
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
