export type registerParams = {
  userId: string;
  password: string;
  rePassword: string;
  name: string;
  email: string;
};

export type registerReturn = {
  status: number;
  userId: string;
};

export type loginParams = {
  userId: string;
  password: string;
};

export type loginReturns = {
  userId: string;
};

export type errorTypes = {
  msg: string;
};
