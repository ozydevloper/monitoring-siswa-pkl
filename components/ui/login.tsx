"use client";
import { redirect } from "next/navigation";
import { CardParent } from "./card";
import { Input } from "./input";

export const Login = ({
  name,
  redirect_to,
}: {
  name: string;
  redirect_to: string;
}) => {
  return (
    <div className="flex items-center justify-center w-full h-dvh">
      <CardParent className="w-full max-w-md h-full md:max-h-fit border-primary ">
        <div className="font-bold text-xl mt-15 text-primary text-center ">
          {name} Muhammadiyah 1 Jakarta
        </div>
        <div className="flex items-center justify-center w-full text-xl font-semibold my-5 text-center">
          Selamat datang
        </div>
        <div className="w-full flex items-center justify-center md:mb-5">
          <div className="max-w-xs flex flex-col items-center justify-center gap-y-5">
            <Input placeholder={name} />
            <Input type="password" placeholder="Password" />
            <div className="p-3 bg-primary rounded-md font-bold text-background px-10 active:scale-97 transition-all ease-in-out duration-300 active:bg-primary/70 active:text-background/80 ">
              Masuk
            </div>
            <div>
              login sebagai{" "}
              <span
                className="font-bold text-primary underline"
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
