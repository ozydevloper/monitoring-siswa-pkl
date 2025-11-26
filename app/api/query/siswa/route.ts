import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/hashSalt";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  const { newName, newPassword, guru_id, tempat_pkl_id } = await req.json();
  const hashedPassword = await hashPassword(newPassword);

  const newSiswaCreated = await prisma.siswa.create({
    data: {
      name: newName,
      password: hashedPassword,
      guru_id: guru_id,
      tempat_pkl_id: tempat_pkl_id,
    },
  });
  return NextResponse.json({ data: `Berhasil membuat, ${newName}` });
}
