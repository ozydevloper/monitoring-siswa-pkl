import { prisma } from "@/lib/db";
import { getHariIni } from "@/lib/getDatetime";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { time_now, id_absensi_hari, note, status, image } = await req.json();

  const filterDate = getHariIni();

  let isInboxExist = await prisma.approvalInbox.findFirst({
    where: {
      name: {
        gt: filterDate.gt,
        lt: filterDate.lt,
      },
    },
    select: {
      id: true,
    },
  });

  if (!isInboxExist) {
    isInboxExist = await prisma.approvalInbox.create({
      data: {
        name: new Date(),
      },
      select: {
        id: true,
      },
    });
  }

  const absensi_masuk = await prisma.absensiMasuk.create({
    data: {
      approval: false,
      name: time_now,
      note: note,
      image: image,
      status: status,
      approvalInboxId: isInboxExist.id,
    },
    select: {
      id: true,
    },
  });

  const updateAbsensihari = await prisma.absensiHari.update({
    where: {
      id: id_absensi_hari,
    },
    data: {
      absensi_masuk_id: absensi_masuk.id,
    },
  });
  return NextResponse.json({ data: absensi_masuk });
}
