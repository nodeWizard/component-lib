"use client";

import { FilledFieldProps } from "../Field";

export default function FileField(props: FilledFieldProps) {
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target.files;
    if (fileInput && fileInput.length > 0) {
      const file = fileInput[0];
      const formData = new FormData();
      formData.append("file", file);

      // TODO : Here you can send the file to the backend (using `formData`) to save it on the server
    }
  };

  return (
    <input
      type="file"
      className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={props.label}
      required={props.required}
      onChange={handleChange}
      value={props.value}
    />
  );
}