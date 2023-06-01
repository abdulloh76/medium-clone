import { Request, Response } from "express";
import { asyncWrapper } from "../utils/apiHelper";
import { getAll } from "../services/user.service";
import { GetUserDto, PaginationQueryParams } from "../utils/dto";

export const getAllUsers = asyncWrapper(
  async (req: Request<{}, {}, {}, PaginationQueryParams>, res: Response) => {
    const { offset, limit } = req.query;
    const users = await getAll(Number(offset), Number(limit));

    const usersDto: GetUserDto[] = users.map((user) => {
      const { password, ...userDto } = user;
      return userDto;
    });

    res.json({ data: usersDto });
  }
);
