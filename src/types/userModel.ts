export interface User {
  user_id?: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  membership_status: string;
  admin: boolean;
}

export interface Form<T> {
  errors: {
    [K in keyof T]?: string;
  };
  values: T;
}
