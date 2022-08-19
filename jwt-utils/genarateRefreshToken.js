import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { refresh_auth_token_private_key } from "../keys/index.js";
const prisma = new PrismaClient();
const genarateRefreshToken = async (payload) => {
  var verifyOptions = {
    issuer: "Logeshwar",
    subject: "Jwt refresh token for auth token",
    audience: payload.email,
    expiresIn: "15min",
    algorithm: "RS256",
  };
  const refreshToken = jwt.sign(
    payload,
    refresh_auth_token_private_key,
    verifyOptions
  );
  const deletePreviousToken = await prisma.logins.deleteMany({
    where: {
      userId: payload.id,
    },
  });
  const query = await prisma.logins.create({
    data: {
      refreshToken: refreshToken,
      userId: payload.id,
    },
  });
  return refreshToken;
};
export default genarateRefreshToken;
