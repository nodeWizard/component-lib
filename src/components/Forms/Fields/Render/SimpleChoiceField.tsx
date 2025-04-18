"use client";

import { useState } from "react";
import { useFieldMutation } from "../../../../hooks/useFieldMutation";
import { FilledFieldProps } from "../Field";

export default function SimpleChoiceField(props: FilledFieldProps) {
  const handleUpdate = useFieldMutation(props.formId);

  const [selectedValue, setSelectedValue] = useState<string>(props.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setSelectedValue(key);

    const responses = [
      {
        fieldId: props.id,
        pageId: props.pageId,
        value: key,
      },
    ];
    handleUpdate(responses);
  };

  const inputs: string[] = JSON.parse(props.content);
  return (
    <>
      <fieldset>
        {inputs?.map((i, idx) => (
          <div key={i + idx} className="flex gap-4 items-center ml-6">
            <input
              id={i + idx}
              type="radio"
              name={`simple-choice-${props.id}`}
              className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required={props.required}
              onChange={(e) => handleChange(e, i)}
              checked={selectedValue === i}
            />
            <label className="text-gray-900 dark:text-white text-lg font-normal" htmlFor={i + idx}>
              {i}
            </label>
          </div>
        ))}
      </fieldset>
    </>
  );
}
