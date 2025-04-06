export enum Roles {
    "ADMIN",
    "USER",
  }
  
  export interface IUser {
    id: string;
    name: string;
    surnames: string;
    email: string;
    telephone: string;
    role: Roles;
    emailVerified: boolean;
    emailNotifications: boolean;
    creationDate: Date;
  }
  
  export interface IRegisterUser {
    name: string;
    surnames: string;
    email: string;
    telephone: string;
    password: string;
    role: Roles;
  }
  
  export interface ILoginUser {
    email: string;
    password: string;
  }
  
  export interface ILoginResponse {
    user: IUser;
    token: string;
  }
  