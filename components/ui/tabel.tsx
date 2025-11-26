"use client";
import { apiFetch } from "@/lib/signature";
import { CardParent } from "./card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Prisma, TempatPKL } from "@/app/generated/prisma/client";
import { Button } from "./button";
import { ArrowUp, LoaderIcon, RefreshCcw } from "lucide-react";
import { Input } from "./input";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useState } from "react";
import { toast } from "sonner";

export const TabelTempatPKL = () => {
  const { data: session } = useSession();
  const [newName, setNewName] = useState<string>("");
  const [jamMasuk, setJamMasuk] = useState<string>("");
  const [jamPulang, setJamPulang] = useState<string>("");
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [errorInput, setErrorInput] = useState<boolean>(false);

  const [onRefresh, setOnRefresh] = useState<boolean>(false);

  const headerTabel = ["name", "jam_masuk", "jam_pulang"];
  const queryClient = useQueryClient();

  const allTempatPKL = useQuery<{ data: TempatPKL[] | string }>({
    queryKey: ["tempat_pkl"],
    queryFn: async () =>
      apiFetch("/api/query/tempat_pkl").then((e) => e.json()),
  });

  const mutationNewTempatPKL = useMutation({
    mutationFn: async (data: {
      name: string;
      jam_masuk: string;
      jam_pulang: string;
    }) => {
      return apiFetch("/api/query/tempat_pkl", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: async (res) => {
      const json = await res.json();
      toast.success(json["data"]);
    },
    onError: async (error) => {
      toast.error(JSON.stringify(JSON.stringify(error)));
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["tempat_pkl"],
      }),
  });

  if (allTempatPKL.error)
    return <div>Error: {JSON.stringify(allTempatPKL.error)}</div>;

  return (
    <CardParent className="w-full text-muted-foreground bg-blue-50 md:max-w-xl overflow-auto  gap-y-1">
      <div
        className={`inset-0 h-dvh fixed bg-black/50 flex justify-center items-center transition-all ease-in-out duration-300 ${
          isCreate ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <CardParent className="bg-background h-fit w-full max-w-md gap-y-2">
          <Button
            onClick={() => {
              setIsCreate(false);
              setErrorInput(false);
            }}
            color="blue"
            className="flex text-center justify-center items-center"
          >
            <ArrowUp size={15} />
          </Button>
          <CardParent className="bg-yellow-50 gap-y-1">
            <div className="font-bold text-base">Tambah Tempat PKL</div>
            <CardParent className="gap-y-1">
              <Input
                onChange={(e) => setNewName(e.target.value)}
                type="text"
                placeholder="Nama tempat PKL"
                className="bg-background"
              />
              <Input
                onChange={(e) => setJamMasuk(e.target.value)}
                type="text"
                placeholder="Jam masuk"
                className="bg-background"
              />
              <Input
                onChange={(e) => setJamPulang(e.target.value)}
                type="text"
                placeholder="Jam pulang"
                className="bg-background"
              />
              <Button
                color={errorInput ? "red" : "green"}
                className="text-center"
                onClick={() => {
                  if (newName === "" || jamMasuk === "" || jamPulang === "") {
                    return setErrorInput(true);
                  } else {
                    setErrorInput(false);
                  }

                  toast.promise(
                    async () =>
                      await mutationNewTempatPKL.mutateAsync({
                        name: newName,
                        jam_masuk: jamMasuk,
                        jam_pulang: jamPulang,
                      }),
                    {
                      loading: "Sedang membuat...",
                    },
                  );
                }}
              >
                Submit
              </Button>
            </CardParent>
          </CardParent>
        </CardParent>
      </div>

      <div className="text-[0.650rem] font-bold">Tabel Siswa</div>
      <div className="flex items-center justify-between gap-x-2">
        <Button
          onClick={() => setIsCreate(true)}
          color="green"
          className="text-center w-full"
        >
          Tambah Tempat PKL
        </Button>
        <Button
          onClick={() => {
            setOnRefresh(true);
            allTempatPKL.refetch().then(() => setOnRefresh(false));
          }}
          color="blue"
        >
          <RefreshCcw size={15} className={onRefresh ? "animate-spin" : ""} />
        </Button>
      </div>
      {allTempatPKL.isLoading ? (
        <CardParent className="text-center text-muted-foreground underline bg-background">
          Loading...
        </CardParent>
      ) : !Array.isArray(allTempatPKL.data?.data) ? (
        <CardParent className="text-center text-red-500 underline bg-background">
          Data tidak ditemukan
        </CardParent>
      ) : (
        <CardParent className="bg-background min-w-fit w-full">
          <table>
            <thead>
              <tr>
                {headerTabel.map((e, i) => (
                  <td key={i} className="border-x p-2 bg-muted">
                    {e}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {allTempatPKL.data?.data.map((e, i) => (
                <tr
                  onClick={() => alert(`/monitoring/${e.id}`)}
                  key={i}
                  className={`${i % 2 === 0 && "bg-green-50"}`}
                >
                  <td className="border-x pl-2 p-2">{e.name}</td>
                  <td className="border-x pl-2 p-2">{e.jam_masuk}</td>
                  <td className="border-x pl-2 p-2">{e.jam_pulang}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardParent>
      )}
    </CardParent>
  );
};
export const TabelMurid = () => {
  const { data: session } = useSession();
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [newNameSiswa, setNewNameSiswa] = useState<string>("");
  const [newPasswordSiswa, setNewPasswordSiswa] = useState<string>("");
  const [newTempatPKLId, setTempatPKLId] = useState<string>("");
  const [newGuruId, setGuruId] = useState<string>("");
  const [errorInput, setErrorInput] = useState<boolean>(false);

  const [onRefresh, setOnRefresh] = useState<boolean>(false);

  const headerTabel = ["name", "tempat_pkl", "nama_guru_monitoring"];
  const queryClient = useQueryClient();

  const allSiswa = useQuery<{
    data:
      | Prisma.SiswaGetPayload<{
          include: {
            guru_relation: true;
            tempat_pkl_relation: true;
            absensi_hari: true;
          };
        }>[]
      | string;
  }>({
    queryKey: ["siswa"],
    queryFn: async () => apiFetch("/api/query/siswa").then((e) => e.json()),
  });

  const allTempatPKL = useQuery<{ data: TempatPKL[] | string }>({
    queryKey: ["tempat_pkl"],
    queryFn: async () =>
      apiFetch("/api/query/tempat_pkl").then((e) => e.json()),
  });

  const mutationNewSiswa = useMutation({
    mutationFn: async (data: {
      newName: string;
      newPassword: string;
      guru_id: string;
      tempat_pkl_id: string;
    }) => {
      return apiFetch("/api/query/siswa", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: async (res) => {
      const json = await res.json();
      toast.success(json["data"]);
    },
    onError: async (error) => {
      toast.error(JSON.stringify(JSON.stringify(error)));
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["siswa"],
      }),
  });

  if (allSiswa.error) return <div>Error: {JSON.stringify(allSiswa.error)}</div>;

  return (
    <CardParent className="w-full text-muted-foreground bg-blue-50 md:max-w-xl overflow-auto  gap-y-1">
      <div
        className={`inset-0 h-dvh fixed bg-black/50 flex justify-center items-center transition-all ease-in-out duration-300 ${
          isCreate ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <CardParent className="bg-background h-fit w-full max-w-md gap-y-2">
          <Button
            onClick={() => {
              setIsCreate(false);
              setErrorInput(false);
            }}
            color="blue"
            className="flex text-center justify-center items-center"
          >
            <ArrowUp size={15} />
          </Button>
          <CardParent className="bg-yellow-50 gap-y-1">
            <div className="font-bold text-base">Tambah Siswa</div>
            <CardParent className="gap-y-1">
              <Input
                onChange={(e) => setNewNameSiswa(e.target.value)}
                type="text"
                placeholder="Siswa Baru"
                className="bg-background"
              />
              <Input
                onChange={(e) => setNewPasswordSiswa(e.target.value)}
                type="password"
                placeholder="Password Baru"
                className="bg-background"
              />
              {allTempatPKL.isLoading ? (
                <CardParent className="flex-row ites-center justify-start gap-x-1 bg-background">
                  {" "}
                  <LoaderIcon size={15} className="animate-spin" /> Tempat PKL
                </CardParent>
              ) : allTempatPKL.error ? (
                <CardParent className="flex-row ites-center justify-start gap-x-1 bg-background">
                  error data tempat_pkl: {allTempatPKL.error.message}
                </CardParent>
              ) : !Array.isArray(allTempatPKL.data?.data) ? (
                <CardParent className="flex-row ites-center justify-start gap-x-1 bg-background">
                  Data tidak ditemukan
                </CardParent>
              ) : (
                <Select onValueChange={(e) => setTempatPKLId(e)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Pilih tempat PKL" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {allTempatPKL.data.data.map((e, i) => (
                        <SelectItem value={e.id} key={i}>
                          {" "}
                          {e.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
              <Input
                type="text"
                defaultValue={session?.user?.id ?? "Tidak Tahu"}
                className="bg-background"
                readOnly
              />
            </CardParent>
            <Button
              color={errorInput ? "red" : "green"}
              className="text-center"
              onClick={() => {
                setGuruId(session?.user?.id ?? "Tidak tahu");
                if (
                  newNameSiswa === "" ||
                  newPasswordSiswa === "" ||
                  newTempatPKLId === "" ||
                  newGuruId === ""
                ) {
                  return setErrorInput(true);
                } else {
                  setErrorInput(false);
                }

                toast.promise(
                  async () =>
                    await mutationNewSiswa.mutateAsync({
                      newName: newNameSiswa,
                      guru_id: newGuruId,
                      newPassword: newPasswordSiswa,
                      tempat_pkl_id: newTempatPKLId,
                    }),
                  {
                    loading: "Sedang membuat...",
                  },
                );
              }}
            >
              Submit
            </Button>
          </CardParent>
        </CardParent>
      </div>

      <div className="text-[0.650rem] font-bold">Tabel Siswa</div>
      <div className="flex items-center justify-between gap-x-2">
        <Button
          onClick={() => setIsCreate(true)}
          color="green"
          className="text-center w-full"
        >
          Tambah Siswa
        </Button>
        <Button
          onClick={() => {
            setOnRefresh(true);
            allSiswa.refetch().then(() => setOnRefresh(false));
          }}
          color="blue"
        >
          <RefreshCcw size={15} className={onRefresh ? "animate-spin" : ""} />
        </Button>
      </div>
      {allSiswa.isLoading ? (
        <CardParent className="text-center text-muted-foreground underline bg-background">
          Loading...
        </CardParent>
      ) : !Array.isArray(allSiswa.data?.data) ? (
        <CardParent className="text-center text-red-500 underline bg-background">
          Data tidak ditemukan
        </CardParent>
      ) : (
        <CardParent className="bg-background min-w-fit w-full">
          <table>
            <thead>
              <tr>
                {headerTabel.map((e, i) => (
                  <td key={i} className="border-x p-2 bg-muted">
                    {e}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {allSiswa.data?.data.map((e, i) => (
                <tr
                  onClick={() => alert(`/monitoring/${e.id}`)}
                  key={i}
                  className={`${i % 2 === 0 && "bg-green-50"}`}
                >
                  <td className="border-x pl-2 p-2">{e.name}</td>
                  <td className="border-x pl-2 p-2">
                    {e.tempat_pkl_relation.name}
                  </td>
                  <td className="border-x pl-2 p-2">{e.guru_relation.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardParent>
      )}
    </CardParent>
  );
};
