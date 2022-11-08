import bcrypt from 'bcrypt';
import responseCreator from '../utils/responseCreator.js';
import resConst from '../constants/responses.js';
import userSchema from '../schema/user.schema.js';
import prisma from '../prisma/client.js';
import * as jwt from "../jwt_functions/index.js"
import jwtConst from '../constants/jwt.js';
import { Prisma } from '@prisma/client';
const { status, messages } = resConst;
const register = async (req, res) => {
	const { AuthToken } = req.cookies;
	const defaultRole = jwtConst.RoleUser;
	try {
		await userSchema.validateAsync(req.body);
	} catch (err) {
		return responseCreator(res, status.BadRequest, err.message);
	}
	try {
		const { userName, email, password, dob , role = defaultRole } = req.body;
		const salt = await bcrypt.genSalt(10);
		const haspassword = await bcrypt.hash(password, salt);
		await prisma.user.create({
			data: {
				userName,
				email,
				dob: new Date(dob),
				password: haspassword,
				role: await jwt.verifyAdmin(AuthToken) ? role : defaultRole
			},
		});
		responseCreator(res, status.Created, messages.created);
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			if (e.code === 'P2002') {
				return responseCreator(res, status.BadRequest, messages.userExist);
			}
		}
		responseCreator(res, status.BadRequest, messages.createError);
	}
};
export default register;
