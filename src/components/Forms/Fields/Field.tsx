
import CommentField from "./Render/CommentField";
import CursorField from "./Render/CursorField";
import DateField from "./Render/DateField";
import EmailField from "./Render/EmailField";
import FileField from "./Render/FileField";
import HourField from "./Render/HourField";
import ImageField from "./Render/ImageField";
import ListField from "./Render/ListField";
import MultipleChoiceField from "./Render/MultipleChoiceField";
import NoteField from "./Render/NoteField";
import NumberField from "./Render/NumberField";
import PhoneFieldEdit from "./Render/PhoneField";
import SeparatorField from "./Render/SeparatorField";
import SimpleChoiceField from "./Render/SimpleChoiceField";
import TextAreaField from "./Render/TextAreaField";
import TextField from "./Render/TextField";
import TitleField from "./Render/TitleField";

export enum OperationType {
  EQUAL,
  DIFFERENT,
  LOWER_EQUAL,
  LOWER_THAN,
  GREATER_EQUAL,
  GREATER_THAN
}

export interface Condition {
  id: number
  conditionedFormId: string
  conditionedPageId: number
  conditionedFieldId: number
  formId: string
  pageId: number
  fieldId: number
  op: OperationType
  value: string
}

export interface FieldProps {
  id: number;
  label: string;
  content: string;
  placeholder: string;
  conditions: Condition[];
  type: string;
  required: boolean;
  visible: boolean;
  confidential: boolean;
  formId: string;
  pageId: number;
}

export interface FilledFieldProps extends FieldProps {
  value: string;
}

export default function Field (props : FilledFieldProps) {
    let field = <></>
    switch (props.type) {
        case "TEXT":
            field = <TextField {...props} value={props.value}/>
            break;
        case "PHONE":
            field = <PhoneFieldEdit {...props} value={props.value}/>
            break;
        case "EMAIL":
            field = <EmailField {...props} value={props.value}/>
            break;
        case "NUMBER":
            field = <NumberField {...props} value={props.value}/>
            break;
        case "TEXT_AREA":
            field = <TextAreaField {...props} value={props.value}/>
            break;
        case "LIST":
            field = <ListField {...props} value={props.value}/>
            break;
        case "MULTIPLE_CHOICE":
            field = <MultipleChoiceField {...props} value={props.value}/>
            break;
        case "SIMPLE_CHOICE":
            field = <SimpleChoiceField {...props} value={props.value}/>
            break;
        case "FILE":
            field = <FileField {...props} value={props.value}/>
            break;
        case "DATE":
            field = <DateField {...props} value={props.value}/>
            break;
        case "HOUR":
            field = <HourField {...props} value={props.value}/>
            break;
        case "NOTE":
            field = <NoteField {...props} value={props.value}/>
            break;
        case "CURSOR":
            field = <CursorField {...props} value={props.value}/>
            break;
        case "TITLE":
            field = <TitleField {...props}/>
            break;
        case "COMMENT":
            field = <CommentField {...props}/>;
            break;
        case "SEPARATOR":
            field = <SeparatorField {...props}/>;
            break;
        case "IMAGE":
            field = <ImageField {...props}/>;
            break;
        default:
            field = <p>Other Field</p>
            break;
    }

    if (["TITLE", "COMMENT", "SEPARATOR", "IMAGE"].includes(props.type)) {
        return (
            <div key={props.id} className="flex flex-col m-4 grow">
                {field}
            </div>
        )
    } else {
        return (
            <div key={props.id} className="flex flex-col m-4 grow">
                <div className="flex flex-row gap-2 items-center">
                    <label className="text-gray-900 dark:text-white text-lg font-normal">{props.label}</label>
                    {props.required ? <span className="text-red-400 size-6 leading-3 h-4 w-2 table-cell">✻</span> : ""}
                    <label className="text-gray-900 dark:text-white text-lg font-normal"> : </label>
                </div>
                {field}
                <div className="flex flex-row gap-2 items-center">
                    {props.placeholder &&
                        <label className="text-gray-900 dark:text-white text-base font-normal text-gray-500 ml-1">Exemple : {props.placeholder}</label>
                    }
                </div>
            </div>
        );
    }
}
