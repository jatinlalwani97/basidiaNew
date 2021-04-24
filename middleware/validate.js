async function validateRule(req, res, next) {
  try {
    const ruleBody = req.body.business_rule;
    let flag = 0;
    let paramName;
    if (!ruleBody.site_id) {
      flag = 1;
      paramName = ' site_id ';
    }
    if (!ruleBody.title) {
      flag = 1;
      paramName = ' title ';
    }
    if (!ruleBody.site_url) {
      flag = 1;
      paramName = ' site_url ';
    }
    if (ruleBody.status!=0 && ruleBody.status!=1) {
      flag = 1;
      paramName = 'status';
    }
    if (flag!=0) {
      if (paramName == 'status') {
        return res.status(406).send({
          'api_error': {
            'dev_msg': 'status is invalid - it should be either 0 or 1',
            'user_msg': 'The value for status needs to be either 0 or 1',
            'user_msg_title': 'Invalid Request',
            'code': 406,
          },
        });
      }
      return res.status(406).send({
        'api_error': {
          'dev_msg': 'Missing' + paramName+ 'in the request',
          'user_msg': 'Please enter a value for the' + paramName+ '!',
          'user_msg_title': 'Invalid Request',
          'code': 406,
        },
      });
    }
    next();
  } catch (ex) {
    res.status(400).send(ex);
  }
};

async function validateGetRule(req, res, next) {
  try {
    const siteId = req.query.site_id;
    const paramName = ' site_id';
    if (!siteId || siteId.length == 0) {
      return res.status(406).send({
        'api_error': {
          'dev_msg': 'Missing' + paramName+ 'in the request',
          'user_msg': 'Please enter a value for the' + paramName+ '!',
          'user_msg_title': 'Invalid Request',
          'code': 406,
        },
      });
    }
    next();
  } catch (ex) {
    res.status(500).send(ex);
  }
}


async function validateTriggerAction(req, res, next) {
  try {
    const trigger = req.body.business_rule.trigger;
    const action = req.body.business_rule.action;
    let flag = 0;
    let paramName;
    if (!trigger.event_type) {
      flag = 1;
      paramName = ' event_type ';
    }
    if (!trigger.event_name) {
      flag = 1;
      paramName = ' event_name ';
    }
    if (!trigger.event_description) {
      flag = 1;
      paramName = ' event_description ';
    }
    if (!action.event_type) {
      flag = 1;
      paramName = ' event_type ';
    }
    if (!action.event_name) {
      flag = 1;
      paramName = ' event_name ';
    }
    if (!action.event_description) {
      flag = 1;
      paramName = ' event_description ';
    }
    if (flag!=0) {
      return res.status(406).send({
        'api_error': {
          'dev_msg': 'Missing' + paramName+ 'in the request',
          'user_msg': 'Please enter a value for the' + paramName+ '!',
          'user_msg_title': 'Invalid Request',
          'code': 406,
        },
      });
    }
    next();
  } catch (ex) {
    res.status(500).send(ex);
  }
}

async function validateCondition(req, res, next) {
  try {
    const triggerConditions = req.body.business_rule.trigger.conditions;
    const actionConditions = req.body.business_rule.action.conditions;
    const triggerValidator = check(triggerConditions);
    const actionValidator = check(actionConditions);
    if (triggerValidator != 0) {
      return res.status(406).send({
        'api_error': {
          'dev_msg': 'Missing' + triggerValidator+ 'in the request',
          'user_msg': 'Please enter a value for the' + triggerValidator+ '!',
          'user_msg_title': 'Invalid Request',
          'code': 406,
        },
      });
    }
    if (actionValidator != 0) {
      return res.status(406).send({
        'api_error': {
          'dev_msg': 'Missing' + actionValidator+ 'in the request',
          'user_msg': 'Please enter a value for the' + actionValidator+ '!',
          'user_msg_title': 'Invalid Request',
          'code': 406,
        },
      });
    }
    next();
  } catch (ex) {
    res.status(500).send(ex);
  }
}

function check(conditions) {
  if (conditions && conditions.length>0) {
    for (let i= 0; i<conditions.length; i++) {
      if (!conditions[i].name) {
        return ' name ';
      }
      if ( !conditions[i].values) {
        return ' values ';
      }
      if (!conditions[i].operator) {
        return ' operator ';
      }
    }
  }
  return 0;
}


module.exports = {
  validateRule,
  validateGetRule,
  validateTriggerAction,
  validateCondition,
};
