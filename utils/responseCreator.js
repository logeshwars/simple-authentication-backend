/** @format */

const responseCreator = (res, resConst, message, data, options) => {
	return res.status(resConst.code).send({
		statusText: resConst.codetext,
		message,
		...(data && { data }),
		...(options && options),
	});
};
export default responseCreator;
