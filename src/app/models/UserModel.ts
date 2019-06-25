export class UserModel {
  username: string;
  email: string;
  password: string;
  roles: Role[];
}

interface Role {
  id: number;
  role: string;
}
