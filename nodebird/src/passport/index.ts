import passport from "passport";
import { User } from "../../models";

export const serializerUser = () => {
  passport.serializeUser((user, done) => {
    /**
     * done 함수
     * @param1 : 에러 발생시 사용하는 인수
     * @param2 : 저장하고 싶은 데이터를 넣는 인수
     */
    done(null, user.id);
  });
};

export const desirializerUser = () => {
  /**
   * passport.deserializeUser 메서드
   * @param1 :
   * @param2 : serializeUser의 done 인자가 해당 메서드의 인자가 됨.
   */
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((error) => done(error));
  });
};
