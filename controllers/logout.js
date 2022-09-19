import { PrismaClient } from "@prisma/client";
import { messages, statusCode, statusText } from "../constants/responses.js";
import verifyRefreshToken from "../jwt-utils/verifyRefreshToken.js";
import responseCreater from "../utils/responseCreater.js";
const prisma = new PrismaClient();
const logout = async (req, res) => {
  try {
    const { jti } = await verifyRefreshToken(req.cookies.RefreshToken);
    const deleteToken = await prisma.logins.deleteMany({
      where: { jwtid: jti },
    });
    res.clearCookie("AuthToken");
    res.clearCookie("RefreshToken");
    responseCreater(res, statusCode.OK, statusText.Accepted, messages.logout);
  } catch (err) {
    console.log(err.message);
    responseCreater(
      res,
      statusCode.ServerError,
      statusText.ServerError,
      messages.sww
    );
  }
};
export default logout;
