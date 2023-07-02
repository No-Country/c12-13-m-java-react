import { gql } from "@apollo/client";

export const GET_AFTER_LOGIN = gql`
  query GetAfterLogin($id: ID!) {
    AfterLogin(id: $id) {
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
  query GetOnSpaceEnter($id: ID!) {
    OnSpaceEnter(id: $id) {
      id
      accessCode
      name
      description
      coverImage
      lastModified
      createdAt
      members
      rooms
    }
  }
`;

//agregar "spaceOwner" a la query
export const GET_ON_ROOM_ENTER = gql`
  query GetOnRoomEnter($id: ID!) {
    OnRoomEnter(id: $id) {
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
