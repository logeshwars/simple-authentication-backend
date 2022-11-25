import jwt from 'jsonwebtoken';
import jwtConst from '../constants/jwt.js';
import {
	refresh_auth_token_private_key,
	auth_token_private_key,
	refresh_auth_token_public_key,
	auth_token_public_key,
} from '../keys/index.js';
import prisma from '../prisma/client.js';
import {authTokenConfig,refreshTokenConfig} from './config.js';
export const genarateRefreshToken = async (payload, jwtid,keepLogged) => {
	var verifyOptions = {
		...refreshTokenConfig,
		jwtid: jwtid,
		...(keepLogged && {expiresIn: '7d'})
	};

	const refreshToken = jwt.sign(payload, refresh_auth_token_private_key, verifyOptions);
	await prisma.logins.deleteMany({
		where: {
			userId: payload.id,
		},
	});

	await prisma.logins.create({
		data: {
			userId: payload.id,
			jwtid,
		},
	});
	return refreshToken;
};

export const genarateToken = (payload, jwtid) => {
	var verifyOptions = {
		...authTokenConfig,
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

export const verifyAdmin = async (token)=>
{
	const payload = jwt.verify(token, auth_token_public_key);
    const user = await prisma.user.findFirst({ where: { email:payload.email } });
	if ((user.role === payload.role) && (payload.role === jwtConst.RoleAdmin))
	{
		return true;
	}
	else 
	{ 
		return false;
	}

}
