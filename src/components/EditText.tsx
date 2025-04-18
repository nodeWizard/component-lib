// import React from "react";

import React, { useEffect, useState } from "react";

interface TextProps {
  text: string;
  className: string;
  placeholder: string;
  setText: (text: string) => void;
}

export default function EditText(props: TextProps) {
  console.log("🚀 ~ EditText ~ props:", props)
  const { text, className, setText } = props;
  const [localText, setLocalText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const [polling, setPolling] = useState<boolean>(true);

  useEffect(() => {
    if (!isEditing) {
      setLocalText(text);
    }
  }, [text, isEditing]);

  useEffect(() => {
    if (!polling) return;

    const intervalId = setInterval(async () => {
      if (!isEditing && localText !== text) {
        console.log("Polling - Syncing text with server.");
        await setText(localText);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [localText, text, polling, isEditing, setText]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    setLocalText(e.target.value);
  };

  const handleBlur = async () => {
    setIsEditing(false);
    await setText(localText);
  };

  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={localText}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={() => setPolling(false)}
      className={`h-12 w-full bg-white dark:bg-slate-800 text-sm block focus:outline-none ${className}`}
    />
  );
}
