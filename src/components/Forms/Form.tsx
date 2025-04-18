
import { gql, useQuery } from "@apollo/client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import { useEffect } from "react";
import ErrorPage from "../ErrorPage";
import Page, { PageProps } from "./Pages/Page";
import { Link } from "react-router-dom";

const GET_SUBMISSION_BY_FORM_AND_EXTERNAL_ID = gql`
  query GetSubmissionByFormAndExternalId($formId: String!, $externalId: String!) {
    submissionByFormAndExternalId(formId: $formId, externalId: $externalId) {
      id
      responses {
        field {
          id
          pageId
          formId
        }
        value
      }
    }
  }
`;

const SUBMISSION_UPDATED = gql`
  subscription {
    submissionCreatedOrUpdated {
      id
      responses {
        field {
          id
          pageId
          formId
        }
        value
      }
    }
  }
`;

interface FormProps {
  id: string;
  title: string;
  description?: string;
  pages: PageProps[];
  pageCount: number;
  createdAt: Date;
  externalId: string;
}

export interface IdFormProps extends FormProps {
  pageId: number;
}

export default function Form(props: IdFormProps) {
  console.log("🚀 ~ Form MM~ props:", props)
  const { data, loading, error, subscribeToMore } = useQuery(GET_SUBMISSION_BY_FORM_AND_EXTERNAL_ID, {
    variables: { formId: props.id, externalId: props.externalId },
    skip: !props.id || !props.externalId,
  });
  console.log("🚀 ~ Form ~ data:", data)

  useEffect(() => {
    if (!props.id || !props.externalId) {
      console.error("ID ou externalId manquant pour la souscription.");
      return;
    }

    const unsubscribe = subscribeToMore({
      document: SUBMISSION_UPDATED,
      variables: { formId: props.id, externalId: props.externalId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData || !subscriptionData.data) {
          console.warn("Aucune donnée reçue via la souscription.");
          return prev;
        }

        const updatedSubmission = subscriptionData.data.submissionCreatedOrUpdated;

        if (!updatedSubmission) {
          console.warn("Données de mise à jour manquantes ou incorrectes.");
          return prev;
        }

        return {
          ...prev,
          submissionByFormAndExternalId: {
            ...prev.submissionByFormAndExternalId,
            responses: updatedSubmission.responses,
          },
        };
      },
    });

    return () => {
      unsubscribe();
    };
  }, [props.id, props.externalId, subscribeToMore]);

  if (loading) return <div className="h1-title w-full h-screen flex justify-center items-center bg-white dark:bg-slate-800">Chargement...</div>;
  if (error) {
    console.error("Erreur dans la requête de soumission : ", error);
    return (
      <ErrorPage
        status={error.name}
        message={
            // @ts-expect-error : error is an ApolloError
            (error.networkError?.result.errors[0]?.message ?? "") +
            (error.graphQLErrors[0]?.message ?? "") +
            (error.message ?? "")
        }
      />
    );
  }

  const responses = data?.submissionByFormAndExternalId?.responses.map((response: { field : { id : number, pageId : number, formId : string }, value : string }) => ({
      fieldId: response.field.id,
      pageId: response.field.pageId,
      formId: response.field.formId,
      value: response.value,
    }));

  const previousPageId = Math.max(0, Number(props.pageId) - 1);
  const nextPageId = Math.min(Number(props.pageCount) - 1, Number(props.pageId) + 1);
  const currentPageId = props.pages.find((p) => p.id == props.pageId) ? Number(props.pageId) + 1 : 0;

  return (
    <div className="w-full h-screen flex justify-center items-center bg-white dark:bg-slate-800">
      <form className="flex m-4 p-4 w-1/2 flex-col">
        <div className="flex gap-4">
          <h1 className="text-gray-900 dark:text-white text-xl font-bold">{props.title}</h1>
        </div>
        <div className="flex gap-4">
          <h2 className="text-gray-900 dark:text-white text-lg font-normal">{props.description ?? ""}</h2>
        </div>
        <br />
        {props.pages.find((p) => p.id == props.pageId) ? (
          <Page
            key={props.pageId}
            {...props.pages.find((p) => p.id == props.pageId)!}
            responses={responses || []}
          />
        ) : null}
        <div className="flex gap-4 ml-16 mr-4 group justify-center">
          {props.pageId <= 0 ? null : (
            <Link className="flex" to={`/forms/${props.id}/${previousPageId}`}>
              <ArrowLeftIcon className="size-8 p-1 hover:border hover:border-gray-300 hover:rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-400 hover:text-gray-500" />
            </Link>
          )}

          <label className="text-xl font-medium text-gray-400 self-center">Page {currentPageId} / {props.pageCount}</label>

          {props.pageId >= props.pageCount - 1 ? null : (
            <Link className="flex" to={`/forms/${props.id}/${nextPageId}`}>
              <ArrowRightIcon className="size-8 p-1 hover:border hover:border-gray-300 hover:rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-400 hover:text-gray-500" />
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}
