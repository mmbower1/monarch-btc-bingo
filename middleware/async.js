// receives a function and returns a function with 3 params like a middlware function, and catches error
const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;