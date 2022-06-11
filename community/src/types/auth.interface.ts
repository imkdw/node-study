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

export type registerError = {
  status: number;
  errCode: string;
};
