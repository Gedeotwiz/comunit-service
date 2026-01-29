/** @format */

import Joi from 'joi';

export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'email is required',
    'string.email': 'email must be a valid email',
    'string.base': 'email should be a type of string',
    'string.empty': 'email is not allowed to be empty field',
  }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .messages({
      'string.base': 'password should be a type of text',  
      'string.empty': 'password can not be empty',
      'string.min': 'password should have minimum length of 8',
      'string.pattern':
        'password must contain atleast one uppercase letter,one lowercase letter one number, one special character',
      'any.required': 'password is required',
    }),
});
