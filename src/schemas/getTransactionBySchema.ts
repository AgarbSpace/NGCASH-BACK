import joi from 'joi';

const getTransactionsBySchema = joi.object({
  date: joi.date(),
  cashIn: joi.boolean(),
  cashOut: joi.boolean(),
});

export default getTransactionsBySchema;
