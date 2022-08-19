import { PrismaClient } from "@prisma/client";
import genarateToken from "../jwt-utils/genarateToken.js";
import genarateRefreshToken from "../jwt-utils/genarateRefreshToken.js";
import bcrypt from "bcrypt";
import responseCreater from "../utils/responseCreater.js";
import { messages, statusCode, statusText } from "../constants/responses.js";
const prisma = new PrismaClient();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return responseCreater(
        res,
        statusCode.Unauthorized,
        statusText.Unauthorized,
        messages.invalidCred
      );
    }
    const validatePassword = bcrypt.compareSync(password, user.password);
    if (!validatePassword) {
      return responseCreater(
        res,
        statusCode.Unauthorized,
        statusText.Unauthorized,
        messages.invalidCred
      );
    }
    const token = genarateToken({ email: user.email, id: user.id });
    const refreshToken = await genarateRefreshToken({
      session_id: req.session,
      email: user.email,
      id: user.id,
    });
    res.cookie("AuthToken", token, { httpOnly: true });
    res.cookie("RefreshToken", refreshToken, { httpOnly: true });
    return responseCreater(
      res,
      statusCode.Accepted,
      statusText.Accepted,
      messages.logedin
    );
  } catch (err) {
    console.log(err);
    responseCreater(
      res,
      statusCode.BadRequest,
      statusText.BadRequest,
      messages.errLog
    );
  }
};
export default login;
