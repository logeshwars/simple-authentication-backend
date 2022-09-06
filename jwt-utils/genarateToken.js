import jwt from "jsonwebtoken";
import { auth_token_private_key } from "../keys/index.js";
const genarateToken = (payload) => {
  var verifyOptions = {
    issuer: "Logeshwar",
    subject: "Jwt token for authentication",
    audience: payload.email,
    expiresIn: "10min",
    algorithm: "RS256",
  };
  let token = jwt.sign(payload, auth_token_private_key, verifyOptions);
  return token;
};
export default genarateToken;
