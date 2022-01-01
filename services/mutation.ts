import { gql } from '@apollo/client';
const NEW_NOTE = gql`
  mutation newNote($content: String!, $title: String!) {
    newNote(content: $content, title: $title) {
      id
      content
      title
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

const EDIT_NOTE = gql`
  mutation updateNote($id: ID!, $content: String!, $title: String!) {
    updateNote(id: $id, content: $content, title: $title) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

export { NEW_NOTE, EDIT_NOTE };
