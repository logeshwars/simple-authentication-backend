import jwt from "jsonwebtoken";
import { auth_token_private_key } from "../keys/index.js";
const genarateToken = (payload, jwtid) => {
  var verifyOptions = {
    issuer: "localhost:3001",
    subject: "Jwt token for authentication",
    audience: "localhost:3000",
    expiresIn: "5min",
    algorithm: "RS256",
    jwtid: jwtid,
  };
  let token = jwt.sign(payload, auth_token_private_key, verifyOptions);
  return token;
};
export default genarateToken;
