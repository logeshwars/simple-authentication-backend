import Joi from "joi";
const userSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.base": `"Name" should be a type of 'text'`,
    "string.empty": `"Name" cannot be an empty field`,
    "any.required": `"Name" is a required field`,
  }),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  confirm_password: Joi.ref("password"),
  dob: Joi.required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

export default userSchema;
