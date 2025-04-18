"use client";

import { FieldProps } from "../Field";

export default function TitleField(props: FieldProps) {
    return (
        <div id={props?.label}>
            <label className="text-gray-900 dark:text-white text-3xl font-bold">{props?.label}</label>
        </div>
    );
}
