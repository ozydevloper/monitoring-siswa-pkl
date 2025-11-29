import { prisma } from "@/lib/db";
import { getHariIni } from "@/lib/getDatetime";
import { NextResponse } from "next/server";

export async function GET() {
  const filterTanggal = getHariIni();

  const inboxItem = await prisma.approvalInbox.findFirst({
    where: {
      name: {
        gte: filterTanggal.gt,
        lt: filterTanggal.lt,
      },
    },
    include: {
      absensiMasuk: true,
      absensiPulang: true,
    },
  });
  return NextResponse.json({ data: inboxItem });
}
