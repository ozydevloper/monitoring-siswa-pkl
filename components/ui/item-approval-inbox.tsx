import { formatDate } from "@/lib/formatDate";
import { CardParent } from "./card";
import { Masuk } from "./color-status";
import { AbsensiMasuk, AbsensiPulang } from "@/app/generated/prisma/client";

export const ItemInbox: React.FC<{
  data: AbsensiMasuk | AbsensiPulang;
}> = ({ data }) => {
  return (
    <CardParent className="w-full h-fit flex flex-row gap-x-2 items-center justify-between">
      <div className="w-fit h-fit">
        <div className="font-bold text-muted-foreground">{data.nama_siswa}</div>
        <div className="text-[0.650rem] font-light text-muted-foreground whitespace-nowrap">
          {formatDate(new Date(data.name), true)}
        </div>
        {data.status === "PULANG" ? (
          <div className="text-[0.600rem] font-bold text-red-500">
            {data.status}
          </div>
        ) : (
          <div className="text-[0.600rem] font-bold text-green-500">
            {data.status}
          </div>
        )}
      </div>
      <div className="border h-full"></div>
      <div className="w-fit flex flex-col items-end justify-end text-center gap-y-1">
        <div className="text-[0.650rem] text-green-500 underline">Approve</div>
        <div className="text-[0.650rem] text-red-500 underline">Disapprove</div>
      </div>
    </CardParent>
  );
};
