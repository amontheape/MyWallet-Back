import joi from 'joi';

const entrySchema = joi.object({
  price: joi.number().required(),
  description: joi.string().required(),
  type: joi.string().valid('income', 'expense')
});

export default entrySchema;