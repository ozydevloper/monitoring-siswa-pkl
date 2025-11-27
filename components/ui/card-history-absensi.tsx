import { formatDate } from "@/lib/formatDate";
import { CardParent } from "./card";
import { IconCheck, IconInfo } from "./icon-status";
import {
  AbsensiHari,
  AbsensiMasuk,
  AbsensiPulang,
  Prisma,
} from "@/app/generated/prisma/client";
import { useDetailAbsensi } from "@/lib/zustand";

export const CardHistoryAbsensiMasuk: React.FC<{ data: AbsensiMasuk }> = ({
  data,
}) => {
  const tanggal = new Date(data.name);
  const setDataDetailAbsensi = useDetailAbsensi(
    (state) => state.setDataDetailAbsensi
  );
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
        <IconCheck />
        <div className="border h-full"></div>
        <div className="w-fit font-bold text-xs text-muted-foreground">
          {formatDate(tanggal, true)}
        </div>
      </div>
    </CardParent>
  );
};

export const CardHistoryAbsensiPulang: React.FC<{ data: AbsensiPulang }> = ({
  data,
}) => {
  const tanggal = new Date(data.name);
  const setDataDetailAbsensi = useDetailAbsensi(
    (state) => state.setDataDetailAbsensi
  );
  return (
    <CardParent
      onClickParent={() =>
        setDataDetailAbsensi({
          type: "Masuk",
          dataDetail: data as Prisma.AbsensiPulangGetPayload<{
            include: { absensi_hari: true };
          }>,
        })
      }
      className={`w-full flex flex-row items-center justify-between bg-red-50`}
    >
      <div className="flex items-center justify-center w-fit gap-x-1 h-full">
        <IconCheck />
        <div className="border h-full"></div>
        <div className="w-fit font-bold text-xs text-muted-foreground">
          {formatDate(tanggal, true)}
        </div>
      </div>
    </CardParent>
  );
};

export const CardHistoryAbsensiHari: React.FC<{ data: AbsensiHari }> = ({
  data,
}) => {
  return (
    <div>
      <CardParent className="bg-yellow-50 flex items-center justify-between gap-x-2 flex-row text-center font-bold text-muted-foreground">
        <div className="flex gap-x-2 min-h-fit">
          <IconInfo />
          <div className="whitespace-nowrap">
            {formatDate(new Date(data.name))}
          </div>
        </div>
        <div className="border w-full"></div>
      </CardParent>
    </div>
  );
};
