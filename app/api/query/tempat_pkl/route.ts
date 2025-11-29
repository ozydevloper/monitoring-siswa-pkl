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

  try {
    await prisma.tempatPKL.create({
      data: {
        name: name,
        jam_masuk: jam_masuk,
        jam_pulang: jam_pulang,
      },
      select: {
        name: true,
      },
    });
  } catch {
    return NextResponse.json({
      data: `Gagal membuat, ${name} mungkin sudah ada`,
    });
  }
  return NextResponse.json({ data: `Berhasil membuat,${name}` });
}

export async function PUT(req: NextRequest) {
  const { id_tempat_pkl, update_jam_masuk, update_jam_pulang, update_name } =
    await req.json();
  try {
    await prisma.tempatPKL.update({
      where: {
        id: id_tempat_pkl,
      },
      data: {
        name: update_name,
        jam_masuk: update_jam_masuk,
        jam_pulang: update_jam_pulang,
      },
      select: {
        name: true,
      },
    });
  } catch {
    return NextResponse.json({
      data: `Gagal update, mungkin memiliki kemiripan dengan yang lain`,
    });
  }
  return NextResponse.json({ data: `Berhasil Update, ${update_name}` });
}

export async function DELETE(req: NextRequest) {
  const { id_tempat_pkl } = await req.json();
  const deletedTempatPKL = await prisma.tempatPKL.delete({
    where: {
      id: id_tempat_pkl,
    },
    select: {
      name: true,
    },
  });
  return NextResponse.json({
    data: `Berhasil Update,${deletedTempatPKL.name}`,
  });
}
