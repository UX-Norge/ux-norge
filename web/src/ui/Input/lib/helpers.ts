import { classNames } from "@Lib/helpers";
export type InputProps = {
  placeholder?: string;
  value: any;
  onChange: any;
  type?: "text" | "email" | "password" | "textarea";
  required?: boolean;
  name: string;
  label?: string;
  helper?: string;
};

const inputDefaultClass =
  "w-full rounded-xs border-2 border-gray-600 bg-white p-8 transition-all placeholder:text-gray-400 outline-none focus-visible:border-primary-500 focus-visible:ring-[3px] focus-visible:ring-primary-400";

export const inputClassNames = {
  all: classNames(inputDefaultClass),
};
