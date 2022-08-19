import { PrismaClient } from "@prisma/client";
import { messages, statusCode, statusText } from "../constants/responses.js";
import genarateRefreshToken from "../jwt-utils/genarateRefreshToken.js";
import genarateToken from "../jwt-utils/genarateToken.js";
import verifyRefreshToken from "../jwt-utils/verifyRefreshToken.js";
import responseCreater from "../utils/responseCreater.js";
const prisma = new PrismaClient();
const token = async (req, res) => {
  try {
    const { RefreshToken } = req.cookies;
    if (!RefreshToken) throw new Error("Token does not exisit");
    const payload = verifyRefreshToken(RefreshToken);
    if (!payload) throw new Error("Invalid token");
    const dbToken = await prisma.logins.findFirst({
      where: {
        userId: payload.id,
      },
    });
    console.log("dbToken", dbToken);
    if (!dbToken) throw new Error("Token does not exisit in DB");
    const query = await prisma.logins.delete({
      where: {
        id: dbToken.id,
      },
    });
    const authToken = genarateToken({ email: payload.email, id: payload.id });
    const newRefreshToken = await genarateRefreshToken({
      email: payload.email,
      id: payload.id,
    });
    res.cookie("AuthToken", authToken, { httpOnly: true });
    res.cookie("RefreshToken", newRefreshToken, { httpOnly: true });
    responseCreater(
      res,
      statusCode.Created,
      statusText.Created,
      messages.successToken
    );
  } catch (err) {
    console.log(err);
    responseCreater(
      res,
      statusCode.Unauthorized,
      statusText.Unauthorized,
      messages.invalidToken
    );
  }
};

export default token;
