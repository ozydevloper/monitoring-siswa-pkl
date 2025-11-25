import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const allSiswa = await prisma.siswa.findMany({
    select: {
      id: true,
      name: true,
      guru_relation: true,
      tempat_pkl_relation: true,
      absensi_hari: true,
    },
  });

  if (allSiswa.length === 0)
    return NextResponse.json({ data: "Data tidak ditemukan" });
  return NextResponse.json({ data: allSiswa });
}
