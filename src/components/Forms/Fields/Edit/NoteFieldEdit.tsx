"use client";

import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { FieldProps } from "../Field";

export default function NoteFieldEdit(props: FieldProps) {
  const rating = 3;

  return (
    <div className="flex items-center justify-center opacity-60" id={props?.label}>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          return (
            <span key={starValue} className="text-gray-400">
              {starValue <= rating ? (
                <SolidStarIcon className="size-10" />
              ) : (
                <OutlineStarIcon className="size-10" />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}