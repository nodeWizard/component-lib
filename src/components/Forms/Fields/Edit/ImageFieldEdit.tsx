
import React, { useState } from "react";
import { FieldProps } from "../Field";

export default function ImageFieldEdit(props: FieldProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(props.label || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async () => {
        const base64Image = reader.result as string;

        setLoading(true);
        setError(null);

        try {
          const response = await fetch(`http://localhost:8080/fields/edit/${props.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              label: base64Image,
              pageId: props.pageId,
              formId: props.formId,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to update the field label.");
          }

          setImagePreview(base64Image);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {imagePreview ? (
        <div className="h-64 w-64 p-0.5">
            <img
            src={props.label}
            alt="Uploaded field"
            // width={1000}
            // height={1000}
            className="object-contain"
            />
        </div>
      ) : (
        <div className="w-32 h-32 flex items-center justify-center border rounded text-gray-500">
          No image
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        disabled={loading}
      />
      {loading && <p className="text-sm text-gray-500">Uploading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
