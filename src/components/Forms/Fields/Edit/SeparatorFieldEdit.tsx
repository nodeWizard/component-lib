"use client";

import { FieldProps } from "../Field";

export default function SeparatorFieldEdit(props: FieldProps) {

  return (
    <div className="flex items-center gap-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id={props?.label}>
      <div className="bg-white w-full h-0.5"></div>
    </div>
  );
}
