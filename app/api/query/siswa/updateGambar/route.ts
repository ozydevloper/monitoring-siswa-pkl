import { prisma } from "@/lib/db";
import { DeleteImage, UploadImage } from "@/lib/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const old_public_id = formData.get("old_public_id") as string;
    const new_image = formData.get("new_image") as File;
    const id = formData.get("id") as string;
    const type = formData.get("type") as string;

    const deletedImage = await DeleteImage(old_public_id);

    if (!deletedImage) throw new Error();

    const uploadedImage = await UploadImage(new_image);

    if (type === "Masuk") {
      await prisma.absensiMasuk.update({
        where: {
          id: id,
        },
        data: {
          image: [uploadedImage.secure_url, uploadedImage.public_id],
        },
      });
    } else if (type === "Pulang") {
      await prisma.absensiPulang.update({
        where: {
          id: id,
        },
        data: {
          image: [uploadedImage.secure_url, uploadedImage.public_id],
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil update gambar",
    });
  } catch {
    return NextResponse.json({
      success: false,
      message: "Gagal update gambar",
    });
  }
}
