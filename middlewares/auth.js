import { messages, statusCode, statusText } from "../constants/responses.js";
import verifyToken from "../jwt-utils/verifyToken.js";
import responseCreater from "../utils/responseCreater.js";

const auth = (req, res, next) => {
  const { AuthToken } = req.cookies;
  try {
    const payload = verifyToken(AuthToken);
    req.user = payload;
  } catch (err) {
    return responseCreater(
      res,
      statusCode.Unauthorized,
      statusText.Unauthorized,
      messages.invalidToken
    );
  }
  next();
};
export default auth;
