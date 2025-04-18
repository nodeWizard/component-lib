"use client";

import { useState } from "react";
import { useFieldMutation } from "../../../../hooks/useFieldMutation";
import { FilledFieldProps } from "../Field";

export default function HourField(props: FilledFieldProps) {
  const handleUpdate = useFieldMutation(props.formId);

  const [hourValue, setHourValue] = useState(props.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value : string = event.target.value;
    setHourValue(value);

    const responses = [
      {
        fieldId: props.id,
        pageId: props.pageId,
        value,
      },
    ];
    handleUpdate(responses);
  };

  return (
    <input
      type="time"
      className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={props.label}
      required={props.required}
      onChange={handleChange}
      value={hourValue}
    />
  );
}
