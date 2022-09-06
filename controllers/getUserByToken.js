import { messages, statusCode, statusText } from "../constants/responses.js";
import verifyToken from "../jwt-utils/verifyToken.js";
import responseCreater from "../utils/responseCreater.js";
const getUserByToken = (req, res) => {
  const { AuthToken } = req.cookies;
  try {
    const payload = verifyToken(AuthToken);
    const data = {
      email: payload.email,
      id: payload.id,
      userName: payload.userName,
    };
    return responseCreater(
      res,
      statusCode.OK,
      statusText.OK,
      messages.created,
      data
    );
  } catch (err) {
    return responseCreater(
      res,
      statusCode.Unauthorized,
      statusText.Unauthorized,
      messages.invalidToken
    );
  }
};
export default getUserByToken;
