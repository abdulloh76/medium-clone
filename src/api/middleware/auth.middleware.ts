import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(400).json({
      message: 'Please provide "authorization" header',
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Please provide a token" });
  }

  const tokenSecret = process.env.TOKEN_SECRET as string;

  jwt.verify(token, tokenSecret, async (err, decoded) => {
    if (err) return res.status(400).json({ message: err.message });

    const user = await prisma.user.findFirst({
      where: { id: (decoded as jwt.JwtPayload).id },
    });
    if (!user) return res.status(400).json({ message: "the user was deleted" });

    req.currentUser = user;
    next();
  });
};

// todo
// export const roleMiddleware = (role: string) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (req["user"].role !== role) {
//       res
//         .status(400)
//         .json({ message: "you do not have permission to this endpoint" });
//     }
//     next();
//   };
// };
