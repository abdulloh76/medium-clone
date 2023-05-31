import { Request, Response } from "express";
import { asyncWrapper } from "../utils/apiHelper";
import { getAll, getById, create } from "../services/post.service";
import {
  CreatePostDto,
  GetPostDto,
  PaginationQueryParams,
  validateCreatePostDto,
} from "../utils/dto";
import { PostModel } from "../../config/prisma";

export const createPost = asyncWrapper(
  async (req: Request<{}, {}, CreatePostDto>, res: Response) => {
    const { title, content } = req.body;
    const { id: authorId } = req.currentUser;

    validateCreatePostDto({ title, content })
      .then(() => create({ title, content, authorId }))
      .then((post) => res.json({ data: post }))
      .catch((err) => res.status(400).json({ message: err.message }));

    // todo lets think that average reading speed is 150 wpm
    // const readingTimeInMinutes = newPost.content.split(" ").length / 150;
  }
);

export const getAllPosts = asyncWrapper(
  async (req: Request<{}, {}, {}, PaginationQueryParams>, res: Response) => {
    const { offset = 0, limit = 10 } = req.query;
    const posts = await getAll(offset, limit);

    const postsDto = posts.map((post) => post as GetPostDto);
    res.json({ data: postsDto });
  }
);

export const getPostById = asyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await getById(Number(id));

  if (!post) {
    res.status(404).json({ message: "couldn't find any post with such id" });
    return;
  }

  res.json({ data: post as GetPostDto });
});
