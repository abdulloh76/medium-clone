import { Request, Response } from "express";
import { asyncWrapper } from "../utils/apiHelper";
import { getAll } from "../services/user.service";
import { PaginationQueryParams } from "../utils/dto";

export const getAllUsers = asyncWrapper(
  async (req: Request<{}, {}, {}, PaginationQueryParams>, res: Response) => {
    const { offset = 0, limit = 0 } = req.query;
    const users = await getAll(offset, limit);

    if (!users) {
      res.status(500).json({ message: "todo something went wrong" });
    }

    res.json({ data: users });
  }
);
