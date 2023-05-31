import { PostModel, prisma } from "../../config/prisma";

export const create = async (data: PostModel) => prisma.post.create({ data });

export const getAll = async (offset: number, limit: number) =>
  prisma.post.findMany({ skip: offset, take: limit });

export const getById = async (id: number) =>
  prisma.post.findFirst({ where: { id } });
