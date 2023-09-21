function badRequest({
  req,
  res,
  next,
  error,
  data = null,
  message = "Some thing went wrong! Please try again.",
}) {
  res.status(400).send({
    status: 400,
    message: message || error.message,
    ...(data && { data: data }),
  });
}

function success({ req, res, next, data }) {
  return res.status(200).json({
    status: "success",
    requestAt: req.requestAt,
    data
  });
}

module.exports = { badRequest, success };
