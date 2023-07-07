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

// mutation {
//   editSpace(
//     spaceId: "64a82c85e40206668951f5a4"
//     name: "test space mod"
//     description: "test space mod"
//     accessCode: "accesscode mod"
//     coverImage: "google mod"
//   ) {
//     id
//     name
//     description
//     accessCode
//     coverImage
//   }
// }

// mutation {
//   editRoom(
//     roomId: "64a82ca9e40206668951f5a5"
//     name: "test room mod"
//     description: "test room mod"
//     coverImage: "room mod"
//   ) {
//     id
//     name
//     description
//     coverImage
//   }
// }

// mutation {
//   editTask(
//     roomId: "64a82ca9e40206668951f5a5"
//     taskId: "498274f6-fa91-4500-809e-0bf49961738e"
//     title: "test task mod"
//     description: "test room mod"
//     status: 2
//     deadline: "deadline moded"
//     assignedToIds: ["64a82c5ce40206668951f5a3"]
//   ) {
//     id
//     title
//     description
//     status
//     assignedTo {
//       user {
//         email
//       }
//     }
//     deadline
//   }
// }

// mutation {
//   editUser(
//     userId: "64a82c5ce40206668951f5a3"
//     email: "moded111@email.com"
//     firstName: "moded"
//     lastName: "moded"
//     username: "moded111"
//     coverImage: "moded"
//     profileImage: "moded"
//     isSuperAdmin: true
//     softDelete: true
//   ) {
//     id
//     email
//     username
//     softDelete
//     isSuperAdmin

//   }
// }

// Otras mutaciones GraphQL...
