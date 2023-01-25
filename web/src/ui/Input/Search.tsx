import * as React from "react";
import { inputClassNames } from "./lib/helpers";
import { classNames } from "@Lib/helpers";

const SearchIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.9265 17.0401L20.3996 20.4001M19.2796 11.4401C19.2796 15.77 15.7695 19.2801 11.4396 19.2801C7.1097 19.2801 3.59961 15.77 3.59961 11.4401C3.59961 7.11019 7.1097 3.6001 11.4396 3.6001C15.7695 3.6001 19.2796 7.11019 19.2796 11.4401Z"
      stroke="#5E5E63"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Search: React.FC<{
  onSubmit: (searchTerm: string) => void;
  placeholder: string;
  initialValue?: string;
}> = ({ onSubmit, placeholder, initialValue }) => {
  const [searchTerm, setSearchTerm] = React.useState(initialValue || "");
  const search = (e) => {
    e.preventDefault();
    onSubmit(encodeURIComponent(searchTerm));
  };
  return (
    <form
      className="relative flex items-center rounded-sm bg-gray-100 "
      onSubmit={search}
    >
      <input
        className={classNames(
          inputClassNames.all,
          "md:py-auto rounded border-0 bg-gray-100 py-[0.75rem] px-16 pr-48"
        )}
        placeholder={placeholder}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <span className="absolute right-8">
        <SearchIcon />
      </span>
    </form>
  );
};
