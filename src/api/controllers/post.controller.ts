import { Request, Response } from "express";
import { asyncWrapper } from "../utils/apiHelper";
import { getAll, getById } from "../services/post.service";
import { PaginationQueryParams } from "../utils/dto";

export const getAllPosts = asyncWrapper(
  async (req: Request<{}, {}, {}, PaginationQueryParams>, res: Response) => {
    const { offset = 0, limit = 0 } = req.query;
    const posts = await getAll(offset, limit);

    if (!posts) {
      res.status(500).json({ message: "todo something went wrong" });
    }

    res.json({ data: posts });
  }
);

export const getPostById = asyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await getById(Number(id));

  if (!post) {
    res.status(404).json({ message: "couldn't find any post with such id" });
  }

  res.json({ data: post });
});
