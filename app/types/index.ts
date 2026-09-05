export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  MANAGER = "MANAGER",
  GUEST = "GUEST",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  teamid?: string;
  team?: Team;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: string;
  name: string;
  description?: string | null;
  code: string;
  members: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterState {
  success?: boolean;
  user?: User;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (formData: FormData) => void;
  register: (formData: FormData) => void;
  logOut: () => void;
  hasPermission: (requiredRole: Role) => boolean;
  isRegisterPending: boolean;
  isLoginPending: boolean;
  registerState: RegisterState;
  loginState: RegisterState;
}
