import { prisma } from "@/lib/db";
import { getHariIni } from "@/lib/getDatetime";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  const filterTanggal = getHariIni();

  await prisma.absensiHari.create({
    data: {
      siswa_id: id,
      name: filterTanggal.gt,
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json({ data: "Berhasil" });
}
