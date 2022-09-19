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
    if (!RefreshToken) throw new Error("Token does not exsist");
    const payload = verifyRefreshToken(RefreshToken);
    if (!payload) throw new Error("Invalid token");
    const dbToken = await prisma.logins.findFirst({
      where: {
        jwtid: payload.jti,
      },
    });
    if (!dbToken) throw new Error("Token does not exisit in DB");
    if (dbToken.jwtid !== payload.jti) throw new Error("Invalid Token");
    const query = await prisma.logins.deleteMany({
      where: {
        jwtid: dbToken.jwtid,
      },
    });
    const authToken = genarateToken(
      {
        email: payload.email,
        id: payload.id,
        userName: payload.userName,
      },
      payload.jti
    );
    const newRefreshToken = await genarateRefreshToken(
      {
        email: payload.email,
        id: payload.id,
        userName: payload.userName,
      },
      payload.jti
    );
    res.cookie("AuthToken", authToken, { httpOnly: true });
    res.cookie("RefreshToken", newRefreshToken, { httpOnly: true });
    responseCreater(
      res,
      statusCode.Created,
      statusText.Created,
      messages.successToken
    );
  } catch (err) {
    console.log(err.message);
    responseCreater(
      res,
      statusCode.Unauthorized,
      statusText.Unauthorized,
      messages.invalidToken
    );
  }
};

export default token;
