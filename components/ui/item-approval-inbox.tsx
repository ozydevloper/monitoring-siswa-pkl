import { formatDate } from "@/lib/formatDate";
import { CardParent } from "./card";
import { Masuk } from "./color-status";

export const ItemInbox = ({ status }: { status?: string }) => {
  return (
    <CardParent className="w-full h-fit flex flex-row gap-x-2 items-center justify-between">
      <div className="w-fit h-fit">
        <div className="font-bold text-muted-foreground">Nama siswa</div>
        <div className="text-[0.650rem] font-light text-muted-foreground whitespace-nowrap">
          {formatDate(new Date(), true)}
        </div>
        <Masuk className="text-[0.600rem]" />
      </div>
      <div className="border h-full"></div>
      <div className="w-fit flex flex-col items-end justify-end text-center gap-y-1">
        <div className="text-[0.650rem] text-green-500 underline">Approve</div>
        <div className="text-[0.650rem] text-red-500 underline">Disapprove</div>
      </div>
    </CardParent>
  );
};
