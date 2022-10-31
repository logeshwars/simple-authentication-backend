import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import responseCreator from '../utils/responseCreator.js';
import resConst from '../constants/responses.js';
import userSchema from '../schema/user.schema.js';
const prisma = new PrismaClient();
const { status, messages } = resConst;
const register = async (req, res) => {
	try {
		await userSchema.validateAsync(req.body);
	} catch (err) {
		return responseCreator(res, status.BadRequest, err.message);
	}
	try {
		const { userName, email, password, dob } = req.body;
		const salt = await bcrypt.genSalt(10);
		const haspassword = await bcrypt.hash(password, salt);
		await prisma.user.create({
			data: {
				userName,
				email,
				dob: new Date(dob),
				password: haspassword,
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
