/** @format */

import jwt from 'jsonwebtoken';
import {
	refresh_auth_token_private_key,
	auth_token_private_key,
	refresh_auth_token_public_key,
	auth_token_public_key,
} from '../keys/index.js';
import prisma from '../prisma/client.js';
import jwtConfig from './config.js';
export const genarateRefreshToken = async (payload, jwtid) => {
	var verifyOptions = {
		...jwtConfig,
		jwtid: jwtid,
	};
	const refreshToken = jwt.sign(payload, refresh_auth_token_private_key, verifyOptions);
	await prisma.logins.deleteMany({
		where: {
			userId: payload.id,
		},
	});
	await prisma.logins.create({
		data: {
			refreshToken: refreshToken,
			userId: payload.id,
			jwtid,
		},
	});
	return refreshToken;
};

export const genarateToken = (payload, jwtid) => {
	var verifyOptions = {
		...jwtConfig,
		jwtid: jwtid,
	};
	let token = jwt.sign(payload, auth_token_private_key, verifyOptions);
	return token;
};

export const verifyRefreshToken = (token) => {
	return jwt.verify(token, refresh_auth_token_public_key);
};

export const verifyToken = (token) => {
	return jwt.verify(token, auth_token_public_key);
};
