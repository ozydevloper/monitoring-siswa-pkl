import { ClassNameValue } from "tailwind-merge";
import { CardParent } from "./card";

export const Button = ({
  children,
  color,
  className,
}: {
  children: React.ReactNode;
  color: string;
  className?: ClassNameValue;
}) => {
  return (
    <CardParent
      className={`font-semibold ${className} ${
        color === "red"
          ? "bg-red-100 text-red-500 border border-red-200"
          : color === "green"
          ? "bg-green-100 text-green-500 border border-green-200"
          : ""
      }  `}
    >
      {children}
    </CardParent>
  );
};
