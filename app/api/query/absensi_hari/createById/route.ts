import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  const absesnsi_hari = await prisma.absensiHari.create({
    data: {
      siswa_id: id,
      name: new Date(),
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json({ data: "Berhasil" });
}
