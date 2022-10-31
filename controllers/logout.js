import { PrismaClient } from '@prisma/client';
import jwtConst from '../constants/jwt.js';
import resConst from '../constants/responses.js';
import { verifyRefreshToken } from '../jwt_functions/index.js';
import responseCreator from '../utils/responseCreator.js';
const prisma = new PrismaClient();
const { status, messages } = resConst;
const logout = async (req, res) => {
	try {
		const { jti } = verifyRefreshToken(req.cookies.RefreshToken);
		await prisma.logins.deleteMany({
			where: { jwtid: jti },
		});
		res.clearCookie(jwtConst.AuthToken);
		res.clearCookie(jwtConst.RefreshToken);
		responseCreator(res, status.Accepted, messages.logout);
	} catch (err) {
		responseCreator(res, status.ServerError, messages.sww);
	}
};
export default logout;
