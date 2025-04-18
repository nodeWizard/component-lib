"use client";

import { useState } from "react";
import { useFieldMutation } from "../../../../hooks/useFieldMutation";
import { FilledFieldProps } from "../Field";

export default function ListField(props: FilledFieldProps) {
  const handleUpdate = useFieldMutation(props.formId);
  const options: string[] = JSON.parse(props.content);

  const [listValue, setListValue] = useState(props.value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value : string = event.target.value;
    setListValue(value);

    const responses = [
      {
        fieldId: props.id,
        pageId: props.pageId,
        value: JSON.stringify([value]),
      },
    ];

    handleUpdate(responses);
  };

  return (
    <select
      className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 appearance-none bg-no-repeat dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      required={props.required}
      onChange={handleChange}
      value={listValue}
    >
      <option value="">{props.label}</option>
      {options.map((option, idx) => (
        <option key={option + idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}