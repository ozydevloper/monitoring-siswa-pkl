import { Prisma } from "@/app/generated/prisma/client";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { create } from "zustand";

interface KirimAbsensi {
  mutateAbsensi: {
    formName: string;
    id_absensi_hari: string;
    nama_siswa: string;
    status: string;
    mutateAsyncFn: (formdata: FormData) => Promise<Response>;
  } | null;
  setMutateAbsensi: (
    mutate: {
      formName: string;
      id_absensi_hari: string;
      nama_siswa: string;
      status: string;
      mutateAsyncFn: (formdata: FormData) => Promise<Response>;
    } | null
  ) => void;
}

interface DetailAbsensi {
  dataDetailAbsensi: null | {
    type: string;
    dataDetail:
      | Prisma.AbsensiMasukGetPayload<{ include: { absensi_hari: true } }>
      | Prisma.AbsensiPulangGetPayload<{ include: { absensi_hari: true } }>;
  };
  setDataDetailAbsensi: (
    data: null | {
      type: string;
      dataDetail:
        | Prisma.AbsensiMasukGetPayload<{ include: { absensi_hari: true } }>
        | Prisma.AbsensiPulangGetPayload<{ include: { absensi_hari: true } }>;
    }
  ) => void;
}

export const useKirimAbsensi = create<KirimAbsensi>((set) => ({
  mutateAbsensi: null,
  setMutateAbsensi: (
    mutate: {
      formName: string;
      id_absensi_hari: string;
      nama_siswa: string;
      status: string;
      mutateAsyncFn: (formdata: FormData) => Promise<Response>;
    } | null
  ) =>
    set({
      mutateAbsensi: mutate,
    }),
}));

export const useDetailAbsensi = create<DetailAbsensi>((set) => ({
  dataDetailAbsensi: null,
  setDataDetailAbsensi: (
    data: null | {
      type: string;
      dataDetail:
        | Prisma.AbsensiMasukGetPayload<{ include: { absensi_hari: true } }>
        | Prisma.AbsensiPulangGetPayload<{ include: { absensi_hari: true } }>;
    }
  ) =>
    set({
      dataDetailAbsensi: data,
    }),
}));
