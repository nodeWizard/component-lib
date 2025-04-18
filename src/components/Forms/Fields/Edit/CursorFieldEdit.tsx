"use client";

import { useState } from "react";
import { FieldProps } from "../Field";

export default function CursorFieldEdit(props: FieldProps) {
  const fieldConfig = JSON.parse(props.content);
  const initialMin = fieldConfig?.min || 0;
  const initialMax = fieldConfig?.max || 100;
  const initialStep = fieldConfig?.step || 1;

  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);
  const [step, setStep] = useState(initialStep);

  const handleRangeParamChange = (param: string, value: number) => {
    const updatedContent = {
      ...fieldConfig,
      [param]: value,
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

    if (param == "min") setMin(value);
    if (param == "max") setMax(value);
    if (param == "step") setStep(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center w-full gap-4">
        <label className="text-gray-900 dark:text-white text-lg font-normal text-gray-400">{min}</label>
        <input
          type="range"
          className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required={props.required}
          disabled
          min={min}
          max={max}
          step={step}
        />
        <label className="text-gray-900 dark:text-white text-lg font-normal text-gray-400">{max}</label>
      </div>

      <div className="flex gap-8 items-center">
        <label className="text-gray-900 dark:text-white text-lg font-normal text-gray-400">Min / Max / Incrément :</label>
        <input
          type="number"
          value={min}
          onChange={(e) => handleRangeParamChange("min", parseInt(e.target.value, 10))}
          className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          min={0}
          max={max}
        />
        <input
          type="number"
          value={max}
          onChange={(e) => handleRangeParamChange("max", parseInt(e.target.value, 10))}
          className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          min={min}
        />
        <input
          type="number"
          value={step}
          onChange={(e) => handleRangeParamChange("step", parseInt(e.target.value, 10))}
          className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          min={1}
        />
      </div>
    </div>
  );
}
