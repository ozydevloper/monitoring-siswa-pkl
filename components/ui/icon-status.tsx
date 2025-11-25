import { Circle, CircleAlert, CircleCheck, CircleX } from "lucide-react";

export const IconCircle = ({ size = 20 }: { size?: number }) => {
  return (
    <div className="w-fit">
      <Circle strokeWidth={4.5} size={size} className="text-muted-foreground" />
    </div>
  );
};

export const IconCheck = ({ size = 20 }: { size?: number }) => {
  return (
    <div className="w-fit">
      <CircleCheck strokeWidth={4.5} size={size} className="text-green-400" />
    </div>
  );
};

export const IconX = ({ size = 20 }: { size?: number }) => {
  return (
    <div className="w-fit">
      <CircleX strokeWidth={4.5} size={size} className="text-red-300" />
    </div>
  );
};

export const IconInfo = ({ size = 20 }: { size?: number }) => {
  return (
    <div className="w-fit">
      <CircleAlert strokeWidth={4.5} size={size} className="text-yellow-300" />
    </div>
  );
};
