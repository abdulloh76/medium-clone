import { UserModel, prisma } from "../../config/prisma";

export const createUser = async (
  name: string,
  email: string,
  password: string
) => prisma.user.create({ data: { name, email, password } });

export const findUserByEmail = async (email: string) =>
  prisma.user.findFirst({ where: { email } });
