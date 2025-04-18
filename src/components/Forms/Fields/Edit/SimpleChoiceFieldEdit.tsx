"use client";

import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import EditText from "../../../EditText";
import { FieldProps } from "./../Field";

export default function SimpleChoiceFieldEdit(props: FieldProps) {
  const [choices, setChoices] = useState<string[]>(JSON.parse(props.content) || []);

  const handleAddChoice = async () => {
    const defaultChoice = "New Choice";
    const updatedChoices = [...choices, defaultChoice];
    setChoices(updatedChoices);

    await fetch(`http://localhost:8080/fields/edit/${props.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formId: props.formId,
        pageId: props.pageId,
        content: JSON.stringify(updatedChoices),
      }),
    });
  };

  const handleEditChoice = async (index: number, newValue: string) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = newValue;
    setChoices(updatedChoices);

    await fetch(`http://localhost:8080/fields/edit/${props.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formId: props.formId,
        pageId: props.pageId,
        content: JSON.stringify(updatedChoices),
      }),
    });
  };

  const handleDeleteChoice = async (index: number) => {
    const updatedChoices = choices.filter((_, idx) => idx !== index);
    setChoices(updatedChoices);

    await fetch(`http://localhost:8080/fields/edit/${props.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formId: props.formId,
        pageId: props.pageId,
        content: JSON.stringify(updatedChoices),
      }),
    });
  };

  return (
    <div>
      <form>
        {choices.map((choice, idx) => (
          <div key={choice + idx} className="flex gap-4 items-center">
            <button
              type="button"
              onClick={() => handleDeleteChoice(idx)}
              className="p-2 text-red-500 hover:text-red-700"
              title="Delete choice"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
            <input
              id={choice + idx}
              type="radio"
              name={`simple-choice-${props.id}`}
              className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required={props.required}
              disabled
            />
            <label className="text-gray-900 dark:text-white text-lg font-normal" htmlFor={choice + idx}>
              <EditText
                placeholder="Ajouter un choix"
                className="h-12 w-full bg-white dark:bg-slate-800 text-sm block focus:outline-none"
                text={choice}
                setText={async (newText) => await handleEditChoice(idx, newText)}
              />
            </label>
          </div>
        ))}
      </form>
      <div className="flex gap-2 mt-4 items-center">
        <button type="button" className="self-center" onClick={handleAddChoice} title="Add choice">
          <PlusIcon className="size-8 p-1 hover:border hover:border-gray-300 hover:rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-400 hover:text-gray-500" />
        </button>
        <label className="h-12 w-full bg-white dark:bg-slate-800 text-sm block focus:outline-none text-gray-900 dark:text-white text-base font-normal self-center text-gray-400">
          Ajouter un choix
        </label>
      </div>
    </div>
  );
}
