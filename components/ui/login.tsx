"use client";
import { redirect } from "next/navigation";
import { CardParent } from "./card";
import { Input } from "./input";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeClosed, Loader } from "lucide-react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export const Login = ({
  namePage,
  redirect_to,
}: {
  namePage: string;
  redirect_to: string;
}) => {
  const [nameLogin, setNameLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [onSubmit, setOnSubmit] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-center w-full h-dvh">
      <CardParent className="w-full max-w-md h-full md:max-h-fit  ">
        <div className="font-bold text-xl mt-15 text-primary text-center h-32 relative">
          <Image
            src={"/smkmutu.png"}
            alt="smk muhammadiyah 1 jakarta"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex items-center justify-center w-full text-xl font-semibold my-5 text-center">
          Selamat datang
        </div>
        <div className="w-full flex items-center justify-center md:mb-5">
          <div className="max-w-xs flex flex-col items-center justify-center gap-y-5">
            <Input
              placeholder={namePage}
              onChange={(e) => setNameLogin(e.target.value)}
            />
            <div className="flex items-center justify-between gap-x-1 relative">
              <Input
                type={isShowPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPasswordLogin(e.target.value)}
                className="relative after:absolute after:bg-red-600 after:w-30 after:h-30 after:z-50 after:bottom-0"
              />
              <div
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="w-fit absolute right-1 bg-background rounded-md px-0.5"
              >
                {isShowPassword ? (
                  <Eye
                    strokeWidth={1}
                    size={22}
                    className="text-muted-foreground"
                  />
                ) : (
                  <EyeClosed
                    strokeWidth={1}
                    size={22}
                    className="text-muted-foreground"
                  />
                )}
              </div>
            </div>
            <div
              onClick={() => {
                setOnSubmit(true);
                signIn("credentials", {
                  namelogin: nameLogin,
                  passwordlogin: passwordLogin,
                  role: namePage,
                  redirectTo: `${
                    namePage === "Siswa" ? "/siswa" : "/monitoring"
                  }`,
                }).then(() => setOnSubmit(false));
              }}
              className="p-2 rounded-md font-bold px-10 active:scale-97 transition-all ease-in-out duration-300 active:bg-green-500 active:text-green-100 bg-green-100 text-green-500 border border-green-200 w-full flex items-center justify-center text-center"
            >
              {onSubmit ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                "Masuk"
              )}
            </div>
            <div>
              login sebagai{" "}
              <span
                className="font-bold text-green-500 underline"
                onClick={() => redirect(`/login/${redirect_to}`)}
              >
                {redirect_to}
              </span>
            </div>
          </div>
        </div>
      </CardParent>
    </div>
  );
};
