"use client";

import { FieldProps } from "../Field";

export default function SeparatorField(props: FieldProps) {
  return (
    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id={props.label}>
      <hr />
    </div>
  );
}
