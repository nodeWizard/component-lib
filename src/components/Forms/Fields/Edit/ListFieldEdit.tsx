"use client";

import { PlusIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import EditText from "../../../EditText";
import { FieldProps } from "../Field";

export default function ListFieldEdit(props: FieldProps) {
  const [options, setOptions] = useState<string[]>(JSON.parse(props.content) || []);
  const [newOption, setNewOption] = useState<string>("");

  const handleAddOption = async () => {
    if (newOption.trim()) {
      const updatedOptions = [...options, newOption.trim()];
      setOptions(updatedOptions);
      setNewOption("");

      await fetch(`http:
        //localhost:8080/fields/edit/${props.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: props.formId,
          pageId: props.pageId,
          content: JSON.stringify(updatedOptions),
        }),
      });
    }
  };

  return (
    <div>
      <select
        className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={props.required}
      >
        <option defaultValue={props.label} disabled>{props.label}</option>
        {options.map((option, idx) => (
          <option key={option + idx} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="mt-4 flex gap-2 items-center">
        <EditText
          placeholder="Ajouter une option"
          className="h3-title"
          text={newOption}
          setText={setNewOption}
        />
        <button
          type="button"
          onClick={handleAddOption}
          className="self-center"
        >
          <PlusIcon className="size-8 p-1 hover:border hover:border-gray-300 hover:rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-400 hover:text-gray-500" />
        </button>
      </div>
    </div>
  );
}
