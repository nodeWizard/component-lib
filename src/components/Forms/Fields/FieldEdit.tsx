import { EyeIcon, EyeSlashIcon, FunnelIcon, LockClosedIcon, LockOpenIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import EditText from "../../EditText";
import CommentFieldEdit from "./Edit/CommentFieldEdit";
import CursorFieldEdit from "./Edit/CursorFieldEdit";
import DateFieldEdit from "./Edit/DateFieldEdit";
import EmailFieldEdit from "./Edit/EmailFieldEdit";
import FileFieldEdit from "./Edit/FileFieldEdit";
import HourFieldEdit from "./Edit/HourFieldEdit";
import ImageFieldEdit from "./Edit/ImageFieldEdit";
import ListFieldEdit from "./Edit/ListFieldEdit";
import MultipleChoiceFieldEdit from "./Edit/MultipleChoiceFieldEdit";
import NoteFieldEdit from "./Edit/NoteFieldEdit";
import NumberFieldEdit from "./Edit/NumberFieldEdit";
import PhoneFieldEdit from "./Edit/PhoneFieldEdit";
import SeparatorFieldEdit from "./Edit/SeparatorFieldEdit";
import SimpleChoiceFieldEdit from "./Edit/SimpleChoiceFieldEdit";
import TextAreaFieldEdit from "./Edit/TextAreaFieldEdit";
import TextFieldEdit from "./Edit/TextFieldEdit";
import TitleFieldEdit from "./Edit/TitleFieldEdit";
import { FieldProps } from "./Field";
// import { useNavigate } from "react-router-dom";

async function fetchFields(formId: string) {
    const fields = await fetch(`http://localhost:8080/fields`).then(async (f) => await f.json());

    return fields.filter((field : {formId: string}) => field.formId === formId);
}

async function deleteField( formId: string, pageId: number, fieldId: number) {
    await fetch(`http://localhost:8080/fields/${fieldId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId, formId }),
    });
    // .then(() => navigate(`/forms/edit/${formId}/${pageId}`));
}

async function setLabel(formId: string, pageId: number, fieldId: number, label: string) {
    await fetch(`http://localhost:8080/fields/edit/${fieldId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId, pageId, label }),
    });
}

async function setPlaceholder(formId: string, pageId: number, fieldId: number, placeholder: string) {
    await fetch(`http://localhost:8080/fields/edit/${fieldId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId, pageId, placeholder }),
    });
}

async function toggleRequired(formId: string, pageId: number, fieldId: number, required: boolean) {
    await fetch(`http://localhost:8080/fields/edit/${fieldId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId, pageId, required: !required }),
    });
}

async function toggleVisible(formId: string, pageId: number, fieldId: number, visible: boolean) {
    await fetch(`http://localhost:8080/fields/edit/${fieldId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId, pageId, visible: !visible }),
    });
}

async function toggleConfidential(formId: string, pageId: number, fieldId: number, confidential: boolean) {
    await fetch(`http://localhost:8080/fields/edit/${fieldId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId, pageId, confidential: !confidential }),
    });
}

