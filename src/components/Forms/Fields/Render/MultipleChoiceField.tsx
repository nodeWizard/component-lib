"use client";

import { useState } from "react";
import { useFieldMutation } from "../../../../hooks/useFieldMutation";
import { FilledFieldProps } from "../Field";

export default function MultipleChoiceField(props: FilledFieldProps) {
  const handleUpdate = useFieldMutation(props.formId);
  let value = []
  if (props.value != "") {
    value = JSON.parse(props.value)
  }
  const [selectedChoices, setSelectedChoices] = useState<string[]>(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    let updatedChoices = [...selectedChoices];

    if (event.target.checked) {
      updatedChoices.push(key);
    } else {
      updatedChoices = updatedChoices.filter(choice => choice !== key);
    }

    setSelectedChoices(updatedChoices);

    const responses = [
      {
        fieldId: props.id,
        pageId: props.pageId,
        value: JSON.stringify(updatedChoices),
      },
    ];

    handleUpdate(responses);
  };

  const inputs: string[] = JSON.parse(props.content);

  return (
    <>
      {
        inputs?.map((i, idx) => {
          return (
            <div key={i + idx} className="flex gap-4 items-center ml-6">
              <input
                id={i + idx}
                type="checkbox"
                className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required={props.required}
                onChange={(e) => handleChange(e, i)}
                checked={selectedChoices.includes(i)}
              />
              <label className="text-gray-900 dark:text-white text-lg font-normal" htmlFor={i + idx}>{i}</label>
            </div>
          );
        })
      }
    </>
  );
}
