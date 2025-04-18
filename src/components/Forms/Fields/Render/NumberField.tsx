"use client";

import { useState } from "react";
import { useFieldMutation } from "../../../../hooks/useFieldMutation";
import { FilledFieldProps } from "../Field";

export default function NumberField(props: FilledFieldProps) {
  const handleUpdate = useFieldMutation(props.formId);
  const [cursorValue, setCursorValue] = useState(props.value);
  const unit = props.content ? JSON.parse(props.content).unit : "";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
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

  return (
    <div className="flex gap-2 items-center">
      <input
        type="number"
        className="h-12 w-full bg-gray-50"
        placeholder={props.label}
        required={props.required}
        onChange={handleChange}
        value={Number(cursorValue)}
      />
      {unit && <span className="text-gray-500 text-3xl">{unit}</span>}
    </div>
  );
}
