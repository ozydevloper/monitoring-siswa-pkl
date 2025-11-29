import { formatDate } from "@/lib/formatDate";
import { CardParent } from "./card";

import {
  AbsensiMasuk,
  AbsensiPulang,
  Prisma,
} from "@/app/generated/prisma/client";
import { useDetailAbsensi } from "@/lib/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/signature";
import { useState } from "react";
import { Loader } from "lucide-react";

export const ItemInbox: React.FC<{
  data: AbsensiMasuk | AbsensiPulang;
}> = ({ data }) => {
  const setDataDetailAbsensi = useDetailAbsensi(
    (state) => state.setDataDetailAbsensi
  );

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const updateAbsensi = useMutation({
    mutationFn: async ({
      type,
      approve,
    }: {
      type: string;
      approve: boolean;
    }) => {
      if (type === "PULANG") {
        return apiFetch("/api/query/absensi_pulang", {
          method: "PUT",
          body: JSON.stringify({ approval: approve, id: data.id }),
        });
      } else {
        return apiFetch("/api/query/absensi_masuk", {
          method: "PUT",
          body: JSON.stringify({ approval: approve, id: data.id }),
        });
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["inbox"],
      }),
  });
  const handleApproval = () => {
    setIsUpdate(true);
    updateAbsensi
      .mutateAsync({
        approve: true,
        type: data.status,
      })
      .then(() => setIsUpdate(false));
  };

  const handleDispproval = () => {
    setIsUpdate(true);
    updateAbsensi
      .mutateAsync({
        approve: false,
        type: data.status,
      })
      .then(() => setIsUpdate(false));
  };

  return (
    <CardParent
      className={`w-full h-fit flex flex-row gap-x-2 items-center justify-between  ${
        data.approval === true
          ? "bg-green-100"
          : data.approval === false
          ? "bg-red-100"
          : data.approval === null && "bg-yellow-100"
      } transition-all ease-in-out duration-200`}
    >
      <div
        className="w-fit h-fit"
        onClick={() =>
          setDataDetailAbsensi({
            type: data.status,
            dataDetail: data as
              | Prisma.AbsensiMasukGetPayload<{
                  include: { absensi_hari: true };
                }>
              | Prisma.AbsensiPulangGetPayload<{
                  include: { absensi_hari: true };
                }>,
          })
        }
      >
        <div className="font-bold text-muted-foreground">{data.nama_siswa}</div>
        <div className="text-[0.650rem] font-light text-muted-foreground whitespace-nowrap">
          {formatDate(new Date(data.name), true)}
        </div>
        <div className="text-[0.600rem] font-bold text-green-500">
          {data.status}
        </div>
      </div>
      <div className="border h-full"></div>
      <div className="w-fit flex flex-col items-end justify-end text-center gap-y-1">
        <button
          disabled={isUpdate}
          onClick={handleApproval}
          className="text-[0.650rem] text-green-500 underline"
        >
          {isUpdate ? <Loader size={15} className="animate-spin" /> : "Approve"}
        </button>
        <button
          disabled={isUpdate}
          onClick={handleDispproval}
          className="text-[0.650rem] text-red-500 underline"
        >
          {isUpdate ? (
            <Loader size={15} className="animate-spin" />
          ) : (
            "Disapprove"
          )}
        </button>
      </div>
    </CardParent>
  );
};

export const ItemInboxBelumAbsen = ({
  name,
  type,
}: {
  name: string;
  type: string;
}) => {
  return (
    <CardParent className="w-full text-muted-foreground bg-neutral-50">
      <div className="font-bold ">{name}</div>
      <div className="text-[0.650rem] font-light text-muted-foreground whitespace-nowrap">
        {formatDate(new Date())}
      </div>
      <div className="text-[0.600rem] font-bold text-red-500 ">
        Belum absen {type}
      </div>
    </CardParent>
  );
};
