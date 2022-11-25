const jwtConfig = {
	issuer: 'localhost:3001',
	subject: 'Jwt token for authentication',
	audience: 'localhost:3000',
	algorithm: 'RS256',
};
export const authTokenConfig = {
	...jwtConfig,
	expiresIn: '60min',
}

export const refreshTokenConfig = {
	...jwtConfig,
	expiresIn: '24h',
}

