import { PostModel, prisma } from "../../config/prisma";
import { CreatePostDto } from "../utils/dto";

export const create = async (data: {
  title: string;
  content: string;
  authorId: number;
}) =>
  prisma.post.create({
    data,
  });

export const getAll = async (
  offset: number,
  limit: number,
  authorId: number
) => {
  let skip = 0;
  let take = 10;
  if (offset) skip = offset;
  if (limit) take = limit;
  return prisma.post.findMany({ skip, take, where: { authorId } });
};

export const getById = async (id: number, authorId: number) =>
  prisma.post.findFirst({ where: { id, authorId } });
