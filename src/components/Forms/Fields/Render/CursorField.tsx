"use client";

import { useState } from "react";
import { useFieldMutation } from "../../../../hooks/useFieldMutation";
import { FilledFieldProps } from "../Field";

export default function CursorField(props: FilledFieldProps) {
  const handleUpdate = useFieldMutation(props.formId);
  const [cursorValue, setCursorValue] = useState(props.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value : string = event.target.value;
    setCursorValue(value);

    const responses = [
      {
        fieldId: props.id,
        pageId: props.pageId,
        value,
      },
    ];
    handleUpdate(responses);
  };

  const fieldConfig = JSON.parse(props.content);
  const min = fieldConfig?.min || 0;
  const max = fieldConfig?.max || 100;
  const step = fieldConfig?.step || 1;

  return (
    <div className="flex items-center w-full gap-4">
      <label className="h3-title text-gray-400">{min}</label>
      <div className="flex flex-col justify-center w-full">
        <input
          type="range"
          className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required={props.required}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          value={cursorValue}
        />
        <div className="flex justify-center">
          <span className="text-gray-500">{cursorValue}</span>
        </div>
      </div>
      <label className="h3-title text-gray-400">{max}</label>
    </div>
  );
}
