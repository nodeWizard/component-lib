

import { FieldProps } from "../Field";

export default function ImageField(props: FieldProps) {
  const isBase64Image = (label: string) => {
    return /^data:image\/(png|jpg|jpeg|gif);base64,/.test(label);
  };

  if (!props.label || !isBase64Image(props.label)) {
    return (
      <div className="h-40 w-full flex items-center justify-center border border-dashed border-gray-400 bg-gray-50">
        <span className="text-gray-500 text-sm">No valid image available</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
        <div className="h-64 w-64 border border-solid rounded-md p-0.5">
            <img
            src={props.label}
            alt="Uploaded field"
            width={1000}
            height={1000}
            className="object-contain"
            />
        </div>
    </div>
  );
}