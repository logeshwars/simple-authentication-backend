const resConst = {
	status: {
		OK: { code: 200, text: 'Success' },
		Created: { code: 201, text: 'Created Successfully' },
		Accepted: { code: 202, text: 'Accepted' },
		NoContent: { code: 204, text: 'No Content Available' },
		MovedPermanently: { code: 301, text: 'Moved Permanentlye' },
		BadRequest: { code: 400, text: 'Bad Request' },
		Unauthorized: { code: 401, text: 'Unauthorized Access' },
		Forbiden: { code: 403, text: 'Forbiden' },
		NotFound: { code: 404, text: 'Not Found' },
		ServerError: { code: 500, text: 'Internal Server Error' },
	},
	messages: {
		invalidReqBody: 'Invalid request body',
		invalidCred: 'Invalid Credintials',
		internalServerError: 'Internal server error',
		userFound: 'User found',
		errLog: 'Error while logging in',
		errToken: 'Error while creating token',
		userNotFound: 'User not found',
		notFound: 'Record not found',
		created: 'User created successfully',
		createError: 'Error while creating user',
		update: 'Updated successfully',
		updateError: 'Error while updating',
		userDeleted: 'User deleted successfully',
		logedin: 'Logged in Successfully',
		logout: 'Logged out Successfully',
		missingId: 'Record ID required',
		invalidParams: 'Invalid parameters',
		invalidToken: 'Invalid Token',
		sww: 'Something went wrong',
		successToken: 'Token Created Successfully',
		userExist: 'User already exits',
		sessionExpired:"Session Expired",
		permissionDenied:'Permission Denied'
	},
};

export default resConst;
