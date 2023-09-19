function badRequest({ req, res, next, error, data = null, message = null }) {
  return res.status(400).send({
    error_code: 400,
    error_message: message || error.message,
    ...(data && { error_data: data }),
  });
}

function success({ req, res, next, data }) {
  return res.status(200).send(data);
}

module.exports = { badRequest, success };
