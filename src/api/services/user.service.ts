import { prisma } from "../../config/prisma";

export const getAll = async (offset: number, limit: number) => {
  let skip = 0;
  let take = 10;
  if (offset) skip = offset;
  if (limit) take = limit;
  return prisma.user.findMany({ skip, take });
};
