import resConst from '../constants/responses.js';
import { verifyToken } from '../jwt_functions/index.js';
import responseCreator from '../utils/responseCreator.js';
import bcrypt from 'bcrypt';
import prisma from '../prisma/client.js';
const getCurrentUserDetails = async (req, res) => {
	const { AuthToken } = req.cookies;
	const { status, messages } = resConst;
	try {
		const payload = verifyToken(AuthToken);
        const user = await prisma.user.findFirst({ where: { email:payload.email } });
    
		if (!user) {
			return responseCreator(res, status.Unauthorized, messages.invalidCred);
		}
        const [{loginTime}]=await prisma.logins.findMany({
			where: { userId:payload.id },
            orderBy:{loginTime :'desc'},
            select:{loginTime:true}
		});
		const data = {
			email: user.email,
			id: user.id,
			userName: user.userName,
			role: user.role,
            dob:user.dob,
            loginTime
		};

		return responseCreator(res, status.OK, messages.userFound, data);
	} catch (err) {
      
		return responseCreator(res, status.Unauthorized, messages.invalidToken);
	}
};
export default getCurrentUserDetails;
