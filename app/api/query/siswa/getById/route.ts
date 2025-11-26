import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const siswa = await prisma.siswa.findFirst({
    where: {
      id: id,
    },
    include: {
      absensi_hari: true,
      guru_relation: true,
      tempat_pkl_relation: true,
    },
  });
  if (!siswa) return NextResponse.json({ data: "Data tidak ditemukan" });
  return NextResponse.json({ data: siswa });
}
