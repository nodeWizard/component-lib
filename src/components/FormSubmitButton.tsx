
import { gql, useMutation } from '@apollo/client';

const SUBMIT_FORM_MUTATION = gql`
  mutation SubmitForm($formId: String!) {
    submitForm(formId: $formId) {
      id
      submittedAt
    }
  }
`;

export default function FormSubmitButton({ formId }: { formId: string }) {
  const [submitForm] = useMutation(SUBMIT_FORM_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await submitForm({
        variables: { formId },
      });
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  };

  return (
    <button type="submit" className="h-12 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4" onClick={handleSubmit}>
      Envoyer
    </button>
  );
}