export default function FieldEdit(props: FieldProps) {
    const [localLabel, setLocalLabel] = useState(props.label);
    const [localRequired, setLocalRequired] = useState(props.required);
    const [localVisiblity, setLocalVisiblity] = useState(props.visible);
    const [localConfidentiality, setLocalConfidentiality] = useState(props.confidential);
    const [localPlaceholder, setLocalPlaceholder] = useState(props.placeholder || "");
    const [fields, setFields] = useState<any[]>([]);
    const [conditions, setConditions] = useState<any[]>(props.conditions);
    // const navigate = useNavigate();

    async function addCondition(formId: string, pageId: number, fieldId: number, conditionedFormId: string, conditionedPageId: number, conditionedFieldId: number) {
        await fetch(
            `http://localhost:8080/conditions`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                 body: JSON.stringify({
                    formId: formId,
                    pageId: pageId,
                    fieldId: fieldId,
                    conditionedFormId: conditionedFormId,
                    conditionedPageId: conditionedPageId,
                    conditionedFieldId: conditionedFieldId,
                    op: "EQUAL",
                    value: "0",
                }),
            }
        ).then(() => {
            setConditions([...conditions, {formId, pageId, fieldId, conditionedFormId, conditionedPageId, conditionedFieldId, op: "EQUAL", value: "0"}]);
            // navigate(`/forms/edit/${formId}/${pageId}`);
        });
    }

    async function updateCondition(formId: string, pageId: number, conditionId: number, updatedCondition: any) {
        await fetch(
            `http://localhost:8080/conditions/edit/${conditionId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCondition),
            }
        ).then(() => {
            setConditions(prevConditions => prevConditions.map(condition =>
                condition.id === conditionId ? { ...condition, ...updatedCondition } : condition
            ));
            // navigate(`/forms/edit/${formId}/${pageId}`);
        });
    }

    async function deleteCondition(formId: string, pageId: number, fieldId: number, conditionId: number) {
        await fetch(
            `http://localhost:8080/conditions/${conditionId}`,
            {
                method: 'DELETE'
            }
        ).then(() => {
            setConditions(conditions.filter((condition) => condition.id !== conditionId));
            // navigate(`/forms/edit/${formId}/${pageId}`);
        });
    }

    useEffect(() => {
        const loadFields = async () => {
            try {
                const data = await fetchFields(props.formId);
                setFields(data);
            } catch (error) {
                console.error("Failed to load fields", error);
            }
        };
        loadFields();
    }, [props.formId]);

    let field = <></>;
    switch (props.type) {
        case "TEXT":
            field = <TextFieldEdit {...props} conditions={[]}/>;
            break;
        case "PHONE":
            field = <PhoneFieldEdit {...props} conditions={[]}/>;
            break;
        case "EMAIL":
            field = <EmailFieldEdit {...props} conditions={[]}/>;
            break;
        case "NUMBER":
            field = <NumberFieldEdit {...props} conditions={[]}/>;
            break;
        case "TEXT_AREA":
            field = <TextAreaFieldEdit {...props} conditions={[]}/>;
            break;
        case "LIST":
            field = <ListFieldEdit {...props} conditions={[]}/>;
            break;
        case "MULTIPLE_CHOICE":
            field = <MultipleChoiceFieldEdit {...props} conditions={[]}/>;
            break;
        case "SIMPLE_CHOICE":
            field = <SimpleChoiceFieldEdit {...props} conditions={[]}/>;
            break;
        case "FILE":
            field = <FileFieldEdit {...props} conditions={[]}/>;
            break;
        case "DATE":
            field = <DateFieldEdit {...props} conditions={[]}/>;
            break;
        case "HOUR":
            field = <HourFieldEdit {...props} conditions={[]}/>;
            break;
        case "NOTE":
            field = <NoteFieldEdit {...props} conditions={[]}/>;
            break;
        case "CURSOR":
            field = <CursorFieldEdit {...props} conditions={[]}/>;
            break;
        case "TITLE":
            field = <TitleFieldEdit {...props} conditions={[]}/>;
            break;
        case "COMMENT":
            field = <CommentFieldEdit {...props} conditions={[]}/>;
            break;
        case "SEPARATOR":
            field = <SeparatorFieldEdit {...props} conditions={[]}/>;
            break;
        case "IMAGE":
            field = <ImageFieldEdit {...props} conditions={[]}/>;
            break;
        default:
            field = <p>Other Field</p>;
            break;
    }

    const handleLabelChange = async (newLabel: string) => {
        setLocalLabel(newLabel);
        await setLabel(props.formId, props.pageId, props.id, newLabel);
    };

    const handleRequiredChange = async (required: boolean) => {
        setLocalRequired(!required)
        await toggleRequired(props.formId, props.pageId, props.id, required);
    }

    const handleVisibleChange = async (visible: boolean) => {
        setLocalVisiblity(!visible)
        await toggleVisible(props.formId, props.pageId, props.id, visible);
    }

    const handleConfidentialChange = async (confidential: boolean) => {
        setLocalConfidentiality(!confidential)
        await toggleConfidential(props.formId, props.pageId, props.id, confidential);
    }

    const handlePlaceholderChange = async (newPlaceholder: string) => {
        setLocalPlaceholder(newPlaceholder);
        await setPlaceholder(props.formId, props.pageId, props.id, newPlaceholder);
    };

    return (
        <div className="flex group gap-x-4">
            <div className="flex flex-col justify-center invisible group-hover:visible group-focus-within:visible group-hover:animate-[custom-bounce] transition-all duration-200 delay-200 ease-in">
                <form action={async () => { await deleteField( props.formId, props.pageId, props.id); }} className="self-center">
                    <button title="Delete field">
                        <TrashIcon className="size-8 p-1 hover:border hover:border-gray-300 hover:rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-red-400 hover:text-red-500" />
                    </button>
                </form>
                <form action={async () => { await addCondition(props.formId, props.pageId, props.id, props.formId, 0, 0) }} className="self-center">
                    <button title="Add conditionnal filter">
                        <FunnelIcon className="size-8 p-1 hover:border hover:border-gray-300 hover:rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-blue-400 hover:text-blue-500" />
                    </button>
                </form>
            </div>
            <div className="flex flex-col w-full text-gray-500">
                <label className="text-gray-400">{props.type}</label>
                <div key={props.id} className="flex flex-col m-4 border rounded-lg border-gray-700 p-4 w-full gap-4">
                    <div className="flex flex-row gap-2 items-center">
                        {!["SEPARATOR", "IMAGE"].includes(props.type) ?
                            <div className="flex flex-col w-full">
                                <EditText
                                    placeholder="Saisissez un nom de champ"
                                    className="h3-title"
                                    text={localLabel}
                                    setText={handleLabelChange}
                                />
                                <EditText
                                    placeholder="Saisissez un placeholder"
                                    className="text-gray-400"
                                    text={localPlaceholder}
                                    setText={handlePlaceholderChange}
                                />
                            </div>
                        : ""}
                        <div className="flex flex-row gap-2 items-center">
                            {!["SEPARATOR", "IMAGE", "TITLE", "COMMENT"].includes(props.type) ?
                                <>
                                    <form action={() => { handleRequiredChange(localRequired) }}>
                                        <button className="size-6" title="Toggle required">
                                            <span className="leading-3 h-4 w-4 table-cell">
                                                {localRequired ? <span className="size-4 text-red-400">✻</span> : <span className="size-4 text-gray-400">✻</span>}
                                            </span>
                                        </button>
                                    </form>
                                    <form action={async () => { handleConfidentialChange(localConfidentiality); }}>
                                        <button className="size-6" title="Toggle confidential">
                                            {localConfidentiality ? <LockClosedIcon className="size-4 text-red-400"/> : <LockOpenIcon className="size-4 text-gray-400"/>}
                                        </button>
                                    </form>
                                </>
                            : ""}
                            <form action={async () => { handleVisibleChange(localVisiblity); }}>
                                <button className="size-6" title="Toggle visible">
                                    {localVisiblity ? <EyeSlashIcon className="size-4 text-blue-400"/> : <EyeIcon className="size-4 text-gray-400"/>}
                                </button>
                            </form>
                        </div>
                    </div>
                    {field}
                    {conditions.length > 0 && (
                        <h4 className="text-gray-900 dark:text-white text-lg font-normal">Conditions :</h4>
                    )}
                    {conditions.sort((a, b) => a.id.localeCompare(b.id)).map((condition, index) => (
                        <div key={index} className="flex flex-row gap-2 items-center">
                            <select
                                value={`${condition.conditionedFormId}/${condition.conditionedPageId}/${condition.conditionedFieldId}`}
                                onChange={async (e) => {
                                    const [conditionedFormId, conditionedPageId, conditionedFieldId] = e.target.value.split("/").map(v => isNaN(Number(v)) ? v : parseInt(v));
                                    await updateCondition(condition.formId, condition.pageId, condition.id, {
                                        conditionedFormId, conditionedPageId, conditionedFieldId,
                                        op: condition.op,
                                        value: condition.value
                                    });
                                }}
                                className="h-12 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 appearance-none bg-no-repeat dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                {fields?.filter(field => `${condition.formId}/${condition.pageId}/${condition.fieldId}` !== `${field.formId}/${field.pageId}/${field.id}`)
                                    .map(field => (
                                        <option key={`${field.formId}/${field.pageId}/${field.id}`} value={`${field.formId}/${field.pageId}/${field.id}`}>
                                            {field.label}
                                        </option>
                                    ))}
                            </select>
                            <select
                                value={condition.op}
                                onChange={async (e) => await updateCondition(condition.formId, condition.pageId, condition.id, {
                                    ...condition, op: e.target.value
                                })}
                                className="h-12 w-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 appearance-none bg-no-repeat dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="EQUAL">{"="}</option>
                                <option value="DIFFERENT">{"!="}</option>
                                <option value="LOWER_EQUAL">{"<="}</option>
                                <option value="LOWER_THAN">{"<"}</option>
                                <option value="GREATER_EQUAL">{">="}</option>
                                <option value="GREATER_THAN">{">"}</option>
                            </select>
                            <input
                                type="text"
                                value={condition.value}
                                onChange={async (e) => await updateCondition(condition.formId, condition.pageId, condition.id, {
                                    ...condition, value: e.target.value
                                })}
                                placeholder="Value"
                                className="h-12 w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <button onClick={async () => await deleteCondition(props.formId, props.pageId, props.id, condition.id)} title="Delete condition">
                                <TrashIcon className="size-8 p-1 hover:border hover:border-gray-300 hover:rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-red-400 hover:text-red-500" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
