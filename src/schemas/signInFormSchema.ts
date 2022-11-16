import joi from 'joi';

const signInFormSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

export default signInFormSchema;
