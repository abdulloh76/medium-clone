import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { asyncWrapper } from "../utils/apiHelper";
import { UserModel } from "../../config/prisma";
import bcryptjs from "bcryptjs";
import { createUser, findUserByEmail } from "../services/auth.service";
import {
  SignInDto,
  SignUpDto,
  validateSignInDto,
  validateSignUpDto,
} from "../utils/dto";

export const signup = asyncWrapper(
  async (req: Request<{}, {}, SignUpDto>, res: Response) => {
    const { name, email, password } = req.body;
    const hashRound = process.env.HASH_ROUND as string;

    validateSignUpDto({ name, email, password })
      .then(() => bcryptjs.hash(password, +hashRound))
      .then((hashedPassword) => createUser(name, email, hashedPassword))
      .then((user) => res.json({ data: user }))
      .catch((err) => res.status(400).json({ message: err.message }));
  }
);

export const signin = asyncWrapper(
  async (req: Request<{}, {}, SignInDto>, res: Response) => {
    const { email, password } = req.body;
    const tokenSecret = process.env.TOKEN_SECRET as string;

    validateSignInDto({ email, password })
      .then(() => findUserByEmail(email))
      .then(async (user) => {
        if (!user || !(await bcryptjs.compare(password, user.password))) {
          throw new Error("Wrong email or password");
        }
        return user;
      })
      .then((user) =>
        jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          tokenSecret
        )
      )
      .then((token) => res.json({ jwt_token: token }))
      .catch((err) => res.status(400).json({ message: err.message }));
  }
);
