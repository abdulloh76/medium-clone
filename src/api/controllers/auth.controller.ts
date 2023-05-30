import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { asyncWrapper } from "../utils/apiHelper";
import { UserModel } from "../../config/prisma";
import bcryptjs from "bcryptjs";
import { createUser, findUserByEmail } from "../services/auth.service";

export const signup = asyncWrapper(
  async (req: Request<{}, {}, UserModel>, res: Response) => {
    const { name, email, password } = req.body;
    // todo ? validation

    const hashRound = process.env.HASH_ROUND as string;
    const userPassword = await bcryptjs.hash(password, +hashRound);

    const user = await createUser(name, email, userPassword);

    if (!user) {
      res.status(400).json({ message: "todo something went wrong" });
    }
    res.json({ message: "Profile created successfully" });
  }
);

export const signin = asyncWrapper(
  async (req: Request<{}, {}, UserModel>, res: Response) => {
    const { email, password } = req.body;
    // todo ? validation

    const tokenSecret = process.env.TOKEN_SECRET as string;

    const user = await findUserByEmail(email);

    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return res.status(400).json({ message: "Wrong email or password" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      tokenSecret
    );

    res.json({ jwt_token: token });
  }
);
