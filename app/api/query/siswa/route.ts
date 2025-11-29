import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const allSiswa = await prisma.siswa.findMany({
    include: {
      guru_relation: true,
      tempat_pkl_relation: true,
    },
  });

  if (allSiswa.length === 0)
    return NextResponse.json({ data: "Data tidak ditemukan" });
  return NextResponse.json({ data: allSiswa });
}

export async function POST(req: NextRequest) {
  const { newName, newPassword, guru_id, tempat_pkl_id } = await req.json();

  try {
    const newSiswaCreated = await prisma.siswa.create({
      data: {
        name: newName,
        password: newPassword,
        guru_id: guru_id,
        tempat_pkl_id: tempat_pkl_id,
      },
    });
  } catch {
    return NextResponse.json({
      data: `Gagal membuat, mungkin ${newName} sudah ada`,
    });
  }
  return NextResponse.json({ data: `Berhasil membuat, ${newName}` });
}

export async function PUT(req: NextRequest) {
  const {
    update_id_siswa,
    update_name_siswa,
    update_password_siswa,
    update_nama_guru,
    update_tempat_pkl,
  } = await req.json();

  try {
    const updatedSiswa = await prisma.siswa.update({
      where: {
        id: update_id_siswa,
      },
      data: {
        name: update_name_siswa,
        password: update_password_siswa,
        guru_id: update_nama_guru,
        tempat_pkl_id: update_tempat_pkl,
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

  return NextResponse.json({ data: `Berhasil update, ${update_name_siswa}` });
}

export async function DELETE(req: NextRequest) {
  const { id_siswa } = await req.json();

  const deletedSiswa = await prisma.siswa.delete({
    where: {
      id: id_siswa,
    },
    select: {
      name: true,
    },
  });

  return NextResponse.json({ data: `Berhasil update, ${deletedSiswa.name}` });
}
