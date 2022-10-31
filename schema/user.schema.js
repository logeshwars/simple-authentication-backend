import Joi from 'joi';
const userSchema = Joi.object({
	userName: Joi.string().min(3).max(30).required().messages({
		'string.base': "Name should be text",
		'string.empty': "Name cannot be an emspty field",
		'any.required': "Name is a required field",
	}),

	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

	confirmPassword: Joi.ref('password'),
	dob: Joi.required(),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ['com', 'net'] },
	}),
});

export default userSchema;
