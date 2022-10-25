/** @format */

const jwtConfig = {
	issuer: 'localhost:3001',
	subject: 'Jwt token for authentication',
	audience: 'localhost:3000',
	expiresIn: '5min',
	algorithm: 'RS256',
};

export default jwtConfig;
