import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const allTempatPKL = await prisma.tempatPKL.findMany();
  if (allTempatPKL.length === 0)
    return NextResponse.json({ data: "Data tidak ditemukan" });

  return NextResponse.json({ data: allTempatPKL });
}

export async function POST(req: NextRequest) {
  const { name, jam_masuk, jam_pulang } = await req.json();
  const tempat_pkl = await prisma.tempatPKL.create({
    data: {
      name: name,
      jam_masuk: jam_masuk,
      jam_pulang: jam_pulang,
    },
    select: {
      name: true,
    },
  });
  return NextResponse.json({ data: `Berhasil membuat,${tempat_pkl.name}` });
}
