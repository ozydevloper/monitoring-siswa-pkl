import { prisma } from "@/lib/db";
import { getHariIni } from "@/lib/getDatetime";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  const filter_tanggal = getHariIni();

  const absesnsi_hari = await prisma.absensiHari.findFirst({
    where: {
      AND: [
        {
          siswa_id: id,
        },
        {
          name: {
            gte: filter_tanggal.gt,
            lt: filter_tanggal.lt,
          },
        },
      ],
    },
    include: {
      absensi_masuk_relation: true,
      absensipulang_relation: true,
      siswa_relation: true,
    },
  });

  return NextResponse.json({ data: absesnsi_hari });
}
