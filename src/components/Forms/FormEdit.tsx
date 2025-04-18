import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";

import EditText from "../EditText";
import { IdFormProps } from "./Form";
import PageEdit from "./Pages/PageEdit";
import { Link } from "react-router-dom";

async function setTitle( formId: string, pageId: number, title: string) {
  await fetch(`http://localhost:8080/forms/edit/${formId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  // navigate(`/forms/edit/${formId}/${pageId}`);
}

async function setDescription( formId: string, pageId: number, description: string) {
  await fetch(`http://localhost:8080/forms/edit/${formId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });
  // navigate(`/forms/edit/${formId}/${pageId}`);
}

async function createPage(formId: string) {
  const response = await fetch(`http://localhost:8080/pages/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formId }),
  });
  const newPage = await response.json();
  // navigate(`/forms/edit/${formId}/${newPage.id}`);
}

async function deletePage(formId: string, pageId: number) {
  const response = await fetch(`http://localhost:8080/pages/${pageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formId }),
  });
  const newPageId = await response.json();

  await fetch(`http://localhost:8080/forms/edit/${formId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pageCount: { decrement: 1 } }),
  });

  // navigate(`/forms/edit/${formId}/${newPageId}`);
}

export default function FormEdit(props: IdFormProps) {
  // let isInsideRouter = true;

  // try {
  //   useLocation(); // This will throw an error if not inside a Router
  // } catch (error) {
  //   isInsideRouter = false;
  // }

  // if (!isInsideRouter) {
  //   console.warn("FormEdit must be used inside a <BrowserRouter>. Please wrap it in a Router.");
  //   return <div>Error: FormEdit must be inside a Router.</div>;
  // }

  console.log("🚀 ~ FormEdit props:", props);
  // const navigate = useNavigate();
  const previousPageId = Math.max(0, Number(props.pageId) - 1);
  const nextPageId = Math.min(Number(props.pageCount) - 1, Number(props.pageId) + 1);
  const currentPageId = props.pages.find((p) => p.id == props.pageId) ? Number(props.pageId) + 1 : 0;
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-white dark:bg-slate-800">
        <div className="flex m-4 p-4 w-1/2 flex-col">
          <div className="flex gap-4 ml-10">
            <EditText
              placeholder="Saisissez un titre"
              className="text-gray-900 dark:text-white text-xl font-bold"
              text={props.title}
              setText={(t) => {
                setTitle(props.id, props.pageId, t);
              }}
            />
          </div>
          <div className="flex gap-4 ml-10">
            <EditText
              placeholder="Saisissez une description"
              className="text-gray-900 dark:text-white text-lg font-normal"
              text={props.description ?? ""}
              setText={(t) => setDescription( props.id, props.pageId, t)}

            />
          </div>
          <br />
          {/*@ts-expect-error: In practice the props are never null */}
          {props.pages.find((p) => p.id == props.pageId) ? <PageEdit {...props.pages.find((p) => p?.id == props.pageId)} /> : <></>}

          <div className="flex gap-4 ml-16 mr-4 group justify-center">
            {props.pageId <= 0 ? (
              <></>
            ) : (
              <Link className="flex" to={`/forms/edit/${props.id}/${previousPageId}`} title="Previous page">
                <ArrowLeftIcon className="size-8 p-1 hover:border hover:border-gray-300 hover:rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-400 hover:text-gray-500" />
              </Link>
            )}

            <label className="text-xl font-medium text-gray-400 self-center">
              Page {currentPageId} / {props.pageCount}
            </label>

            {props.pageId >= props.pageCount - 1 ? (
                <>
                <button className="self-center" title="New page" onClick={() => createPage( props.id)}>
                  <PlusIcon className="size-8 p-1 hover:border hover:border-gray-300 hover:rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-400 hover:text-gray-500" />
                </button>
                <button className="self-center" title="Delete page" onClick={() => deletePage( props.id, props.pageId)}>
                  <TrashIcon className="size-8 p-1 hover:border hover:border-gray-300 hover:rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-400 hover:text-gray-500" />
                </button>
              </>
            ) : (
              <Link className="flex" to={`/forms/edit/${props.id}/${nextPageId}`} title="Next page">
                <ArrowRightIcon className="size-8 p-1 hover:border hover:border-gray-300 hover:rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-400 hover:text-gray-500" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
