const Joi = require('joi');

const schema = Joi.object({
    type: Joi.string().valid('error', 'info', 'warning'),
    priority: Joi.string().valid('lowest', 'low', 'medium', 'high', 'highest'),
    path: Joi.string(),
    message: Joi.string(),
    request: Joi.object(),
	response: Joi.object()
});

module.exports = schema;