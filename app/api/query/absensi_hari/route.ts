import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  let isExist = await prisma.absensiHari.findFirst({
    where: {
      siswa_relation: {
        id: id,
      },
      name: {
        equals: new Date(),
      },
    },
  });
  if (!isExist) {
    isExist = await prisma.absensiHari.create({
      data: {
        siswa_id: id,
        name: new Date(),
      },
      include: {
        siswa_relation: true,
        absensi_masuk_id: true,
        absensi_pulang_id: true,
      },
    });
  }

  return NextResponse.json({ data: isExist });
}
