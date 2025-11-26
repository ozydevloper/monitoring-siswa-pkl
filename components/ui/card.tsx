import { ClassNameValue } from "tailwind-merge";

export const CardParent = ({
  children,
  className,
  onClickParent,
}: {
  children?: React.ReactNode;
  className?: ClassNameValue;
  onClickParent?: () => void;
}) => {
  return (
    <div
      onClick={onClickParent}
      className={` flex flex-col p-2 border rounded-md ${className} text-xs `}
    >
      {children}
    </div>
  );
};
