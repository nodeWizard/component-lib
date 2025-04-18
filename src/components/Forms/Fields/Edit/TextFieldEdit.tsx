"use client";

import { useState } from "react";
import { FieldProps } from "../Field";

export default function TextFieldEdit(props: FieldProps) {
  const fieldConfig = JSON.parse(props.content);
  const initialMaxLength = fieldConfig?.maxLength || 255;

  const [maxLength, setMaxLength] = useState(initialMaxLength);

  const handleMaxLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue == "") {
      setMaxLength(0);
      return;
    }

    const newMaxLength = parseInt(inputValue, 10);

    if (!isNaN(newMaxLength)) {
      setMaxLength(newMaxLength);

      const updatedContent = {
        ...fieldConfig,
        maxLength: newMaxLength,
      };

      fetch(`http://localhost:8080/fields/edit/${props.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: props.formId,
          pageId: props.pageId,
          content: JSON.stringify(updatedContent),
        }),
      });
    }
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex items-center w-full gap-1">
        <input
          type="text"
          placeholder={props.label}
          className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required={props.required}
          disabled
          maxLength={maxLength}
        />
      </div>

      <label className="h3-title text-gray-400 text-nowrap">Taille max :</label>

      <div className="flex items-center gap-1">
        <input
          type="number"
          value={maxLength == 0 ? "" : maxLength}
          onChange={handleMaxLengthChange}
          className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          min={1}
          max={500}
        />
      </div>
    </div>
  );
}
