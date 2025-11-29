import Image from "next/image";
import { CardParent } from "./card";
import { Button } from "./button";
import { ArrowUp } from "lucide-react";
import { formatDate } from "@/lib/formatDate";
import { IconCheck, IconX } from "./icon-status";
import { useDetailAbsensi } from "@/lib/zustand";

export const DetailAbsensi = () => {
  const dataDetailAbsensi = useDetailAbsensi(
    (state) => state.dataDetailAbsensi
  );
  const setDataDetailAbsensi = useDetailAbsensi(
    (state) => state.setDataDetailAbsensi
  );
  return (
    <div
      className={`inset-0 h-dvh bg-black/50 fixed z-100 flex flex-col justify-center items-center gap-y-1 ${
        dataDetailAbsensi ? "translate-y-0" : "-translate-y-full"
      } transition-all ease-in-out duration-200`}
    >
      <Button
        onClick={() => setDataDetailAbsensi(null)}
        className="w-full md:max-w-xl text-center flex items-center justify-center"
        color="blue"
      >
        <ArrowUp size={13} />
      </Button>

      {dataDetailAbsensi && (
        <CardParent className="w-full md:max-w-xl md:h-fit bg-background grid grid-cols-1 md:grid-cols-2 h-fit gap-1">
          <CardParent className="w-full h-50 md:w-full md:h-full relative">
            <Image
              src={dataDetailAbsensi.dataDetail.image[0]}
              fill
              className="object-contain"
              alt="..."
            />
          </CardParent>
          <CardParent className="w-full h-full gap-y-0.5">
            <Button color="blue">
              <span>{dataDetailAbsensi.dataDetail.nama_siswa}</span>
              <span className="text-[0.600rem]">
                {formatDate(new Date(dataDetailAbsensi.dataDetail.name), true)}
              </span>
              <span className="text-[0.600rem]">{dataDetailAbsensi.type}</span>
            </Button>
            <Button color="green">
              <div className="flex gap-x-1 items-center justify-start">
                <span>Status:</span>
                <span>{dataDetailAbsensi.dataDetail.status}</span>
              </div>
              <div className="flex gap-x-1 items-center justify-start">
                <span>Approval:</span>
                <span>
                  {dataDetailAbsensi.dataDetail.approval ? (
                    <IconCheck />
                  ) : (
                    <IconX />
                  )}
                </span>
              </div>
            </Button>
            <CardParent className="w-full h-32  overflow-auto">
              <p className="whitespace-pre-line">
                {dataDetailAbsensi.dataDetail.note}
              </p>
            </CardParent>
          </CardParent>
        </CardParent>
      )}
    </div>
  );
};
