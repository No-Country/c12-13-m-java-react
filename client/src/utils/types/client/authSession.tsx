export type AuthProps = {
  isLogged: boolean;
  loginMethod: string;
  sessionId: string;
  google: {
    googleSessionID: string;
  };
};

export type SessionProps = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profileImage: string;
  email: string;
  isSuperAdmin: boolean;
  softDelete: boolean;
};

export class AuthClass {
  constructor(
    public isLogged: boolean = false,
    public loginMethod: string = "",
    public sessionId: string = "",
    public google: { googleSessionID: string } = { googleSessionID: "" }
  ) {}
}
