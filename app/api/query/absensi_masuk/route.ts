import { TypeStatus } from "@/app/generated/prisma/enums";
import { prisma } from "@/lib/db";
import { getHariIni } from "@/lib/getDatetime";
import { UploadImage } from "@/lib/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image");
  const time_now = formData.get("time_now");
  const id_absensi_hari = formData.get("id_absensi_hari");
  const note = formData.get("note");
  const status = formData.get("status");
  const nama_siswa = formData.get("nama_siswa");

  // const { time_now, id_absensi_hari, note, status, image, nama_siswa } =
  //   await req.json();

  const filterDate = getHariIni();

  let isInboxExist = await prisma.approvalInbox.findFirst({
    where: {
      name: {
        gte: filterDate.gt,
        lt: filterDate.lt,
      },
    },
    select: {
      id: true,
    },
  });

  if (!isInboxExist) {
    console.log("otw");

    isInboxExist = await prisma.approvalInbox.create({
      data: {
        name: filterDate.gt,
      },
      select: {
        id: true,
      },
    });
  }
  const result_image = await UploadImage(image as File);

  const absensi_masuk = await prisma.absensiMasuk.create({
    data: {
      name: new Date(time_now as string),
      note: note as string,
      image: [result_image.secure_url, result_image.public_id],
      status: status as TypeStatus,
      approvalInboxId: isInboxExist.id,
      nama_siswa: nama_siswa as string,
      approval: null,
    },
    select: {
      id: true,
    },
  });

  const updateAbsensihari = await prisma.absensiHari.update({
    where: {
      id: id_absensi_hari as string,
    },
    data: {
      absensi_masuk_id: absensi_masuk.id,
    },
    select: {
      id: true,
    },
  });
  return NextResponse.json({ data: updateAbsensihari });
}

export async function PUT(req: NextRequest) {
  const { approval, id } = await req.json();

  const updated = await prisma.absensiMasuk.update({
    where: {
      id: id,
    },
    data: {
      approval: approval,
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json({
    data: updated,
  });
}
