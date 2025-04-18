"use client";

import { AtSymbolIcon } from "@heroicons/react/20/solid";
import { FieldProps } from "../Field";

export default function EmailFieldEdit(props: FieldProps) {
  return (
    <div className="flex items-center gap-1">
      <input
        type="text"
        className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={props.required}
        disabled
        placeholder="exemple"
      />
      <span className="h-12 flex items-center">
        <AtSymbolIcon className="h-6 w-6 text-gray-400" />
      </span>
      <input
        type="text"
        className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={props.required}
        disabled
        placeholder="domaine.com"
      />
    </div>
  );
}
