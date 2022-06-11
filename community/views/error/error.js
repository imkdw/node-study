export const handleError = (errMsg) => {
  switch (errMsg) {
    case "PASSWORD_NOT_MATCH":
      return "비밀번호가 일치하지 않습니다.";
  }
};
