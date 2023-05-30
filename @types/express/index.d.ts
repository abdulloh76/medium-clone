import { UserModel } from "../../src/config/prisma";

declare global {
  namespace Express {
    interface Request {
      currentUser: UserModel;
    }
  }
}
