# 649FAC Documentation technique

## Sommaire

- [I. Installation](#i-installation)
- [II. Documentation](#ii-documentation)
  - [1. Composants](#1-composants)
    - [ApolloClientProvider](#apollo-client-provider)
    - [EditText](#edit-text)
    - [FormSubmitButton](#form-submit-button)
    - [CreateFieldForm](#create-field-form)
    - [ErrorPage](#error-page)
    - [Form](#form)
    - [FormEdit](#form-edit)
    - [Field](#field)
    - [FieldEdit](#field-edit)
    - [CommentFieldEdit](#comment-field-edit)
    - [FileFieldEdit](#file-field-edit)
    - [MultipleChoiceFieldEdit](#multiple-choice-field-edit)
    - [SeparatorFieldEdit](#separator-field-edit)
    - [TitleFieldEdit](#title-field-edit)
    - [CursorFieldEdit](#cursor-field-edit)
    - [HourFieldEdit](#hour-field-edit)
    - [NoteFieldEdit](#note-field-edit)
    - [SimpleChoiceFieldEdit](#simple-choice-field-edit)
    - [DateFieldEdit](#date-field-edit)
    - [ImageFieldEdit](#image-field-edit)
    - [NumberFieldEdit](#number-field-edit)
    - [TextAreaFieldEdit](#text-area-field-edit)
    - [EmailFieldEdit](#email-field-edit)
    - [ListFieldEdit](#list-field-edit)
    - [PhoneFieldEdit](#phone-field-edit)
    - [TextFieldEdit](#text-field-edit)
    - [CommentField](#comment-field)
    - [EmailField](#email-field)
    - [ImageField](#image-field)
    - [NoteField](#note-field)
    - [SeparatorField](#separator-field)
    - [TextField](#text-field)
    - [CursorField](#cursor-field)
    - [FileField](#file-field)
    - [ListField](#list-field)
    - [NumberField](#number-field)
    - [SimpleChoiceField](#simple-choice-field)
    - [TitleField](#title-field)
    - [DateField](#date-field)
    - [HourField](#hour-field)
    - [MultipleChoiceField](#multiple-choice-field)
    - [PhoneField](#phone-field)
    - [TextAreaField](#text-area-field)
    - [Page](#page)
    - [PageEdit](#page-edit)
  - [2. APIs](#2-apis)
    - [i. API REST](#i-api-rest)
      - [GET](#get)
      - [POST](#post)
      - [PUT](#put)
      - [DELETE](#delete)
    - [ii. API GraphQL](#ii-api-graphql)

## I. Installation

Pour installer la librairie, il suffit de lancer la commande suivante dans le dossier de la librairie :

```bash
npm run build:lib
npm link
```

Puis dans le dossier du projet dans lequel on veut installer la librairie

```bash
npm link 649fac_lib
```

Il est important de disposer d'un setup de tailwind/postcss dans ce projet avec une feuille CSS appliquée globalement et contenant :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Pour utiliser la librairie dans un projet, il suffit d'importer les composants nécessaires.
Par exemple :

```tsx
import { Form } from '649fac_lib';

export default async function Page({ params } : { params : Promise<{ id: string, pageId: number }>}) {
    let obj : React.ReactElement;

    const id = await params.then( p => p.id ).catch( () => "" )
    const pageId = await params.then( p => p.pageId ).catch( () => 0 )

    const res = await fetch('http://localhost:8080/forms/' + id)
    const form = await res.json()

    return (
        <>
          <Form {...form} pageId={pageId}/>
        </>
    )
}
```

## II. Documentation

### 1. Composants

#### ApolloClientProvider

Composant fournissant un client Apollo pour les requêtes GraphQL.

\- `Props :`

- `children` (ReactNode) : Composants enfants à rendre.

#### EditText

Composant permettant d'éditer un texte.

\- `Props :`

- `value` (string) : Valeur du texte.
- `onChange` (function) : Fonction appelée lors du changement de texte.

#### FormSubmitButton

Bouton de soumission de formulaire.

\- `Props :`

- `onSubmit` (function) : Fonction appelée lors de la soumission du formulaire.

#### CreateFieldForm

Formulaire de création de champ.

\- `Props :`

- `onCreate` (function) : Fonction appelée lors de la création d'un champ.

#### ErrorPage

Page d'erreur.

\- `Props :`

- `message` (string) : Message d'erreur à afficher.

#### Form

Composant représentant un formulaire.

\- `Props :`

- `id` (string) : Identifiant unique du formulaire.
- `title` (string) : Titre du formulaire.
- `description` (string) : Description du formulaire.
- `pages` (PageProps[]) : Liste des pages du formulaire.

#### FormEdit

Composant permettant d'éditer un formulaire.

\- `Props :`

- `formId` (string) : Identifiant unique du formulaire à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### Field

Composant représentant un champ de formulaire.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `type` (string) : Type du champ.

#### FieldEdit

Composant permettant d'éditer un champ de formulaire.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### CommentFieldEdit

Composant permettant d'éditer un champ de commentaire.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### FileFieldEdit

Composant permettant d'éditer un champ de fichier.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### MultipleChoiceFieldEdit

Composant permettant d'éditer un champ à choix multiple.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### SeparatorFieldEdit

Composant permettant d'éditer un champ de séparation.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### TitleFieldEdit

Composant permettant d'éditer un champ de titre.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### CursorFieldEdit

Composant permettant d'éditer un champ de curseur.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### HourFieldEdit

Composant permettant d'éditer un champ d'heure.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### NoteFieldEdit

Composant permettant d'éditer un champ de note.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### SimpleChoiceFieldEdit

Composant permettant d'éditer un champ à choix simple.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### DateFieldEdit

Composant permettant d'éditer un champ de date.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### ImageFieldEdit

Composant permettant d'éditer un champ d'image.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### NumberFieldEdit

Composant permettant d'éditer un champ de nombre.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### TextAreaFieldEdit

Composant permettant d'éditer un champ de zone de texte.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### EmailFieldEdit

Composant permettant d'éditer un champ d'email.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### ListFieldEdit

Composant permettant d'éditer un champ de liste.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### PhoneFieldEdit

Composant permettant d'éditer un champ de téléphone.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### TextFieldEdit

Composant permettant d'éditer un champ de texte.

\- `Props :`

- `fieldId` (string) : Identifiant unique du champ à éditer.
- `onSave` (function) : Fonction appelée lors de la sauvegarde des modifications.

#### CommentField

Composant représentant un champ de commentaire.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `value` (string) : Valeur du champ.

#### EmailField

Composant représentant un champ d'email.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `value` (string) : Valeur du champ.

#### ImageField

Composant représentant un champ d'image.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `value` (string) : Valeur du champ.

#### NoteField

Composant représentant un champ de note.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `value` (string) : Valeur du champ.

#### SeparatorField

Composant représentant un champ de séparation.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.

#### TextField

Composant représentant un champ de texte.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `value` (string) : Valeur du champ.

#### CursorField

Composant représentant un champ de curseur.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `value` (number) : Valeur du champ.

#### FileField

Composant représentant un champ de fichier.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `value` (File) : Fichier du champ.

#### ListField

Composant représentant un champ de liste.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `items` (string[]) : Éléments de la liste.

#### NumberField

Composant représentant un champ de nombre.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `value` (number) : Valeur du champ.

#### SimpleChoiceField

Composant représentant un champ à choix simple.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `options` (string[]) : Options du champ.

#### TitleField

Composant représentant un champ de titre.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `value` (string) : Valeur du champ.

#### DateField

Composant représentant un champ de date.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `value` (Date) : Valeur du champ.

#### HourField

Composant représentant un champ d'heure.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `value` (string) : Valeur du champ.

#### MultipleChoiceField

Composant représentant un champ à choix multiple.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `options` (string[]) : Options du champ.

#### PhoneField

Composant représentant un champ de téléphone.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `value` (string) : Valeur du champ.

#### TextAreaField

Composant représentant un champ de zone de texte.

\- `Props :`

- `id` (string) : Identifiant unique du champ.
- `label` (string) : Étiquette du champ.
- `value` (string) : Valeur du champ.

#### Page

Composant représentant une page d'un formulaire.

\- `Props :`

- `id` (number) : Identifiant unique de la page.
- `formId` (string) : Identifiant du formulaire auquel appartient la page.
- `fields` (FieldProps[]) : Liste des champs de la page.

#### PageEdit

Composant permettant d'éditer une page d'un formulaire.

\- `Props :`

- `id` (number) : Identifiant unique de la page à éditer.
- `formId` (string) : Identifiant du formulaire auquel appartient la page.
- `fields` (FieldProps[]) : Liste des champs de la page.
- `fieldSuggestions` (string[]) : Suggestions de types de champs à ajouter.

### 2. APIs

Cette librairie fonctionne grâce à deux APIs :

- Une **API REST** ([http://localhost:8080](http://localhost:8080)) gérant la partie création de formulaires, de pages, de champs, de conditions, etc.
- Une **API GraphQL** ([http://localhost:8081/graphql](http://localhost:8081/graphql)) gérant les soumissions aux formulaires de manière temps réel à l'aide d'un serveur de **WebSockets** ([ws://localhost:8081/graphql](ws://localhost:8081/graphql)).

Les API peuvent être lancées via npm en utilisant les commandes suivantes dans le dossier `/server` :

```bash
# Pour lancer l'API REST
npm run rest

# Pour lancer l'API GraphQL
npm run graphql
```

### i. API REST

Cette API supporte les opérations CRUD (Create, Read, Update, Delete) pour les entités suivantes :

- Forms (Formulaires)
- Fields (Champs)
- Pages
- Conditions

L'API fonctionne sur `http://localhost:8080` et utilise JSON comme format de données.

#### GET

##### Récupérer tous les formulaires
```http
GET /forms
```
Réponse :
```json
[
  {
    "id": 1,
    "title": "Exemple Form",
    "description": "Description du formulaire"
  }
]
```

##### Récupérer un formulaire par ID
```http
GET /forms/:id
```
Réponse :
```json
{
  "id": 1,
  "title": "Exemple Form",
  "description": "Description du formulaire",
  "pages": [
    {
      "id": 1,
      "fields": [
        { "id": 1, "label": "Nom", "type": "text" }
      ]
    }
  ]
}
```

##### Récupérer tous les champs
```http
GET /fields
```

##### Récupérer un champ par ID
```http
GET /fields/:id
```
Body requis :
```json
{
  "pageId": 1,
  "formId": 1
}
```

#### POST

##### Créer un formulaire
```http
POST /forms
```
Body :
```json
{
  "title": "Nouveau Formulaire",
  "description": "Une description"
}
```
Réponse :
```json
{
  "id": 2,
  "title": "Nouveau Formulaire",
  "description": "Une description"
}
```

##### Créer une page
```http
POST /pages
```
Body :
```json
{
  "formId": 1
}
```

##### Créer un champ
```http
POST /fields
```
Body :
```json
{
  "label": "Email",
  "type": "email",
  "formId": 1,
  "pageId": 1
}
```

##### Ajouter une condition
```http
POST /conditions
```
Body :
```json
{
  "formId": 1,
  "pageId": 1,
  "fieldId": 2,
  "conditionedFormId": 1,
  "conditionedPageId": 1,
  "conditionedFieldId": 3,
  "op": "equals",
  "value": "test"
}
```

#### PUT

##### Modifier un formulaire
```http
PUT /forms/edit/:id
```
Body :
```json
{
  "title": "Formulaire mis à jour"
}
```

##### Modifier un champ
```http
PUT /fields/edit/:id
```
Body :
```json
{
  "pageId": 1,
  "formId": 1,
  "label": "Nom Complet"
}
```

##### Échanger deux champs
```http
PUT /fields/swap
```
Body :
```json
{
  "idA": 1,
  "idB": 2,
  "pageId": 1,
  "formId": 1
}
```

##### Modifier une condition
```http
PUT /conditions/edit/:id
```

#### DELETE

##### Supprimer un formulaire
```http
DELETE /forms/:id
```

##### Supprimer une page
```http
DELETE /pages/:id
```
Body :
```json
{
  "formId": 1
}
```

##### Supprimer un champ
```http
DELETE /fields/:id
```
Body :
```json
{
  "pageId": 1,
  "formId": 1
}
```

##### Supprimer une condition
```http
DELETE /conditions/:id
```

### ii. API Graphql
Afin de pouvoir communiquer avec l'**API GraphQL** il est nécessaire d'avoir au préalable entouré le code utilisant cette dernière avec les balises correspondant au composant `ApolloClientProvider`.

On pourrait faire cela dans un fichier `layout.tsx` comme par exemple :

```tsx
import { ApolloClientProvider } from '@/components/ApolloClientProvider';

export default function RootLayout(
    {children} : {children : React.ReactNode}
){
  return (
    <html>
      <body>
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  );
}
```

On peut ensuite requêter l'API en utilisant les `query`, `mutation` et `subsciption` définis par l'API.

Ci-dessous voici un petit exemple de code permettant de récupérer et d'afficher une soumission en temps réel.

Ce code utilise `submissionCreatedOrUpdated`, une `subscription` permettant de notifier le client lorsqu'une submission a été créée ou modifiée et `submissionById(id : $id)` une `query` permettant de récupérer une submission à partir de son identifiant unique.

```tsx

import { gql, useQuery } from "@apollo/client";
import { use, useEffect } from "react";

const SUBMISSION_CREATED_OR_UPDATED = gql`
    subscription {
        submissionCreatedOrUpdated {
            # On récupère les champs qui nous intéressent
            id
            submittedAt
            responses {
                id
                value
            }
        }
    }
`;

const GET_SUBMISSION = gql`
    query GetSubmission($id: String!) {
        submissionById(id: $id) {
            # On récupère les champs qui nous intéressent
            id
            submittedAt
            externalId
            form {
                title
            }
            responses {
                id
                value
                field {
                    label
                }
            }
        }
    }
`;

export default function SubmissionDetailPage(
    {params} : {params : Promise<{id : string}>}
){
    // On récupère l'identifiant dans les paramètres de l'URL
    const id : string = use(params).id;

    // On appelle la query
    const {
        data,
        loading,
        error,
        subscribeToMore
    } = useQuery(
        GET_SUBMISSION, {
            variables : {id},
            skip : !id,
        }
    );

    // useEffect permet de gérer l'aspect remps réel dans l'affichage côté client
    useEffect(() => {
        if (!id) {
            return (
                <ErrorPage
                    status="Erreur"
                    message="ID manquant pour la souscription."
                />
            );
        }

        // Cette fonction gère la subsciption
        const subscribe = subscribeToMore({
            document : SUBMISSION_CREATED_OR_UPDATED,
            variables : {id},
            updateQuery: (prev, {subscriptionData}) => {
                // On récupère la nouvelle soumission
                const updatedSubmission = subscriptionData?.data?.submissionUpdated;

                if (!updatedSubmission) {
                    // Si la nouvelle soumission est vide ou invalide, on renvoie l'ancienne soumission
                    return prev;
                }

                // On renvoie enfin la soumission mise à jour
                return {
                    submissionById: {
                        ...prev.submissionById,
                        ...updatedSubmission,
                    },
                };
            },
        });

        // useEffect appelle la subsciption
        return () => {
            subscribe();
        };
    }, [id, subscribeToMore]);

    // En cas de chargement on affiche une page de chargement
    if (loading) return (
        <ErrorPage
            status="Info"
            message="Chargement ..."
        />
    )

    // En cas d'erreur GraphQL on affiche une page d'erreur
    if (error) return (
        <ErrorPage
            status={error.name}
            message={
                (error.networkError?.result.errors[0]?.message ?? "") +
                (error.graphQLErrors[0]?.message ?? "") +
                (error.message ?? "")
            }
        />
    );

    // Si la soumission est inexistante on affiche une erreur
    if (!data?.submissionById?.id) return (
        <ErrorPage
            status="Erreur"
            message={`Soumission non trouvée. Identifiant : ${id}`}
        />
    );

    // Sinon on peut afficher la soumission
    const submission = data?.submissionById;

    return (<>
        <h1>Soumission au formulaire : {data?.submissionById?.formtitle}</h1>
        <q>
            Par <em>{data?.submissionById?.externalId}</em>
            le <em>{data?.submissionById?.submittedAt}</em>
        </q>
        <h2>Réponses : </h2>
        <article>{
            data?.submissionById?.responses?.map(
                (response : {
                    id : string,
                    value : string,
                    field : {
                        label : string
                    }
                }) => (
                    <div key={response.id}>
                        <dt>{response.field.label}</dt>
                        <dd>{response.value}</dd>
                    </div>
                )
            )
        }</article>
    </>);
}
```

La documentation complète de l'API GraphQL est disponible à l'adresse [http://localhost:8081/graphql](http://localhost:8081/graphql) lorsque le serveur est lancé. Il y a également une sandbox permettant de tester les requêtes et les mutations.# component-lib
