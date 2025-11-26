import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { id_siswa, time_now, id_absensi_hari, note, status, image, inbox_id } =
    await req.json();
}
