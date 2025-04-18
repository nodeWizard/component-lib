
import { PlusIcon } from '@heroicons/react/16/solid';
import React, { useCallback, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

interface CreateFieldFormProps {
    formId: string;
    pageId: number;
    fieldSuggestions: string[];
    onFieldCreated: () => void;
}

export default function CreateFieldForm({ formId, pageId, fieldSuggestions, onFieldCreated }: CreateFieldFormProps) {
    // const navigate = useNavigate();
    const [fieldType, setFieldType] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        console.log(`Création d'un champ de type ${fieldType}`);

        await fetch(
            `http://localhost:8080/fields/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    formId: formId,
                    pageId: pageId,
                    type: fieldType,
                    label: ""
                })
            }
        ).then(() => {
            setFieldType("");
            onFieldCreated();
            // return navigate(`/forms/edit/${formId}/${pageId}`)
        });
    };

    const createFieldInput = useCallback((inputElement : HTMLInputElement) => {
        if (inputElement) {
          inputElement.focus();
        }
      }, []);

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex gap-x-4 w-full">
                <div className="flex invisible group-hover:visible group-focus-within:visible group-hover:animate-[custom-bounce] transition-all duration-200 delay-200 ease-in">
                    <button type="submit" className="self-center" title="Add new field">
                        <PlusIcon className="size-8 p-1 hover:border hover:border-gray-300 hover:rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-400 hover:text-gray-500" />
                    </button>
                </div>
                <div className="flex w-full">
                    <input
                        type="text"
                        placeholder="Tapez le type de champ"
                        className="h-12 w-full bg-white dark:bg-slate-800 text-sm block focus:outline-none p-title self-center"
                        value={fieldType}
                        onChange={(e) => setFieldType(e.target.value)}
                        list="field-suggestions"
                        name="field-type"
                        ref={createFieldInput}
                    />
                    <label htmlFor="field-suggestions">
                        <datalist id="field-suggestions">
                            {fieldSuggestions.map((suggestion, key) => (
                                <option key={key} value={suggestion} />
                            ))}
                        </datalist>
                    </label>
                </div>
            </div>
        </form>
    );
}
