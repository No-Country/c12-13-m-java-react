import { gql } from "@apollo/client";

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $userId: ID!
    $newPassword: String!
    $oldPassword: String!
  ) {
    changePassword(
      userId: $userId
      newPassword: $newPassword
      oldPassword: $oldPassword
    ) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $loginMethod: String
    $username: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      loginMethod: $loginMethod
      username: $username
    ) {
      id
      email
    }
  }
`;

export const CREATE_SPACE = gql`
  mutation CreateSpace(
    $userOwner: ID!
    $name: String!
    $description: String!
    $accessCode: String!
    $coverImage: String!
  ) {
    createSpace(
      userOwner: $userOwner
      name: $name
      description: $description
      accessCode: $accessCode
      coverImage: $coverImage
    ) {
      id
      name
      description
      accessCode
      coverImage
      members {
        user {
          id
          firstName
          lastName
          profileImage
        }
        role
      }
    }
  }
`;

export const DELETE_SPACE = gql`
  mutation deleteSpace($id: ID!) {
    deleteSpace(id: $id) {
      id
      name
      description
      accessCode
      coverImage
    }
  }
`;

export const EDIT_SPACE = gql`
  mutation EditSpace(
    $spaceId: ID!
    $name: String
    $description: String
    $accessCode: String
    $coverImage: String
  ) {
    editSpace(
      spaceId: $spaceId
      name: $name
      description: $description
      accessCode: $accessCode
      coverImage: $coverImage
    ) {
      id
      name
      description
      accessCode
      coverImage
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation CreateRoom(
    $spaceOwnerId: ID!
    $name: String!
    $description: String!
    $coverImage: String!
  ) {
    createRoom(
      spaceOwnerId: $spaceOwnerId
      name: $name
      description: $description
      coverImage: $coverImage
    ) {
      id
      name
      description
      coverImage
      spaceOwner {
        id
      }
      tasks {
        id
      }
    }
  }
`;

export const DELETE_ROOM = gql`
  mutation deleteRoom($id: ID!) {
    deleteRoom(id: $id) {
      id
      name
      description
      coverImage
    }
  }
`;

export const EDIT_ROOM = gql`
  mutation EditRoom(
    $roomId: ID!
    $name: String
    $description: String
    $coverImage: String
  ) {
    editRoom(
      roomId: $roomId
      name: $name
      description: $description
      coverImage: $coverImage
    ) {
      id
      name
      description
      coverImage
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!
    $description: String!
    $status: Int!
    $roomOwnerId: ID!
    $assignedToIds: [ID!]
  ) {
    createTask(
      title: $title
      description: $description
      status: $status
      roomOwnerId: $roomOwnerId
      assignedToIds: $assignedToIds
    ) {
      id
      title
      description
      deadline
      status
      assignedTo {
        user {
          id
          firstName
          lastName
          profileImage
        }
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($taskId: ID!, $roomId: ID!) {
    deleteTask(taskId: $taskId, roomId: $roomId) {
      id
      title
      description
      deadline
      status
    }
  }
`;

export const EDIT_TASK = gql`
  mutation editTask(
    $taskId: ID!
    $roomId: ID!
    $title: String
    $description: String
    $status: Int
    $deadline: String
    $assignedToIds: [ID!]
  ) {
    editTask(
      taskId: $taskId
      roomId: $roomId
      title: $title
      description: $description
      status: $status
      deadline: $deadline
      assignedToIds: $assignedToIds
    ) {
      id
      title
      description
      status
      assignedTo {
        user {
          id
          firstName
          lastName
          profileImage
        }
      }
      deadline
    }
  }
`;

export const JOIN_SPACE = gql`
  mutation joinSpace($spaceId: ID!, $userId: ID!) {
    joinSpace(spaceId: $spaceId, userId: $userId) {
      id
      name
      description
      accessCode
      coverImage
      members {
        user {
          id
          firstName
          lastName
          profileImage
        }
        role
      }
    }
  }
`;

export const LEAVE_SPACE = gql`
  mutation leaveSpace($spaceId: ID!, $userId: ID!) {
    leaveSpace(spaceId: $spaceId, userId: $userId) {
      id
    }
  }
`;

export const LOG_IN = gql`
  mutation LogIn($email: String!, $password: String!) {
    createSession(email: $email, password: $password) {
      id
      userId
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation createMessage($chatId: ID!, $content: String!, $userId: ID!) {
    createMessage(chatId: $chatId, content: $content, userId: $userId) {
      content
    }
  }
`;

export const CHANGE_USER_ROLE = gql`
  mutation changeUserRole($spaceId: ID!, $userId: ID!, $role: String!) {
    changeUserRole(spaceId: $spaceId, userId: $userId, role: $role) {
      id
      name
      description
      accessCode
      coverImage
      members {
        user {
          id
          firstName
          lastName
          profileImage
        }
        role
      }
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
