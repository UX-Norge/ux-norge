import * as React from "react";

interface IProps {
  placeholder?: string;
  value: any;
  onChange: any;
  type: "text" | "email" | "password";
  required: boolean;
}

export const Input: React.FC<IProps> = ({
  placeholder,
  value,
  onChange,
  type,
  required,
  ...props
}) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        {...props}
        className="bg-white rounded-xs p-8 placeholder:text-gray-600 focus-visible:outline-1 focus-visible:outline-primary-100 focus-visible:ring-4 focus-visible:ring-primary-500"
      />
    </div>
  );
};
