import resConst from '../constants/responses.js';
import { verifyToken } from '../jwt_functions/index.js';
import responseCreator from '../utils/responseCreator.js';
const auth = (req, res, next) => {
	const { AuthToken } = req.cookies;
	try {
		const payload = verifyToken(AuthToken);
		req.user = payload;
	} catch (err) {
		return responseCreator(res, resConst.status.Unauthorized, resConst.messages.sessionExpired);
	}
	next();
};
export default auth;
