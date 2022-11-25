import resConst from '../constants/responses.js';
import prisma from '../prisma/client.js';
import responseCreator from '../utils/responseCreator.js';
const users = async (req, res) => {
	const { status, messages } = resConst;
	const { user } = req;
	const outFields = {
		id: true,
		userName: true,
		email: true,
		dob: true,
		role: true,
	};
	const defaultDataLimit = 6,
		defaultPage = 0,
		orderDataBy = 'desc';
	const { id } = req.query;
	try {
		if (id) {
			const user = await prisma.user.findUnique({
				where: {
					id: id,
				},
				select: outFields,
			});
			if (!user) return responseCreator(res, status.NotFound, messages.userNotFound);
			responseCreator(res, status.Accepted, messages.userFound, user);
		} else {
			const { _limit = defaultDataLimit, _page = defaultPage } = req.query;
			const users = await prisma.user.findMany({
				where: { NOT: { id: user.id } },
				take: Number(_limit),
				skip: Number(_page) * Number(_limit),
				orderBy: { dob: orderDataBy },
				select: outFields,
			});
			const last_page = Math.floor((await prisma.user.count()) / _limit);
			if (users.length === 0) {
				responseCreator(res, status.NoContent, messages.invalidParams);
			}
			responseCreator(res, status.Accepted, messages.userFound, users, {
				data_count: users.length,
				current_page: _page,
				last_page,
			});
		}
	} catch (err) {
		res.status(status.ServerError.code).send(messages.sww);
	}
};

export default users;
