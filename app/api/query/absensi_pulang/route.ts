import { prisma } from "@/lib/db";
import { getHariIni } from "@/lib/getDatetime";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { time_now, id_absensi_hari, note, status, image, nama_siswa } =
    await req.json();

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

  console.log("pulang");
  console.log(isInboxExist);

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
    console.log(isInboxExist);
  }

  console.log("pulang");
  console.log(isInboxExist);

  const absensi_pulang = await prisma.absensiPulang.create({
    data: {
      approval: false,
      name: time_now,
      note: note,
      image: image,
      status: status,
      approval_inbox_id: isInboxExist.id,
      nama_siswa: nama_siswa,
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
      absensi_pulang_id: absensi_pulang.id,
    },
  });
  return NextResponse.json({ data: absensi_pulang });
}
