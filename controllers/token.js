import errConst from '../constants/errors.js';
import jwtConst from '../constants/jwt.js';
import resConst from '../constants/responses.js';
import * as jwt from '../jwt_functions/index.js';
import prisma from '../prisma/client.js';
import responseCreator from '../utils/responseCreator.js';
const { status, messages } = resConst;
const token = async (req, res) => {
	try {
		const { RefreshToken } = req.cookies;
		
		// Verifying refresh token

		const payload = jwt.verifyRefreshToken(RefreshToken);

		if (!payload) {
			throw new Error(errConst.InvalidToken);
		}

		// Checking token is exisist in token or not

		const dbToken = await prisma.logins.findFirst({
			where: {
				jwtid: payload.jti,
			},
		});

		if (!dbToken) {
			throw new Error(errConst.TokenDoesNotExisitInDB);
		}

		if (dbToken.jwtid !== payload.jti) {
			throw new Error(errConst.InvalidToken);
		}

		// Deleting previous token in database

		await prisma.logins.deleteMany({
			where: {
				jwtid: dbToken.jwtid,
			},
		});

		//  storing previous token's payload to create new token

		const tokenPayload = [
			{
				email: payload.email,
				id: payload.id,
				userName: payload.userName,
				role: payload.role,
			},
			payload.jti,
		];

		// Createing auth token

		const newAuthToken = jwt.genarateToken(...tokenPayload);

		// Generating refresh token

		const newRefreshToken = await jwt.genarateRefreshToken(...tokenPayload);

		//Setting tokens in cookie

		res.cookie(jwtConst.AuthToken, newAuthToken, { httpOnly: true });
		res.cookie(jwtConst.RefreshToken, newRefreshToken, { httpOnly: true });
		responseCreator(res, status.Created, messages.successToken);
	} catch (err) {
		responseCreator(res, status.Unauthorized, messages.sessionExpired);
	}
};

export default token;
