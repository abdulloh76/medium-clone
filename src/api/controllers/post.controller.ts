import { Request, Response } from "express";
import { asyncWrapper } from "../utils/apiHelper";
import { getAll, getById, create } from "../services/post.service";
import {
  CreatePostDto,
  GetPostDto,
  PaginationQueryParams,
  validateCreatePostDto,
} from "../utils/dto";

// * lets think that average reading speed is 100 wpm
const AVERAGE_READ_SPEED = 100;

export const createPost = asyncWrapper(
  async (req: Request<{}, {}, CreatePostDto>, res: Response) => {
    const { title, content } = req.body;
    const { id: authorId } = req.currentUser;

    validateCreatePostDto({ title, content })
      .then(() => create({ title, content, authorId }))
      .then((post) => {
        const couldReadInMinutes =
          post.content.split(" ").length / AVERAGE_READ_SPEED;
        res.json({ data: { ...post, couldReadInMinutes } });
      })
      .catch((err) =>
        res.status(400).json({ message: err.message, status: 400 })
      );
  }
);

export const getAllPosts = asyncWrapper(
  async (req: Request<{}, {}, {}, PaginationQueryParams>, res: Response) => {
    const { id: authorId } = req.currentUser;
    const { offset = 0, limit = 10 } = req.query;
    const posts = await getAll(Number(offset), Number(limit), authorId);

    const postsDto: GetPostDto[] = posts.map((post) => {
      const couldReadInMinutes =
        post.content.split(" ").length / AVERAGE_READ_SPEED;
      return { ...post, couldReadInMinutes };
    });
    res.json({ data: postsDto });
  }
);

export const getPostById = asyncWrapper(async (req: Request, res: Response) => {
  const { id: authorId } = req.currentUser;
  const { id } = req.params;
  const post = await getById(Number(id), authorId);

  if (!post) {
    res
      .status(404)
      .json({ message: "couldn't find any post with such id", status: 404 });
    return;
  }

  const couldReadInMinutes =
    post.content.split(" ").length / AVERAGE_READ_SPEED;

  res.json({ data: { ...post, couldReadInMinutes } });
});
