import { Request, Response } from "express";
import { asyncWrapper } from "../utils/apiHelper";
import { getAll } from "../services/user.service";
import { PaginationQueryParams } from "../utils/dto";

export const getAllUsers = asyncWrapper(
  async (req: Request<{}, {}, {}, PaginationQueryParams>, res: Response) => {
    const { offset = 0, limit = 10 } = req.query;
    const users = await getAll(offset, limit);
    // todo use dto to not extract password

    if (!users) {
      res.status(500).json({ message: "todo something went wrong" });
    }

    res.json({ data: users });
  }
);
