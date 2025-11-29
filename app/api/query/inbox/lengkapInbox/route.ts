import { prisma } from "@/lib/db";
import { getHariIni } from "@/lib/getDatetime";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("masuk");
  const filterTanggal = getHariIni();
  const dataSiswa = await prisma.siswa.findMany({
    select: {
      name: true,
      absensi_hari: {
        where: {
          name: {
            gte: filterTanggal.gt,
            lt: filterTanggal.lt,
          },
        },
        select: {
          absensi_masuk_relation: true,
          absensipulang_relation: true,
        },
      },
    },
  });
  return NextResponse.json({ data: dataSiswa });
}
