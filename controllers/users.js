import { PrismaClient } from "@prisma/client";
import { messages, statusCode, statusText } from "../constants/responses.js";
import responseCreator from "../utils/responseCreater.js";
const prisma = new PrismaClient();
const users = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (!user)
        return responseCreator(
          res,
          statusCode.NotFound,
          statusText.NotFound,
          messages.userNotFound
        );
      res;
      responseCreator(
        res,
        statusCode.OK,
        statusText.Accepted,
        messages.userFound,
        user
      );
    } else {
      const { _limit = 6, _page = 0 } = req.query;
      const users = await prisma.user.findMany({
        take: Number(_limit),
        skip: Number(_page) * Number(_limit),
        orderBy: { dob: "desc" },
      });
      const last_page = Math.floor((await prisma.user.count()) / _limit);
      if (users.length === 0) {
        console.log(_page, "len", users.length);
        return responseCreator(
          res,
          statusCode.NotFound,
          statusText.NoContent,
          messages.invalidParams
        );
      }
      responseCreator(
        res,
        statusCode.OK,
        statusText.Accepted,
        messages.userFound,
        users,
        {
          data_count: users.length,
          current_page: _page,
          last_page,
        }
      );
    }
  } catch (err) {
    res.status(501).send(err.message);
  }
};

export default users;
