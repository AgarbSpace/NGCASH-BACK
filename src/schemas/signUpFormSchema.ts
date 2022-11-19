import joi from 'joi';

const signUpFormSchema = joi.object({
  username: joi.string().min(3).required(),
  password: joi.string().regex(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).required(),
});

export default signUpFormSchema;
