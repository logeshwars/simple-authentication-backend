import { PrismaClient } from '@prisma/client';
import resConst from '../constants/responses.js';
import responseCreator from '../utils/responseCreator.js';
const prisma = new PrismaClient();
const { status, messages } = resConst;
const forgotPassword = async (req, res) => {
	
};
export default forgotPassword;
