import { formatDate } from "@/lib/formatDate";
import { CardParent } from "./card";
import { IconCheck } from "./icon-status";
import {
  AbsensiMasuk,
  AbsensiPulang,
  Prisma,
} from "@/app/generated/prisma/client";
import { useDetailAbsensi } from "@/lib/zustand";
import { useState } from "react";
import { ClassNameValue } from "tailwind-merge";

export const CardHistoryAbsensiMasuk: React.FC<{
  data: AbsensiMasuk;
  className?: ClassNameValue;
  sizeIcon?: number;
}> = ({ data, className, sizeIcon = 17 }) => {
  const setDataDetailAbsensi = useDetailAbsensi(
    (state) => state.setDataDetailAbsensi
  );
  if (!data)
    return (
      <CardParent className="w-full text-muted-foreground bg-neutral-50">
        <div className="text-[0.600rem] font-bold text-red-500 ">
          Belum absen Masuk
        </div>
      </CardParent>
    );
  const tanggal = new Date(data.name);
  return (
    <CardParent
      onClickParent={() =>
        setDataDetailAbsensi({
          type: "Masuk",
          dataDetail: data as Prisma.AbsensiMasukGetPayload<{
            include: { absensi_hari: true };
          }>,
        })
      }
      className={`w-full flex flex-row items-center justify-between bg-green-50`}
    >
      <div className="flex items-center justify-center w-fit gap-x-1 h-full">
        <IconCheck size={sizeIcon} />
        <div className="border h-full"></div>
        <div
          className={`w-fit font-bold text-xs text-muted-foreground ${className}`}
        >
          {formatDate(tanggal, true)} - {data.status}
        </div>
      </div>
    </CardParent>
  );
};

export const CardHistoryAbsensiPulang: React.FC<{
  data: AbsensiPulang;
  className?: ClassNameValue;
  sizeIcon?: number;
}> = ({ data, className, sizeIcon = 17 }) => {
  const setDataDetailAbsensi = useDetailAbsensi(
    (state) => state.setDataDetailAbsensi
  );
  if (!data)
    return (
      <CardParent className="w-full text-muted-foreground bg-neutral-50">
        <div className="text-[0.600rem] font-bold text-red-500 ">
          Belum absen Pulang
        </div>
      </CardParent>
    );
  const tanggal = new Date(data.name);
  return (
    <CardParent
      onClickParent={() =>
        setDataDetailAbsensi({
          type: "Pulang",
          dataDetail: data as Prisma.AbsensiPulangGetPayload<{
            include: { absensi_hari: true };
          }>,
        })
      }
      className={`w-full flex flex-row items-center justify-between bg-green-50`}
    >
      <div className="flex items-center justify-center w-fit gap-x-1 h-full">
        <IconCheck size={sizeIcon} />
        <div className="border h-full"></div>
        <div
          className={`w-fit font-bold text-xs text-muted-foreground ${className}`}
        >
          {formatDate(tanggal, true)} - {data.status}
        </div>
      </div>
    </CardParent>
  );
};

export const CardHistoryAbsensiHari: React.FC<{
  data: Prisma.AbsensiHariGetPayload<{
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
  }>;
}> = ({ data }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <div>
      <CardParent className=" flex items-center  justify-between gap-x-2  text-center font-bold text-muted-foreground gap-y-1 bg-yellow-50">
        <div
          onClick={() => setIsShow(!isShow)}
          className="w-full flex flex-row items-center justify-around gap-x-2  p-1 rounded-md border"
        >
          <div className="border w-full"></div>
          <div className="whitespace-nowrap">
            {formatDate(new Date(data.name))}
          </div>
          <div className="border w-full"></div>
        </div>
        {isShow && (
          <CardParent className="w-full flex items-center justify-center bg-background gap-y-1 flex-col">
            <CardHistoryAbsensiMasuk
              className="text-[0.600rem]"
              sizeIcon={13}
              data={data.absensi_masuk_relation as AbsensiMasuk}
            />
            <CardHistoryAbsensiPulang
              className="text-[0.600rem]"
              sizeIcon={13}
              data={data.absensipulang_relation as AbsensiPulang}
            />
          </CardParent>
        )}
      </CardParent>
    </div>
  );
};
