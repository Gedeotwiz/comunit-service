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
    .max(10)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .messages({
      'string.base': 'password should be a type of text',  
      'string.empty': 'password can not be empty',
      'string.min': 'password should have minimum length of 8',
      'string.max':'password is less than or equal to ten character',
      'string.pattern':
        'password must contain atleast one uppercase letter,one lowercase letter one number, one special character',
      'any.required': 'password is required',
    }),
});

export const signupSchema = Joi.object({
    names:Joi.string()
    .required()
    .messages({
        'string.base':'names must be string',
        'string.empty':'names can not be empty',
        'any.required':'names is required'
    }),
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
    role:Joi.string()
      .valid("client","provider","admin")
      .messages({
        'string.base': 'role should be a type of text',
        'any.only':'role must be contain in the following "client","provider","admin"'
      })
})

export const createCategorySchema = Joi.object({
    categoryName:Joi.string().required().valid("Plumbing","Painting","Pharmacy","Applications services","Electronics")
    .messages({
        'string.base':'categoryName must be string',
        'string.empty':'categoryName can not be empty',
        'any.required':'categoryName is required',
         'any.only':'categoryName must be one in this "Plumbing","Painting","Pharmacy","Applications services","Electronics"'
    })
})