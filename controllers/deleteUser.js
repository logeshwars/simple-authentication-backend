import resConst from '../constants/responses.js';
import prisma from '../prisma/client.js';
import responseCreator from '../utils/responseCreator.js';

const deleteUser = async (req, res) => {
	const { status, messages } = resConst;
	const { userid } = req.body;

	if (!userid) {
		return responseCreator(res, status.BadRequest, messages.notFound);
	}
	try {
		await prisma.user.delete({ where: { id: userid } });
		return responseCreator(res, status.OK, messages.userDeleted);
	} catch (err) {
		return responseCreator(res, status.BadRequest, messages.notFound);
	}
};

export default deleteUser;
