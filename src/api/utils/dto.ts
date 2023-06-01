import Joi from "joi";

export type PaginationQueryParams = { offset?: string; limit?: string };

export type SignUpDto = { name: string; email: string; password: string };

export const validateSignUpDto = async (obj: SignUpDto) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  await schema.validateAsync(obj);
};

export type SignInDto = { email: string; password: string };

export const validateSignInDto = async (obj: SignInDto) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  await schema.validateAsync(obj);
};

export type CreatePostDto = { title: string; content: string };

export const validateCreatePostDto = async (obj: CreatePostDto) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });
  await schema.validateAsync(obj);
};

export type GetUserDto = {
  id: number;
  name: string;
  email: string;
  rating?: number | null;
};

export type GetPostDto = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  rating?: number | null;
  couldReadInMinutes?: number;
};
