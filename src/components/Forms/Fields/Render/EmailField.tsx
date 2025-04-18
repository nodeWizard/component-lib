"use client";

import { AtSymbolIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useFieldMutation } from "../../../../hooks/useFieldMutation";
import { FilledFieldProps } from "../Field";

export default function EmailField(props: FilledFieldProps) {
  const handleUpdate = useFieldMutation(props.formId);

  const [localEmail, setLocalEmail] = useState({
    username: props.value.split('@')[0] ?? "",
    domain: props.value.split('@')[1] ?? "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, part: "username" | "domain") => {
    const updatedEmail = { ...localEmail, [part]: event.target.value };
    setLocalEmail(updatedEmail);

    const fullEmail = `${updatedEmail.username}@${updatedEmail.domain}`;

    const responses = [
      {
        fieldId: props.id,
        pageId: props.pageId,
        value: fullEmail,
      },
    ];
    handleUpdate(responses);
  };

  return (
    <div className="flex gap-2 w-full">
      <input
        type="text"
        value={localEmail.username}
        className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="username"
        onChange={(e) => handleChange(e, "username")}
      />

      <span className="h-12 flex items-center">
        <AtSymbolIcon className="h-6 w-6 text-gray-400" />
      </span>

      <input
        type="text"
        value={localEmail.domain}
        className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="domain.com"
        onChange={(e) => handleChange(e, "domain")}
      />
    </div>
  );
}
