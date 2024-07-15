exports.tryCatchWrapper = (cb) => async (req, res, next) => {
  const { method, originalUrl } = req;

  const executeTime = Date.now();
  const request = await cb(req, res, next).catch((err) => next(err));
  const finishTime = Date.now();

  console.log(`${method} ${originalUrl} - ${finishTime - executeTime} ms`);

  return request;
};
