import joi from 'joi';

const transactionFormSchema = joi.object({
  value: joi.number().required(),
  username: joi.string().min(3).required(),
});

export default transactionFormSchema;
