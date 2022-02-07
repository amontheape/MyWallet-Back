import entrySchema from '../schemas/entrySchema.js'

export default function validateEntrySchema(req, res, next) {
  const validation = entrySchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(422).send(validation.error.details.map(({ message }) => message));
  }

  next();
}