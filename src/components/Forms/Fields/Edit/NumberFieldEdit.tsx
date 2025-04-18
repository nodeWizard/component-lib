"use client";

import { useState } from "react";
import { FieldProps } from "../Field";

export default function NumberFieldEdit(props: FieldProps) {
  const initialContent = props.content ? JSON.parse(props.content) : { unit: "" };
  const [unit, setUnit] = useState(initialContent.unit);

  const handleUnitChange = async (newUnit: string) => {
    setUnit(newUnit);
    const updatedContent = JSON.stringify({ unit: newUnit });

    await fetch(`http://localhost:8080/fields/edit/${props.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formId: props.formId,
        pageId: props.pageId,
        content: updatedContent,
      }),
    });
  };

  return (
    <div className="flex gap-4 items-center">
      <input
        type="number"
        className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={props.required}
        disabled
      />

      <label className="text-gray-900 dark:text-white text-lg font-normal text-gray-400 text-nowrap">Unité :</label>

      <input
        type="text"
        className="h-12 w-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Unité"
        value={unit}
        onChange={(e) => handleUnitChange(e.target.value)}
      />
    </div>
  );
}
