import { classNames } from "@Lib/helpers";
export type InputProps = {
  placeholder?: string;
  value: any;
  onChange: any;
  type?: "text" | "email" | "password" | "textarea";
  required?: boolean;
  name: string;
  label?: string;
};

export const inputClassNames = classNames(
  "w-full rounded-xs border-2 border-gray-600 bg-white p-8 transition-all placeholder:text-gray-600 focus-visible:border-primary-500 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary-400"
);
