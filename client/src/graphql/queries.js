import { gql } from "@apollo/client";

export const GET_AFTER_LOGIN = gql`
  query GetUser($id: ID!) {
    User(id: $id) {
      id
      firstName
      lastName
      username
      profileImage
      email
      isSuperAdmin
      softDelete
      spaces
    }
  }
`;

export const GET_ON_SPACE_ENTER = gql`
  query GetSpace($id: ID!) {
    Space(id: $id) {
      id
      accessCode
      name
      description
      coverImage
      lastModified
      createdAt
      members
      rooms
      files
    }
  }
`;

//agregar "spaceOwner" a la query
export const GET_ON_ROOM_ENTER = gql`
  query GetRoom($id: ID!) {
    Room(id: $id) {
      name
      id
      description
      coverImage
      lastModified
      createdAt
      tasks
    }
  }
`;

// Otras consultas GraphQL...
