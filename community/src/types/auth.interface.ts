export type registerParams = {
  userId: string;
  password: string;
  rePassword: string;
  nickname: string;
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

export type getPasswordReturn = {
  id: string;
  userId: string;
  password: string;
  name: string;
  email: string;
};
