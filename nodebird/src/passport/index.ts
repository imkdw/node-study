import passport from "passport";
import { User } from "../../models";

export const serializerUser = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
};

export const desirializerUser = () => {
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then((user) => done(null, user))
      .catch((error) => done(error));
  });
};
