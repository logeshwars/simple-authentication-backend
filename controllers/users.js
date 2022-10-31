import resConst from '../constants/responses.js';
import prisma from '../prisma/client.js';
import responseCreator from '../utils/responseCreator.js';
const users = async (req, res) => {
	const defaultDataLimit = 6, defaultPage = 0 ,orderDataBy = 'desc';
	const { id } = req.query;
	try {
		if (id) {
			const user = await prisma.user.findUnique({
				where: {
					id: id,
				},
			});
			if (!user) return responseCreator(res, resConst.status.NotFound, resConst.messages.userNotFound);
			responseCreator(res, resConst.status.Accepted, resConst.messages.userFound, user);
		} else {
			const { _limit = defaultDataLimit, _page = defaultPage } = req.query;
			const users = await prisma.user.findMany({
				take: Number(_limit),
				skip: Number(_page) * Number(_limit),
				orderBy: { dob: orderDataBy },
			});
			const last_page = Math.floor((await prisma.user.count()) / _limit);
			if (users.length === 0) {
				responseCreator(res, resConst.status.NoContent, resConst.messages.invalidParams);
			}
			responseCreator(res, resConst.status.Accepted, resConst.messages.userFound, users, {
				data_count: users.length,
				current_page: _page,
				last_page,
			});
		}
	} catch (err) {
		res.status(resConst.status.ServerError.code).send(resConst.messages.sww);
	}
};

export default users;
