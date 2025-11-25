import { ClassNameValue } from "tailwind-merge";

export const Masuk = ({ className }: { className?: ClassNameValue }) => {
  return (
    <div className={`${className} text-xs font-bold text-green-500`}>Masuk</div>
  );
};

export const Pulang = ({ className }: { className?: ClassNameValue }) => {
  return (
    <div className={`${className} text-xs font-bold text-green-500`}>
      Pulang
    </div>
  );
};
