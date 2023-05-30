import { prisma } from "../../config/prisma";

export const getAll = async (offset: number, limit: number) =>
  prisma.user.findMany({ skip: offset, take: limit });
