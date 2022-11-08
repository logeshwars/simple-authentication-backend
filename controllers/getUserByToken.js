import resConst from '../constants/responses.js';
import { verifyToken } from '../jwt_functions/index.js';
import responseCreator from '../utils/responseCreator.js';
const getUserByToken = (req, res) => {
	const { AuthToken } = req.cookies;
	const { status, messages } = resConst;
	try {
		const payload = verifyToken(AuthToken);
		const data = {
			email: payload.email,
			id: payload.id,
			userName: payload.userName,
			role:payload.role
		};
		return responseCreator(res, status.OK, messages.userFound, data);
	} catch (err) {
		return responseCreator(res, status.Unauthorized, messages.invalidToken);
	}
};
export default getUserByToken;
