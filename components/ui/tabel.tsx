"use client";
import { apiFetch } from "@/lib/signature";
import { CardParent } from "./card";
import { useQuery } from "@tanstack/react-query";
import { Prisma, Siswa } from "@/app/generated/prisma/client";
import { redirect } from "next/navigation";

export const TabelMurid = () => {
  const headerTabel = ["name", "tempat_pkl", "nama_guru_monitoring"];
  const allSiswa = useQuery<{
    data:
      | Prisma.SiswaGetPayload<{
          include: {
            guru_relation: true;
            tempat_pkl_relation: true;
            absensi_hari: true;
          };
        }>[]
      | string;
  }>({
    queryKey: ["siswa"],
    queryFn: async () => apiFetch("/api/query/siswa").then((e) => e.json()),
  });

  if (allSiswa.isLoading) return <div>Loading...</div>;
  if (allSiswa.error) return <div>Error: {JSON.stringify(allSiswa.error)}</div>;
  if (!Array.isArray(allSiswa.data?.data))
    return <div>{allSiswa.data?.data}</div>;
  return (
    <CardParent className="w-full bg-blue-50 md:max-w-xl overflow-x-scroll overflow-hidden">
      <CardParent className="bg-background min-w-fit w-full">
        <table>
          <thead>
            <tr>
              {headerTabel.map((e, i) => (
                <td key={i} className="border-x p-2 bg-muted">
                  {e}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {allSiswa.data?.data.map((e, i) => (
              <tr
                onClick={() => alert(`/monitoring/${e.id}`)}
                key={i}
                className={`${i % 2 === 0 && "bg-green-50"}`}
              >
                <td className="border-x pl-2 p-2">{e.name}</td>
                <td className="border-x pl-2 p-2">
                  {e.tempat_pkl_relation.name}
                </td>
                <td className="border-x pl-2 p-2">{e.guru_relation.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardParent>
    </CardParent>
  );
};
