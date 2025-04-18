"use client";

import { PhoneIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useFieldMutation } from "../../../../hooks/useFieldMutation";
import { FilledFieldProps } from "../Field";

export default function PhoneField(props: FilledFieldProps) {
  const handleUpdate = useFieldMutation(props.formId);

  let phone = /(?=\d{10})(\d{3})(\d{7})/.exec(props.value)
  let countryCode = ""
  let phoneNumber = ""

  if (phone) {
    countryCode = phone[1]
    phoneNumber = phone[2]
  }

  const [localPhone, setLocalPhone] = useState({
    countryCode,
    phoneNumber,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, part: "countryCode" | "phoneNumber") => {
    const updatedPhone = { ...localPhone, [part]: event.target.value };
    setLocalPhone(updatedPhone);

    const fullPhone = `${updatedPhone.countryCode} ${updatedPhone.phoneNumber}`;

    const responses = [
      {
        fieldId: props.id,
        pageId: props.pageId,
        value: fullPhone,
      },
    ];
    handleUpdate(responses);
  };

  return (
    <div className="flex gap-2 w-full">
      <input
        type="text"
        className="h-12 w-24 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={props.required}
        placeholder="+1"
        maxLength={4}
        onChange={(e) => handleChange(e, "countryCode")}
        value={localPhone.countryCode}
      />
      <span className="h-12 flex items-center h3-title">-</span>
      <input
        type="tel"
        className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={props.required}
        placeholder="123 456 7890"
        pattern="[0-9]{3}[ ]?[0-9]{3}[ ]?[0-9]{4}"
        onChange={(e) => handleChange(e, "phoneNumber")}
        value={localPhone.phoneNumber}
      />
      <span className="h-12 flex items-center">
        <PhoneIcon className="h-6 w-6 text-gray-400" />
      </span>
    </div>
  );
}
