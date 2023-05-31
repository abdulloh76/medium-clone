import { Request, Response } from "express";
import { asyncWrapper } from "../utils/apiHelper";
import { getAll, getById, create } from "../services/post.service";
import { PaginationQueryParams } from "../utils/dto";
import { PostModel } from "../../config/prisma";

export const createPost = asyncWrapper(
  async (req: Request<{}, {}, PostModel>, res: Response) => {
    const postObj = req.body;
    postObj.authorId = req.currentUser.id;
    const newPost = await create(postObj);

    if (!newPost) {
      res.status(500).json({ message: "todo something went wrong" });
    }

    res.json({ data: newPost });
  }
);

export const getAllPosts = asyncWrapper(
  async (req: Request<{}, {}, {}, PaginationQueryParams>, res: Response) => {
    const { offset = 0, limit = 10 } = req.query;
    const posts = await getAll(offset, limit);
    // todo use dto

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
