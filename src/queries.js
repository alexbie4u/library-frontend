import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
    query {
        authors {
            name,
            born,
            bookCount,
            id
        }
    }
`

export const ALL_BOOKS = gql`
    query books{
        books {
            title,
            published,
            genres,
            author {
                name,
            }     
        }
    }
`

export const ALL_BOOKS_WITH_GENRE = gql`
  query allBooks($genre: String!) {
    books(genre: $genre) {
      title
      published
      genres
      author {
        name
    }
  }
}
`

export const ADD_BOOK = gql`
  mutation AddBook($book: AddBookInput!) {
    addBook(book: $book) {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($id: ID!, $edits: EditAuthorInput!) {
    updateAuthor(id: $id, edits: $edits) {
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      born
    }
    published 
    genres
    id
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`