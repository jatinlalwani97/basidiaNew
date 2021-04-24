async function returnObject(triggerType, siteId) {
  const coditionObject = {
    'trigger_type': triggerType,

    'site_id': siteId,
    
    'filters': {
      "status": "published"
    },
    'roles': [],
  };
  return coditionObject;
}

function returnErrorObject() {
  const internalErrorObject = {
    'api_error': {
      'dev_msg': 'Error in processing the request! ',
      'user_msg': 'Error in processing the request! ',
      'user_msg_title': 'Server error!',
      'code': 500,
    },
  };
  return internalErrorObject;
}

function returnNotFoundObject() {
  const notFoundObject = {
    'api_error': {
      'dev_msg': 'Resource not available : Not Found',
      'user_msg': 'Resource not available',
      'user_msg_title': 'Not found!',
      'code': 404,
    },
  };
  return notFoundObject;
}

function returnHeaders(siteUrl, token) {
  const headers = {
    'X-Teamie-App-Version': process.env.TEAMIE_APP_VERSION,
    'X-Teamie-Uid': process.env.TEAMIE_UID,
    'X-Teamie-Api-Version': process.env.TEAMIE_API_VERSION,
    'X-Teamie-Site-Url': 'Site URL ' + siteUrl,
    'X-Teamie-Client': process.env.TEAMIE_CLIENT,
    'Content-Type': 'application/json',
  };

  if (token != null) {
    headers['Authorization'] = 'Bearer ' + token;
  }
  return headers;
}

module.exports = {
  returnObject,
  returnErrorObject,
  returnHeaders,
  returnNotFoundObject,
};
