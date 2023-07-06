exports.successResponse = (req, res, data, code = 200) =>
  res.send({
    code,
    data,
    success: true,
  });

exports.errorResponse = (req, res, errorMessage = "Something went wrong", code = 500, error = {}) =>
  res.status(code).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });

exports.unauthorizedResponse = (req, res, errorMessage = "Something went wrong", code = 401, error = {}) =>
  res.status(code).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });

exports.notFoundResponse = (req, res, errorMessage = "Something went wrong", code = 404, error = {}) =>
  res.status(code).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });

exports.notFound = (req, res, next) => {
  const error = new Error(`Not the route you want ${req.originalUrl}`);
  res.status(404);
  next(error);
};
exports.errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    errortack: error.stack,
  });
};

/* app.use(errorHandlingMiddlewares.notFound);
app.use(errorHandlingMiddlewares.errorHandler); */
