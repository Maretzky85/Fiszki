export class UserModel {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: Role[];
}

interface Role {
  id: number;
  role: string;
}
