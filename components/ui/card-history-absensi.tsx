import { formatDate } from "@/lib/formatDate";
import { CardParent } from "./card";
import { IconCheck, IconInfo } from "./icon-status";
import { AbsensiMasuk, AbsensiPulang } from "@/app/generated/prisma/client";

export const CardHistoryAbsensiMasuk: React.FC<{ data: AbsensiMasuk }> = ({
  data,
}) => {
  const tanggal = new Date(data.name);
  return (
    <CardParent
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
  return (
    <CardParent
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
