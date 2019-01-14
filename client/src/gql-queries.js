import gql from "graphql-tag";

const SIGN_UP_MUTATION = gql`
    mutation signup($firstName: String!, $lastName: String!, $email: String!, $password: String!, $confirmPassword: String!) {
        signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password, confirmPassword: $confirmPassword) {
          token
        }
      }
`;

const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
    }
`;

const GET_POSTS = gql`
    query posts {
        posts {
            id
            title
            description
            text
            createdAt
            updatedAt
        }
    }
`;

const CREATE_POST_MUTATION = gql`
    mutation createPost($title: String!, $description: String!, $text: String!) {
        createPost(title: $title, description: $description, text: $text) {
          id
          title
          description
          text
          createdAt
          updatedAt
        }
    }
`;

const UPDATE_POST_MUTATION = gql`
    mutation updatePost($id: String!, $title: String!, $description: String!, $text: String!) {
        updatePost(id: $id, title: $title, description: $description, text: $text) {
          id
          title
          description
          text
          createdAt
          updatedAt
        }
    }
`;

const DELETE_POST_MUTATION = gql`
    mutation deletePost($id: String!) {
        deletePost(id: $id) {
          id
          title
          description
          text
          createdAt
          updatedAt
        }
    }
`;

export {
    SIGN_UP_MUTATION,
    LOGIN_MUTATION,
    GET_POSTS,
    CREATE_POST_MUTATION,
    UPDATE_POST_MUTATION,
    DELETE_POST_MUTATION
}