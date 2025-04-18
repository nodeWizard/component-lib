"use client";

import { PhoneIcon } from "@heroicons/react/20/solid";
import { FieldProps } from "../Field";

export default function PhoneFieldEdit(props: FieldProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        className="h-12 w-24 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={props.required}
        disabled
        placeholder="+1"
        maxLength={4}
      />
      <span className="h-12 flex items-center h3-title">-</span>

      <input
        type="tel"
        className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={props.required}
        disabled
        placeholder="123 456 7890"
        pattern="[0-9]{3}[ ]?[0-9]{3}[ ]?[0-9]{4}"
      />
      <span className="h-12 flex items-center">
        <PhoneIcon className="h-6 w-6 text-gray-400" />
      </span>
    </div>
  );
}
