/** @format */

import resConst from '../constants/responses.js';
import { verifyToken } from '../jwt_functions/index.js';
import responseCreator from '../utils/responseCreator.js';
const getUserByToken = (req, res) => {
	const { AuthToken } = req.cookies;
	try {
		const payload = verifyToken(AuthToken);
		const data = {
			email: payload.email,
			id: payload.id,
			userName: payload.userName,
		};
		return responseCreator(res, resConst.status.OK, resConst.messages.created, data);
	} catch (err) {
		return responseCreator(res, resConst.status.Unauthorized, resConst.messages.invalidToken);
	}
};
export default getUserByToken;
