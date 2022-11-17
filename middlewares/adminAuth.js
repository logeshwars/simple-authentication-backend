import resConst from '../constants/responses.js';
import { verifyAdmin } from '../jwt_functions/index.js';
import responseCreator from '../utils/responseCreator.js';
const adminAuth = async (req, res, next) => {
	const { AuthToken } = req.cookies;
	const { status, messages } = resConst;
	try {
		if (!(await verifyAdmin(AuthToken))) {
			return responseCreator(res, status.Unauthorized, messages.permissionDenied);
		}
	} catch (err) {
		return responseCreator(res, status.Unauthorized, messages.sessionExpired);
	}
	next();
};
export default adminAuth;
