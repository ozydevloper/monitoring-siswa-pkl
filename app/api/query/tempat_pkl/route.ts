import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const allTempatPKL = await prisma.tempatPKL.findMany();
  if (allTempatPKL.length === 0)
    return NextResponse.json({ data: "Data tidak ditemukan" });

  return NextResponse.json({ data: allTempatPKL });
}
