import { prisma } from "@/lib/db";
import { getHariIni } from "@/lib/getDatetime";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  const filter_tanggal = getHariIni();

  const absesnsi_hari = await prisma.absensiHari.findFirst({
    where: {
      siswa_relation: {
        id: id,
      },
      name: {
        gt: filter_tanggal.gt,
        lt: filter_tanggal.lt,
      },
    },
  });

  return NextResponse.json({ data: absesnsi_hari });
}
