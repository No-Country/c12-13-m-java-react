const afterLogin = [{
  id: "1234567890",
  firstName: "John",
  lastName: "Smith",
  username: "johnsmith",
  profileImage:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
  email: "jonhsmith@test.com",
  registerMethod: "email",
  password: "encriptedPassword",
  lastModified: "2018-01-01T00:00:00.000Z",
  createdAt: "2018-01-01T00:00:00.000Z",
  isSuperAdmin: false,
  softDelete: false,
  coverImage:
    "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  spaces: [
    {
      id: "1234567890",
      name: "Space 1",
      description: "Space 1 description",
      coverImage:
        "https://images.unsplash.com/photo-1525253013412-55c1a69a5738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      members: [
        {
          id: "1234567890",
          firstName: "John",
          lastName: "Smith",
          profileImage:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
        },
        {
          id: "1234567890",
          firstName: "John",
          lastName: "Smith",
          profileImage:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        },
      ],
      lastModified: "2018-01-01T00:00:00.000Z",
      createdAt: "2018-01-01T00:00:00.000Z",
    },
  ],
}];

module.exports = afterLogin;
