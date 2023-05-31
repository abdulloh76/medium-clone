import { Request, Response } from "express";
import { asyncWrapper } from "../utils/apiHelper";
import { getAll } from "../services/user.service";
import { GetUserDto, PaginationQueryParams } from "../utils/dto";

export const getAllUsers = asyncWrapper(
  async (req: Request<{}, {}, {}, PaginationQueryParams>, res: Response) => {
    const { offset = 0, limit = 10 } = req.query;
    const users = await getAll(offset, limit);

    const usersDto = users.map((user) => user as GetUserDto);
    res.json({ data: usersDto });
  }
);
