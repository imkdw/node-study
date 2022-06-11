export type registerParams = {
  userId: string;
  password: string;
  rePassword: string;
  name: string;
  email: string;
};

export type registerReturns = {
  userId: string;
  name: string;
  email: string;
};

export type loginParams = {
  userId: string;
  password: string;
};

export type loginReturns = {
  userId: string;
};

export type errorTypes = {
  status: number;
  msg: string;
};
