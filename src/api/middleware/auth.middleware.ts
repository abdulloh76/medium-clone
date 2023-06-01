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
      status: 400,
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(400)
      .json({ message: "Please provide a token", status: 400 });
  }

  const tokenSecret = process.env.TOKEN_SECRET as string;

  jwt.verify(token, tokenSecret, async (err, decoded) => {
    if (err) return res.status(400).json({ message: err.message, status: 400 });

    const user = await prisma.user.findFirst({
      where: { id: (decoded as jwt.JwtPayload).id },
    });
    if (!user)
      return res
        .status(400)
        .json({ message: "the user was deleted", status: 400 });

    req.currentUser = user;
    next();
  });
};

// todo roleMiddleware
