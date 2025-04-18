
import { useEffect, useState } from "react";
import Field, { Condition, FieldProps, FilledFieldProps } from "../Fields/Field";

export interface PageProps {
  id: number;
  formId: string;
  fields: FieldProps[];
  fieldCount: number;
}

interface PageWithValuesProps extends PageProps {
  responses: { fieldId: number, pageId: number, formId: string, value: string }[];
}

function evaluateCondition(
    condition: Condition,
    responses: { fieldId: number, pageId: number, formId: string, value: string }[]
  ): boolean {

  const response = responses.find(
    (r) => {
      return (
        r.fieldId == Number(condition.conditionedFieldId)
        && r.pageId == Number(condition.conditionedPageId)
        && r.formId == String(condition.conditionedFormId)
      )
    });

  if (!response) return false;

  const fieldValue = response.value;

  let result = false;

  switch (condition.op.toString()) {
    case "EQUAL":
      result = fieldValue == condition.value;
      break;
    case "DIFFERENT":
      result = fieldValue != condition.value;
      break;
    case "LOWER_THAN":
      result = parseFloat(fieldValue) < parseFloat(condition.value);
      break;
    case "LOWER_EQUAL":
      result = parseFloat(fieldValue) <= parseFloat(condition.value);
      break;
    case "GREATER_THAN":
      result = parseFloat(fieldValue) > parseFloat(condition.value);
      break;
    case "GREATER_EQUAL":
      result = parseFloat(fieldValue) >= parseFloat(condition.value);
      break;
  }

  return result;
}

function shouldDisplayField(field: FieldProps, responses: { fieldId: number, pageId: number, formId: string, value: string }[]): boolean {
  const conditions = field.conditions;

  if (!conditions) {
    return true;
  }

  return conditions.every((cond) => evaluateCondition(cond, responses));
  //.every
}

export default function Page(props: PageWithValuesProps) {
  const [visibleFields, setVisibleFields] = useState<FilledFieldProps[]>([]);

  useEffect(() => {
    const updatedFields = props.fields
      .map((field) => {
        const response = props.responses.find((r) => ((r?.fieldId == field.id) && (r?.pageId == field.pageId) && (r?.formId == field.formId)));
        return { ...field, value: response?.value || "" };
      })
      .filter((field) => {
        return (!Boolean(field.visible) !== Boolean(shouldDisplayField(field, props.responses)));
      });
    setVisibleFields(updatedFields);
  }, [props.fields, props.responses]);

  return (
    <div key={props.id}>
            {visibleFields
        .sort((a, b) => a.id - b.id)
        .map((fieldProps: FilledFieldProps) => {
          return (
            <Field key={fieldProps.id} {...fieldProps} />
          );
        })}
    </div>
  );
}
