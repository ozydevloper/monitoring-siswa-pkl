"use client";
import { apiFetch } from "@/lib/signature";
import { CardParent } from "./card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Prisma, TempatPKL } from "@/app/generated/prisma/client";
import { Button } from "./button";
import {
  ArrowUp,
  Eye,
  EyeClosed,
  Loader,
  LoaderIcon,
  RefreshCcw,
} from "lucide-react";
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
  const [newName, setNewName] = useState<string>("");
  const [jamMasuk, setJamMasuk] = useState<string>("");
  const [jamPulang, setJamPulang] = useState<string>("");

  const [selectId, setSelectId] = useState<string>();
  const [updateName, setUpdateName] = useState<string>();
  const [updateJamMasuk, setUpdateJamMasuk] = useState<string>();
  const [updateJamPulang, setUpdateJamPulang] = useState<string>();

  const [isUpdate, setIsUpdate] = useState<TempatPKL | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const [errorInput, setErrorInput] = useState<boolean>(false);

  const [onRefresh, setOnRefresh] = useState<boolean>(false);
  const [onSubmit, setOnSubmit] = useState<boolean>(false);

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

  const mutationUpdateTempatPKL = useMutation({
    mutationFn: async (data: {
      id_tempat_pkl: string;
      update_name: string;
      update_jam_pulang: string;
      update_jam_masuk: string;
    }) => {
      return apiFetch("/api/query/tempat_pkl", {
        method: "PUT",
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tempat_pkl"],
      });
      queryClient.invalidateQueries({
        queryKey: ["siswa"],
      });
    },
  });
  const mutationDeleteTempatPKL = useMutation({
    mutationFn: async (data: { id_tempat_pkl: string }) => {
      return apiFetch("/api/query/tempat_pkl", {
        method: "DELETE",
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tempat_pkl"],
      });
      queryClient.invalidateQueries({
        queryKey: ["siswa"],
      });
    },
  });

  const handleSelectTempatPKL = (e: TempatPKL) => {
    setSelectId(e.id);
    setUpdateJamMasuk(e.jam_masuk);
    setUpdateJamPulang(e.jam_pulang);
    setUpdateName(e.name);

    setIsUpdate(e);
  };

  if (allTempatPKL.error)
    return <div>Error: {JSON.stringify(allTempatPKL.error)}</div>;

  return (
    <CardParent className="w-full text-muted-foreground bg-blue-50 md:max-w-xl overflow-auto  gap-y-1 h-64 md:h-full">
      <div
        className={`inset-0 h-dvh fixed bg-black/50 flex justify-center items-center transition-all ease-in-out duration-300  ${
          isUpdate ? "translate-y-0 " : "-translate-y-full "
        }`}
      >
        <CardParent className="bg-background h-fit w-full max-w-md gap-y-2">
          <Button
            onClick={() => {
              setIsUpdate(null);
              setErrorInput(false);
            }}
            color="blue"
            className="flex text-center justify-center items-center"
          >
            <ArrowUp size={15} />
          </Button>
          {isUpdate && (
            <CardParent className="bg-yellow-50 gap-y-1">
              <div className="font-bold text-base">Update Tempat PKL</div>
              <CardParent className="gap-y-1">
                <Input
                  onChange={(e) => setUpdateName(e.target.value)}
                  defaultValue={updateName}
                  type="text"
                  placeholder="Tempat PKL"
                  className="bg-background"
                />

                <Input
                  onChange={(e) => setUpdateJamMasuk(e.target.value)}
                  defaultValue={updateJamMasuk}
                  type="text"
                  placeholder="Jam Masuk"
                  className="bg-background"
                />
                <Input
                  onChange={(e) => setUpdateJamPulang(e.target.value)}
                  defaultValue={updateJamPulang}
                  type="text"
                  placeholder="Jam Pulang"
                  className="bg-background"
                />
              </CardParent>
              <button disabled={onSubmit}>
                <Button
                  color="green"
                  className="flex items-center justify-center text-center w-full"
                  onClick={() => {
                    setOnSubmit(true);
                    if (
                      selectId === "" ||
                      updateName === "" ||
                      updateJamMasuk === "" ||
                      updateJamPulang === ""
                    ) {
                      setOnSubmit(false);
                      return setErrorInput(true);
                    } else {
                      setErrorInput(false);
                    }

                    mutationUpdateTempatPKL
                      .mutateAsync({
                        id_tempat_pkl: selectId!,
                        update_jam_masuk: updateJamMasuk!,
                        update_jam_pulang: updateJamPulang!,
                        update_name: updateName!,
                      })
                      .then(() => {
                        setIsUpdate(null);
                        setOnSubmit(false);
                      });
                  }}
                >
                  {onSubmit ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    "Update"
                  )}
                </Button>
              </button>
              <button disabled={onSubmit}>
                <Button
                  color="red"
                  className="flex items-center justify-center text-center w-full"
                  onClick={() => {
                    setOnSubmit(true);
                    if (selectId === "") {
                      setOnSubmit(false);
                      return setErrorInput(true);
                    } else {
                      setErrorInput(false);
                    }

                    mutationDeleteTempatPKL
                      .mutateAsync({
                        id_tempat_pkl: selectId!,
                      })
                      .then(() => {
                        setIsUpdate(null);
                        setOnSubmit(false);
                      });
                  }}
                >
                  {onSubmit ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </button>
            </CardParent>
          )}
        </CardParent>
      </div>

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
              <button
                disabled={onSubmit}
                className="w-full"
                onClick={() => {
                  setOnSubmit(true);

                  if (newName === "" || jamMasuk === "" || jamPulang === "") {
                    setOnSubmit(false);

                    return setErrorInput(true);
                  } else {
                    setErrorInput(false);
                  }
                  mutationNewTempatPKL
                    .mutateAsync({
                      name: newName,
                      jam_masuk: jamMasuk,
                      jam_pulang: jamPulang,
                    })
                    .then(() => setOnSubmit(false));
                }}
              >
                <Button
                  color={errorInput ? "red" : "green"}
                  className="text-center w-full flex items-center jusitfy-center"
                >
                  {onSubmit ? (
                    <Loader size={20} className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </button>
            </CardParent>
          </CardParent>
        </CardParent>
      </div>

      <div className="text-[0.650rem] font-bold">Tabel Tempat PKL</div>
      <div className="flex items-center justify-between gap-x-2">
        <button
          disabled={!allTempatPKL.isSuccess}
          onClick={() => setIsCreate(true)}
          className="w-full"
        >
          <Button
            color="green"
            className="text-center w-full flex items-center justify-center "
          >
            {allTempatPKL.isSuccess ? (
              "Tambah Tempat PKL"
            ) : (
              <Loader size={20} className="animate-spin" />
            )}
          </Button>
        </button>
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
        <CardParent className="bg-background w-full h-64 overflow-auto">
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
                  onClick={() => handleSelectTempatPKL(e)}
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
  const [isUpdate, setIsUpdate] = useState<Prisma.SiswaGetPayload<{
    include: {
      absensi_hari: true;
      guru_relation: true;
      tempat_pkl_relation: true;
    };
  }> | null>(null);

  const [newNameSiswa, setNewNameSiswa] = useState<string>("");
  const [newPasswordSiswa, setNewPasswordSiswa] = useState<string>("");
  const [newTempatPKLId, setTempatPKLId] = useState<string>("");

  const [selectedIdSiswa, setSelectedIdSiswa] = useState<string>();
  const [updateNameSiswa, setUpdateNameSiswa] = useState<string>();
  const [updatePasswordSiswa, setUpdatePasswordSiswa] = useState<string>();
  const [updateTempatPKL, setUpdateTempatPKL] = useState<string>();
  const [updateNameGuru, setUpdateNameGuru] = useState<string>();

  const [errorInput, setErrorInput] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const [onRefresh, setOnRefresh] = useState<boolean>(false);
  const [onSubmit, setOnSubmit] = useState<boolean>(false);

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

  const allGuru = useQuery<{
    data:
      | Prisma.GuruGetPayload<{
          select: {
            id: true;
            name: true;
          };
        }>[]
      | string;
  }>({
    queryKey: ["guru"],
    queryFn: async () => apiFetch("/api/query/guru").then((e) => e.json()),
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["siswa"],
      });
      queryClient.invalidateQueries({
        queryKey: ["inbox"],
      });
    },
  });

  const mutationUpdateSiswa = useMutation({
    mutationFn: async (data: {
      update_id_siswa: string;
      update_name_siswa: string;
      update_password_siswa: string;
      update_nama_guru: string;
      update_tempat_pkl: string;
    }) =>
      apiFetch("/api/query/siswa", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: async (res) => {
      const json = await res.json();
      toast.success(json["data"]);
    },
    onError: async (error) => {
      toast.error(JSON.stringify(JSON.stringify(error)));
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["siswa"],
      });
      queryClient.invalidateQueries({
        queryKey: ["inbox"],
      });
    },
  });

  const mutationDeleteSiswa = useMutation({
    mutationFn: async (data: { id_siswa: string }) => {
      return apiFetch("/api/query/siswa", {
        method: "DELETE",
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["siswa"],
      });
      queryClient.invalidateQueries({
        queryKey: ["inbox"],
      });
    },
  });

  const handleSelectSiswa = (
    e: Prisma.SiswaGetPayload<{
      include: {
        absensi_hari: true;
        guru_relation: true;
        tempat_pkl_relation: true;
      };
    }>
  ) => {
    setSelectedIdSiswa(e.id);
    setUpdateNameSiswa(e.name);
    setUpdatePasswordSiswa(e.password);
    setUpdateTempatPKL(e.tempat_pkl_relation?.id);
    setUpdateNameGuru(e.guru_relation?.id);

    setIsUpdate(e);
  };

  if (allSiswa.error) return <div>Error: {JSON.stringify(allSiswa.error)}</div>;

  return (
    <CardParent className="w-full text-muted-foreground bg-blue-50 md:max-w-xl overflow-auto  gap-y-1 h-64 md:h-full">
      <div
        className={`inset-0 h-dvh fixed bg-black/50 flex justify-center items-center transition-all ease-in-out duration-300  ${
          isUpdate ? "translate-y-0 " : "-translate-y-full "
        }`}
      >
        <CardParent className="bg-background h-fit w-full max-w-md gap-y-2">
          <Button
            onClick={() => {
              setIsUpdate(null);
              setErrorInput(false);
            }}
            color="blue"
            className="flex text-center justify-center items-center"
          >
            <ArrowUp size={15} />
          </Button>
          {isUpdate && (
            <CardParent className="bg-yellow-50 gap-y-1">
              <div className="font-bold text-base">Update Siswa</div>
              <CardParent className="gap-y-1">
                <Input
                  onChange={(e) => setUpdateNameSiswa(e.target.value)}
                  defaultValue={updateNameSiswa}
                  type="text"
                  placeholder="Siswa"
                  className="bg-background"
                />
                <div className="relative flex w-full items-center justify-center text-center">
                  <Input
                    onChange={(e) => setUpdatePasswordSiswa(e.target.value)}
                    defaultValue={updatePasswordSiswa}
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Password"
                    className="bg-background"
                  />
                  <div
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    className="absolute right-1 bg-background flex items-center justify-center px-1 rounded-sm z-10"
                  >
                    {isShowPassword ? <Eye /> : <EyeClosed />}
                  </div>
                </div>
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
                  <Select
                    onValueChange={(e) => setUpdateTempatPKL(e)}
                    value={updateTempatPKL}
                  >
                    <SelectTrigger className="bg-background w-full truncate">
                      <SelectValue placeholder="Pilih Tempat PKL" />
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
                {allGuru.isLoading ? (
                  <CardParent className="flex-row ites-center justify-start gap-x-1 bg-background">
                    {" "}
                    <LoaderIcon size={15} className="animate-spin" /> Guru
                  </CardParent>
                ) : allGuru.error ? (
                  <CardParent className="flex-row ites-center justify-start gap-x-1 bg-background">
                    error data guru: {allGuru.error.message}
                  </CardParent>
                ) : !Array.isArray(allGuru.data?.data) ? (
                  <CardParent className="flex-row ites-center justify-start gap-x-1 bg-background">
                    Data tidak ditemukan
                  </CardParent>
                ) : (
                  <Select
                    onValueChange={(e) => setUpdateNameGuru(e)}
                    value={updateNameGuru}
                  >
                    <SelectTrigger className="bg-background w-full truncate">
                      <SelectValue placeholder="Pilih Guru" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {allGuru.data.data.map((e, i) => (
                          <SelectItem value={e.id} key={i}>
                            {" "}
                            {e.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </CardParent>
              <button disabled={onSubmit}>
                <Button
                  color="green"
                  className="flex items-center justify-center text-center w-full"
                  onClick={() => {
                    setOnSubmit(true);
                    if (
                      selectedIdSiswa === "" ||
                      updateNameSiswa === "" ||
                      updateTempatPKL === "" ||
                      updateNameGuru === "" ||
                      updatePasswordSiswa === ""
                    ) {
                      setOnSubmit(false);
                      return setErrorInput(true);
                    } else {
                      setErrorInput(false);
                    }

                    mutationUpdateSiswa
                      .mutateAsync({
                        update_id_siswa: selectedIdSiswa!,
                        update_name_siswa: updateNameSiswa!,
                        update_nama_guru: updateNameGuru!,
                        update_password_siswa: updatePasswordSiswa!,
                        update_tempat_pkl: updateTempatPKL!,
                      })
                      .then(() => {
                        setIsUpdate(null);
                        setOnSubmit(false);
                      });
                  }}
                >
                  {onSubmit ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    "Update"
                  )}
                </Button>
              </button>
              <button disabled={onSubmit}>
                <Button
                  color="red"
                  className="flex items-center justify-center text-center w-full"
                  onClick={() => {
                    setOnSubmit(true);
                    if (selectedIdSiswa === "") {
                      setOnSubmit(false);
                      return setErrorInput(true);
                    } else {
                      setErrorInput(false);
                    }

                    mutationDeleteSiswa
                      .mutateAsync({
                        id_siswa: selectedIdSiswa!,
                      })
                      .then(() => {
                        setIsUpdate(null);
                        setOnSubmit(false);
                      });
                  }}
                >
                  {onSubmit ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </button>
            </CardParent>
          )}
        </CardParent>
      </div>

      <div
        className={`inset-0 h-dvh fixed bg-black/50 flex justify-center items-center transition-all ease-in-out duration-300  ${
          isCreate ? "translate-y-0 " : "-translate-y-full "
        }`}
      >
        <CardParent className="bg-background h-fit w-full max-w-md gap-y-2 ">
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
          {isCreate && (
            <CardParent className="bg-yellow-50 gap-y-1">
              <div className="font-bold text-base">Tambah Siswa</div>
              <CardParent className="gap-y-1">
                <Input
                  onChange={(e) => setNewNameSiswa(e.target.value)}
                  type="text"
                  defaultValue={newNameSiswa}
                  placeholder="Siswa Baru"
                  className="bg-background"
                />
                <div className="relative flex w-full items-center justify-center text-center">
                  <Input
                    defaultValue={newPasswordSiswa}
                    onChange={(e) => setNewPasswordSiswa(e.target.value)}
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Password Baru"
                    className="bg-background"
                  />
                  <div
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    className="absolute right-1 bg-background flex items-center justify-center px-1 rounded-sm z-10"
                  >
                    {isShowPassword ? <Eye /> : <EyeClosed />}
                  </div>
                </div>
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
                  <Select
                    onValueChange={(e) => setTempatPKLId(e)}
                    value={newTempatPKLId}
                  >
                    <SelectTrigger className="bg-background truncate w-full">
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
              </CardParent>
              <button disabled={onSubmit}>
                <Button
                  color={errorInput ? "red" : "green"}
                  className=" w-full text-center flex items-center justify-center"
                  onClick={() => {
                    setOnSubmit(true);
                    if (
                      newNameSiswa === "" ||
                      newPasswordSiswa === "" ||
                      newTempatPKLId === ""
                    ) {
                      setOnSubmit(false);
                      return setErrorInput(true);
                    } else {
                      setErrorInput(false);
                    }

                    mutationNewSiswa
                      .mutateAsync({
                        newName: newNameSiswa,
                        guru_id: session?.user?.id as string,
                        newPassword: newPasswordSiswa,
                        tempat_pkl_id: newTempatPKLId,
                      })
                      .then(() => {
                        setNewNameSiswa("");
                        setNewPasswordSiswa("");
                        setTempatPKLId("");
                        setIsCreate(false);
                        setOnSubmit(false);
                      });
                  }}
                >
                  {onSubmit ? (
                    <Loader size={20} className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </button>
            </CardParent>
          )}
        </CardParent>
      </div>

      <div className="text-[0.650rem] font-bold">Tabel Siswa</div>
      <div className="flex items-center justify-between gap-x-2">
        <button
          disabled={!allSiswa.isSuccess}
          onClick={() => setIsCreate(true)}
          className="w-full"
        >
          <Button
            color="green"
            className="text-center w-full flex items-center justify-center "
          >
            {allSiswa.isSuccess ? (
              "Tambah Siswa"
            ) : (
              <Loader size={20} className="animate-spin" />
            )}
          </Button>
        </button>
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
        <CardParent className="bg-background  w-full h-64 overflow-auto md:max-w-md">
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
                  onClick={() => handleSelectSiswa(e)}
                  key={i}
                  className={`${i % 2 === 0 && "bg-green-50"}`}
                >
                  <td className="border-x pl-2 p-2">{e.name}</td>
                  <td className="border-x pl-2 p-2">
                    {e?.tempat_pkl_relation?.name}
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
