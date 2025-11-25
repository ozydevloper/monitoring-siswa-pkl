import { CardParent } from "@/components/ui/card";
import { Masuk } from "@/components/ui/color-status";
import { ItemInbox } from "@/components/ui/item-approval-inbox";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex w-full h-dvh items-center flex-col">
      <div className="flex flex-col md:flex-row gap-1.5 w-full md:max-w-fit items-center md:items-start justify-center">
        <div className="max-h-fit w-full md:max-w-2xs">
          <CardParent className="w-full bg-green-50">
            <div className="flex flex-col w-full truncate ">
              <p className="font-bold text-base text-muted-foreground">
                Nama Guru Monitoring
              </p>
              <p className="text-xs font-light text-muted-foreground">
                SMK Muhammadiyah 1 Jakarta
              </p>
            </div>
          </CardParent>
          <div className="w-full h-49 relative hidden md:block">
            <Image
              alt="smk muhammadiyah 1 jakarta"
              src="/smkmutu.png"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="border w-xs md:w-0 md:hidden"></div>

        <CardParent className="bg-yellow-50 w-full h-64 max-h-64 md:w-md">
          <div className="whitespace-nowrap text-muted-foreground font-bold text-base">
            Approval Inbox
          </div>
          <div className="text-xs font-light text-muted-foreground">
            Hari ini
          </div>
          <CardParent className="bg-background w-full h-full overflow-hidden overflow-y-scroll">
            <ItemInbox />
            <ItemInbox />
            <ItemInbox />
            <ItemInbox />
            <ItemInbox />
            <ItemInbox />
            <ItemInbox />
            <ItemInbox />
          </CardParent>
        </CardParent>
      </div>
    </div>
  );
}
