/** @format */

import resConst from '../constants/responses.js';
import { verifyToken } from '../jwt_functions/index.js';
import responseCreator from '../utils/responseCreator.js';
const auth = (req, res, next) => {
	const { AuthToken } = req.cookies;
	try {
		console.log(AuthToken);
		const payload = verifyToken(AuthToken);
		req.user = payload;
	} catch (err) {
		console.log(err);
		return responseCreator(res, resConst.status.Unauthorized, resConst.messages.invalidToken);
	}
	next();
};
export default auth;
