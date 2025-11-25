import { CardParent } from "@/components/ui/card";
import {
  IconCheck,
  IconCircle,
  IconInfo,
  IconX,
} from "@/components/ui/icon-status";
import { formatDate } from "@/lib/formatDate";
import { EllipsisVertical } from "lucide-react";

export default function Page() {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <CardParent className="w-full h-dvh md:max-h-fit md:max-w-md gap-y-2 items-center">
        <CardParent className="flex-row items-center justify-between gap-x-3 w-full">
          <div className="flex flex-col w-full truncate ">
            <p className="font-bold text-base text-muted-foreground">
              Nama Siswa
            </p>
            <p className="text-xs font-light ">PKL Cawang, ICONNECT+</p>
          </div>
          <div className="font-bold text-xl text-muted-foreground bg-green-100 h-full flex items-center justify-center text-center rounded-md px-2 border-2 border-green-200">
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
                <div className="font-bold">08:00</div>
              </div>
              <div className="flex w-full items-center text-center justify-start gap-x-1">
                <div>Status:</div>
                <div className="font-bold">Terlambat</div>
              </div>
              <div className="flex w-full items-center text-center justify-start gap-x-1">
                <div>Approval:</div>
                <IconCheck size={15} />
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
                <div className="font-bold">15:00</div>
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

        <CardParent className="w-full flex flex-row items-center justify-between bg-green-50">
          <div className="flex items-center justify-center w-fit gap-x-1 h-full">
            <IconCheck />
            <div className="border h-full"></div>
            <div className="w-fit font-bold text-muted-foreground">
              {formatDate(new Date())} - Sekarang
            </div>
          </div>
          <div className="h-full flex items-center justify-between gap-x-1">
            <CardParent className="bg-green-100 font-semibold text-green-500 border border-green-200">
              Masuk
            </CardParent>
            <EllipsisVertical size={15} />
          </div>
        </CardParent>

        <CardParent className="w-full flex flex-row items-center justify-between bg-yellow-50 opacity-40">
          <div className="flex items-center justify-center w-fit gap-x-1 h-full">
            <IconInfo />
            <div className="border h-full"></div>
            <div className="w-fit font-bold text-muted-foreground ">
              {formatDate(new Date())} - Sekarang
            </div>
          </div>
          <div className="h-full flex items-center justify-between gap-x-1">
            <CardParent className="bg-red-100 font-semibold text-red-500 border border-red-200">
              Pulang
            </CardParent>
            <EllipsisVertical size={15} />
          </div>
        </CardParent>
        <div className="border w-xs md:w-sm"></div>
      </CardParent>
    </div>
  );
}
