import { ArrowUp, Loader } from "lucide-react";
import { Button } from "./button";
import { CardParent } from "./card";
import { Input } from "./input";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "./textarea";
import { useKirimAbsensi } from "@/lib/zustand";
import { createPortal } from "react-dom";

export const FormAbsensi = ({
  id_absensi_hari,
  nama_siswa,
  status,
}: {
  id_absensi_hari: string;
  nama_siswa: string;
  status: string;
}) => {
  const [imageFakePath, setImageFakePath] = useState<File | null>(null);
  const [note, setNote] = useState<string>("");

  const [onSubmit, setOnSubmit] = useState<boolean>(false);

  const mutateAbsensi = useKirimAbsensi((state) => state.mutateAbsensi);
  const setMutateAbsensi = useKirimAbsensi((state) => state.setMutateAbsensi);

  const handleSubmit = () => {
    // {
    //         time_now: new Date(),
    //         id_absensi_hari: id_absensi_hari,
    //         note: "Benran note",
    //         status: status,
    //         image: ["image url", "public id"],
    //         nama_siswa: nama_siswa,
    //       }
    const formData = new FormData();
    formData.append("time_now", new Date().toISOString());
    formData.append("id_absensi_hari", id_absensi_hari);
    formData.append("note", note);
    formData.append("status", status);
    formData.append("image", imageFakePath!);
    formData.append("nama_siswa", nama_siswa);
    setOnSubmit(true);
    mutateAbsensi(formData).then(() => {
      setOnSubmit(false);
      setMutateAbsensi(null);
    });
  };

  if (!mutateAbsensi) return;
  return createPortal(
    <div
      className={`h-dvh inset-0 bg-black/50 absolute z-100 p-2 flex items-center justify-center  transition-all ease-in-out duration-300`}
    >
      <CardParent className="bg-background gap-2 w-full max-w-md h-fit">
        <Button
          onClick={() => setMutateAbsensi(null)}
          color="blue"
          className="flex items-center justify-center"
        >
          <ArrowUp size={15} />
        </Button>
        <div>Form Absensi</div>
        <CardParent className="w-full">
          <CardParent className="w-full h-52 relative overflow-hidden">
            {imageFakePath ? (
              <Image
                src={URL.createObjectURL(imageFakePath)}
                alt="..."
                fill
                className="object-contain"
              />
            ) : (
              ""
            )}
          </CardParent>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFakePath(e.currentTarget.files[0])}
          />
        </CardParent>
        <Textarea
          placeholder="Note"
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={handleSubmit} className="w-full">
          <Button
            color="green"
            className="text-center flex items-center justify-center"
          >
            {onSubmit ? <Loader className="animate-spin" /> : "Kirim"}
          </Button>
        </button>
      </CardParent>
    </div>,
    document.body
  );
};
