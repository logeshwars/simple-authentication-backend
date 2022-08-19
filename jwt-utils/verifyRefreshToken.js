import jwt from "jsonwebtoken";
import { refresh_auth_token_public_key } from "../keys/index.js";
const verifyRefreshToken = (token) => {
  return jwt.verify(token, refresh_auth_token_public_key);
};
export default verifyRefreshToken;
