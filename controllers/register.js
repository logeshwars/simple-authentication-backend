import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import responseCreater from "../utils/responseCreater.js";
import { messages, statusCode, statusText } from "../constants/responses.js";
import userSchema from "../schema/user.schema.js";
const prisma = new PrismaClient();
const register = async (req, res) => {
  try {
    const value = await userSchema.validateAsync(req.body);
  } catch (err) {
    return responseCreater(
      res,
      statusCode.BadRequest,
      statusText.BadRequest,
      err.message
    );
  }
  try {
    const { userName, email, password, dob, confirm_password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const haspassword = await bcrypt.hash(password, salt);
    await prisma.user.create({
      data: {
        userName,
        email,
        dob: new Date(dob),
        password: haspassword,
      },
    });
    responseCreater(
      res,
      statusCode.Created,
      statusText.Created,
      messages.created
    );
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return responseCreater(
          res,
          statusCode.BadRequest,
          statusText.BadRequest,
          messages.userExist
        );
      }
    }
    responseCreater(
      res,
      statusCode.BadRequest,
      statusText.BadRequest,
      messages.createError
    );
  }
};
export default register;
