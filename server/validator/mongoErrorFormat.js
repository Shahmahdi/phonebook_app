
const mongoErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.errmsg;
  if (err.code === 11000 || err.code === 11001) {
    const pathRegex = err.message
      .split('index: ')[1]
      .split('dup key')[0]
      .split('_')[0];
    const keyRegex = err.message.match(/key:\s+{\s+:\s\"(.*)(?=\")/);
    const key = keyRegex ? keyRegex[1] : '';
    const output = {
      message: `${pathRegex} already exists`,
      fieldName: pathRegex,
    };
    let errorBody = {
      status: 409,
      type: 'DuplicateKeyError',
      errors: [output],
    };
    res.status(409);
    return res.json(errorBody);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal server error',
  });
};

module.exports = mongoErrorHandler;
