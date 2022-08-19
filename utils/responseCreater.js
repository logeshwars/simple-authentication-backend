const responseCreater = (res, code, text, message, data, options) => {
  return res.status(code).send({
    statusText: text,
    message,
    ...(data && { data }),
    ...(options && options),
  });
};
export default responseCreater;
