import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;


// mutation {
//   createUser(
//     firstName: "John"
//     lastName: "Doe"
//     email: "johndoe@example.com"
//     password: "test"
//     loginMethod: "google"
//     username: "thomas"
//   ) {
//     id
//     firstName
//     lastName
//     email
//     password
//     loginMethod
//     username
//   }
// }

// mutation {
//   createSpace(
//     userOwner: "64a758b3ef9f8b2f29180078"
//     name: "test space"
//     description: "test space"
//     accessCode: "accesscode"
//     coverImage: "google"
//   ) {
//     id
//     name
//     description
//     accessCode
//     coverImage
//   }
// }

// mutation CreateRoom {
//   createRoom(
//     spaceOwnerId: "64a760c1a4b802711fc862db"
//     name: "Sala de reuniones"
//     description: "Sala para reuniones de equipo"
//     coverImage: "sala.png"
//   ) {
//     name
//     description
//     coverImage
//   }
// }

// mutation CreateTask {
//   createTask(
//     title: "test task"
//     description: "test"
//     status: 1
//     roomOwnerId: "64a76ccf194cca7720ae82f3"
//   ) {
//     id
//     title
//     description
//     deadline
//     status
//   }
// }
// Otras mutaciones GraphQL...
