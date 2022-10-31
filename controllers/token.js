import errConst from '../constants/errors.js';
import jwtConst from '../constants/jwt.js';
import resConst from '../constants/responses.js';
import * as jwt from '../jwt_functions/index.js';
import prisma from '../prisma/client.js';
import responseCreator from '../utils/responseCreator.js';
const token = async (req, res) => {
	try {
		const { RefreshToken } = req.cookies;

		//Checking refresh token is exisist or not
		if (!RefreshToken) {
			throw new Error(errConst.TokenDoesNotExsist);
		}

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
		responseCreator(res, resConst.status.Created, resConst.messages.successToken);
	} catch (err) {
		responseCreator(res, resConst.status.Unauthorized, resConst.messages.sessionExpired);
	}
};

export default token;
