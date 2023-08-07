export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  name: string;
  surname: string;
  email: string;
  classroom_id: number;
}

export interface IEditEmail {
  newEmail: string;
  previousEmail: string;
}

export interface IEditPassword {
  newPassword: string;
  previousPassword: string;
}