import { isAuth } from "../middleware/is-auth";
import { expect } from "chai";

it("throw error if no authenticate header", () => {
  const req: any = {
    get: function (headerName: string) {
      return null;
    },
  };

  expect(isAuth.bind(this, req, {}, () => {})).to.throw("Not authenticated");
});
