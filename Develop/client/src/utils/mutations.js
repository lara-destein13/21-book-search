import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($authors: [String], $bookId: String!, $description: String!, $image: String, $link: String, $title: String!) {
    saveBook(authors: $authors, bookId: $bookId, description: $description, image: $image, link: $link, title: $title) {
      _id
      title
      description
      bookId
      image
      link
    }
  }
`;
