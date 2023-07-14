import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query GetUser($id: ID!) {
    findUserById(id: $id) {
      id
      firstName
      lastName
      email
      username
      loginMethod
      softDelete
      isSuperAdmin
      createdAt
      updatedAt
      coverImage
      profileImage
      spaces {
        id
        accessCode
        name
        description
        coverImage
        updatedAt
        createdAt
        members {
          role
          user {
            profileImage
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export const GET_SPACE_BY_ID = gql`
  query findSpaceById($id: ID!) {
    findSpaceById(id: $id) {
      id
      name
      description
      coverImage
      createdAt
      updatedAt
      accessCode
      members {
        user {
          id
          profileImage
          firstName
          lastName
        }
        role
      }
      rooms {
        id
        name
        description
        createdAt
        updatedAt
        coverImage
      }
      files {
        id
        name
        description
        type
        src
        asignedRoom {
          name
          id
        }
        createdAt
        updatedAt
      }
    }
  }
`;

//agregar "spaceOwner" a la query
export const GET_ROOM_BY_ID = gql`
  query findRoomById($id: ID!) {
    findRoomById(id: $id) {
      id
      name
      description
      coverImage
      createdAt
      updatedAt
      tasks {
        id
        title
        description
        deadline
        createdAt
        status
        updatedAt
        assignedTo {
          user {
            firstName
            lastName
            profileImage
            id
          }
        }
      }
      spaceOwner {
        id
      }
    }
  }
`;

export const VERIFY_SESSION = gql`
  query VerifySession($userId: ID!) {
    verifySession(userId: $userId) 
}
`;




// Otras consultas GraphQL...
