import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const allGuru = await prisma.guru.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  if (allGuru.length === 0)
    return NextResponse.json({ data: "Data tidak ditemukan" });
  return NextResponse.json({ data: allGuru });
}
