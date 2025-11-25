import { ClassNameValue } from "tailwind-merge";

export const CardParent = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: ClassNameValue;
}) => {
  return (
    <div
      className={` flex flex-col p-2 border rounded-md ${className} text-xs `}
    >
      {children}
    </div>
  );
};
