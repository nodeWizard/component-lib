
import { useCallback, useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateFieldForm from "../../CreateFieldForm";
import { FieldProps } from "../Fields/Field";
import FieldEdit from "../Fields/FieldEdit";

async function swapFields(idA: number, idB: number, pageId: number, formId: string) {
  try {
    const response = await fetch("http://localhost:8080/fields/swap", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idA, idB, pageId, formId }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la permutation des champs");
    }
  } catch (error) {
    console.error("Erreur lors de la permutation des champs", error);
  }
}

export interface PageProps {
  id: number;
  formId: string;
  fields: FieldProps[];
  fieldCount: number;
  fieldSuggestions: string[];
}

interface DraggableFieldProps extends FieldProps {
  moveField: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

const DraggableField = ({ moveField, index, ...fieldProps }: DraggableFieldProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: "FIELD",
    item: { index, id: fieldProps.id },
  });

  const [, drop] = useDrop({
    accept: "FIELD",
    hover: (item: { index: number; id: number }) => {
      if (item.index !== index) {
        moveField(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} className="mb-4">
      <FieldEdit key={fieldProps.id} {...fieldProps} />
    </div>
  );
};

export default function PageEdit(props?: PageProps) {
  const [fields, setFields] = useState<FieldProps[]>(props?.fields || []);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUpdatedFields = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/forms/${props?.formId}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des champs");
      }
      const data = await response.json();
      const updatedFields = data.pages.find((p: { id: number }) => p.id == props?.id)?.fields || [];
      setFields(updatedFields);
    } catch (error) {
      console.error("Erreur lors de la récupération des champs", error);
    } finally {
      setLoading(false);
    }
  }, [props?.id, props?.formId]);

  const fieldSuggestions = props?.fieldSuggestions || [
    "TEXT", "PHONE", "EMAIL", "NUMBER", "TEXT_AREA",
    "LIST", "MULTIPLE_CHOICE", "SIMPLE_CHOICE", "FILE", "DATE", "HOUR",
    "NOTE", "CURSOR", "TITLE", "COMMENT", "SEPARATOR", "IMAGE"
  ];

  useEffect(() => {
    setFields(props?.fields || []);
  }, [props?.fields]);

  const moveField = useCallback((dragIndex: number, hoverIndex: number) => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields];
      const [draggedField] = updatedFields.splice(dragIndex, 1);
      updatedFields.splice(hoverIndex, 0, draggedField);
      return updatedFields;
    });

    // Appel API pour synchroniser les changements
    const draggedFieldId = fields[dragIndex].id;
    const hoveredFieldId = fields[hoverIndex].id;
    swapFields(draggedFieldId, hoveredFieldId, props?.id ?? 0, props?.formId ?? "")
      .catch((error) => {
        console.error("Erreur lors de la permutation", error);
      });
  }, [fields, props?.id, props?.formId]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div key={props?.id}>
        {fields?.map((fieldProps, index) => (
          <DraggableField
            key={fieldProps.id}
            index={index}
            moveField={moveField}
            {...fieldProps}
          />
        ))}

        {loading && <div className="h1-title w-full h-screen flex justify-center items-center bg-white dark:bg-slate-800">Chargement...</div>}

        <div className="flex gap-4 mb-4 ml-4 mr-4 mt-4 group">
          <CreateFieldForm
            formId={props?.formId ?? ""}
            pageId={props?.id ?? 0}
            fieldSuggestions={fieldSuggestions}
            onFieldCreated={fetchUpdatedFields}
          />
        </div>
      </div>
    </DndProvider>
  );
}
