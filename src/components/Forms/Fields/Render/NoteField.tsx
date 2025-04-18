"use client";

import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useFieldMutation } from "../../../../hooks/useFieldMutation";
import { FilledFieldProps } from "../Field";

export default function NoteField(props: FilledFieldProps) {
  const handleUpdate = useFieldMutation(props.formId);
  const [rating, setRating] = useState(Number(props.value));

  const handleClick = (value: number) => {
    setRating(value);

    const responses = [
      {
        fieldId: props.id,
        pageId: props.pageId,
        value: value.toString(),
      },
    ];
    handleUpdate(responses);
  };

  return (
    <div className="flex items-center justify-center">
        <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            return (
            <button
                key={starValue}
                type="button"
                onClick={() => handleClick(starValue)}
                className="text-yellow-500 focus:outline-none"
            >
                {starValue <= rating ? (
                <SolidStarIcon className="size-10"/>
                ) : (
                <OutlineStarIcon  className="size-10"/>
                )}
            </button>
            );
        })}
        </div>
    </div>
  );
}
