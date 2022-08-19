import jwt from "jsonwebtoken";
import { auth_token_public_key } from "../keys/index.js";
const verifyToken = (token) => {
  return jwt.verify(token, auth_token_public_key);
};
export default verifyToken;
