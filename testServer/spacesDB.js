const spaces = [
  {
    id: "1",
    accessCode: "1234567890",
    name: "Space 1",
    description: "Space 1 description",
    coverImage:
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    lastModified: "2018-01-01T00:00:00.000Z",
    createdAt: "2018-01-01T00:00:00.000Z",
    members: [], //Ref
    rooms: [], //Ref
    files: [
      {
        id: "1234567890",
        name: "File 1",
        description: "File 1 description",
        type: "image",
        src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        lastModified: "2018-01-01T00:00:00.000Z",
        createdAt: "2018-01-01T00:00:00.000Z",
        asignedRoom: {
          id: "1234567890",
          name: "Room 1",
          description: "Room 1 description",
          coverImage:
            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        },
        owner: {
          id: "1234567890",
          firstName: "John",
          lastName: "Smith",
          profileImage:
            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        },
      },
    ],
  },
  {
    id: "2",
    accessCode: "1234567890",
    name: "Space 2",
    description: "Space 2 description",
    coverImage:
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    lastModified: "2018-01-01T00:00:00.000Z",
    createdAt: "2018-01-01T00:00:00.000Z",
    members: [], //Ref
    rooms: [], //Ref
    files: [
      {
        id: "1234567890",
        name: "File 1",
        description: "File 1 description",
        type: "image",
        src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        lastModified: "2018-01-01T00:00:00.000Z",
        createdAt: "2018-01-01T00:00:00.000Z",
        asignedRoom: {
          id: "1234567890",
          name: "Room 1",
          description: "Room 1 description",
          coverImage:
            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        },
        owner: {
          id: "1234567890",
          firstName: "John",
          lastName: "Smith",
          profileImage:
            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        },
      },
    ],
  },
];

module.exports = spaces;
