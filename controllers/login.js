import * as jwt from '../jwt_functions/index.js';
import bcrypt from 'bcrypt';
import responseCreator from '../utils/responseCreator.js';
import resConst from '../constants/responses.js';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../prisma/client.js';
import jwtConst from '../constants/jwt.js';
const login = async (req, res) => {
	const { email, password } = req.body;
	const uuid = uuidv4();
	try {
		const user = await prisma.user.findFirst({ where: { email } });

		if (!user) {
			return responseCreator(res, resConst.status.Unauthorized, resConst.messages.invalidCred);
		}
		const validatePassword = bcrypt.compareSync(password, user.password);

		if (!validatePassword) {
			return responseCreator(res, resConst.status.Unauthorized, resConst.messages.invalidCred);
		}
		const tokenPayload = [
			{
				email: user.email,
				id: user.id,
				userName: user.userName,
			},
			uuid,
		];

		const token = jwt.genarateToken(...tokenPayload);
		const refreshToken = await jwt.genarateRefreshToken(...tokenPayload);

		res.cookie(jwtConst.AuthToken, token, { httpOnly: true });
		res.cookie(jwtConst.RefreshToken, refreshToken, { httpOnly: true });
		return responseCreator(res, resConst.status.Accepted, resConst.messages.logedin);
	} catch (err) {
		responseCreator(res, resConst.status.BadRequest, resConst.messages.errLog);
	}
};
export default login;
