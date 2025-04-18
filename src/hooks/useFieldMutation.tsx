import { gql, useMutation } from "@apollo/client";

const UPDATE_OR_CREATE_SUBMISSION = gql`
  mutation UpdateOrCreateSubmission($formId: String!, $responses: JSON!, $externalId: String) {
    updateOrCreateSubmission(formId: $formId, responses: $responses, externalId: $externalId) {
      id
      submittedAt
    }
  }
`;

export function useFieldMutation(formId: string) {
  const [updateOrCreateSubmission] = useMutation(UPDATE_OR_CREATE_SUBMISSION);

  const handleUpdate = async (responses: any) => {
    try {
      const externalId = await fetch(`http://localhost:8080/userid/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if(externalId.status == 200) {
        await updateOrCreateSubmission({
          variables: {
            formId,
            responses,
            externalId: await externalId.json()
          },
        });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la soumission :", error);
    }
  };

  return handleUpdate;
}
