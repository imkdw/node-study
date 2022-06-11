export const AuthError = {
  PASSWORD_NOT_MATCH: {
    // 400, 회원가입시 패스워드 불일치
    status: 400,
    msg: "PASSWORD_NOT_MATCH",
  },
  ACCOUNT_LENGTH_ZERO: {
    // 400, 로그인시 아이디, 비밀번호 미입력시
    status: 400,
    msg: "ACCOUNT_LENGTH_ZERO",
  },
  ACCOUNT_NOT_MATCH: {
    // 400, 로그인시 아이디가 존재하지 않거나 패스워드가 틀린경우
    status: 400,
    msg: "ACCOUT_NOT_MATCH",
  },
};

export const UserError = {
  // 401, 클라이언트에서 받은 accessToken이 유효하지 않을때
  INVALID_TOKEN: {
    status: 401,
    msg: "INVALID_TOKEN",
  },
};
