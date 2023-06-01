import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const getUser = async () => await prisma.user.findFirstOrThrow();
export type UserModel = Prisma.PromiseReturnType<typeof getUser>;

const getPost = async () => await prisma.post.findFirstOrThrow();
export type PostModel = Prisma.PromiseReturnType<typeof getPost>;
