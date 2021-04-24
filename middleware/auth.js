module.exports=function auth(req, res, next) {
  try {
    const apiKey = req.header('X-Br-Api-Key');
    if (!apiKey) {
      return res.status(401).send({
        'api_error': {
          'dev_msg': 'You do not have permission to do this action. API Key is missing in the request. ',
          'user_msg': 'You do not have permission to do this action.',
          'user_msg_title': 'Access denied!',
          'code': 401,
        },
      });
    }

    if (apiKey != process.env.API_KEY) {
      return res.status(401).send({
        'api_error': {
          'dev_msg': 'You do not have permission to do this action. API Key is invalid in the request. ',
          'user_msg': 'You do not have permission to do this action.',
          'user_msg_title': 'Access denied!',
          'code': 401,
        },
      });
    }
    next();
  } catch (ex) {
    res.status(400).send(ex);
  }
};

