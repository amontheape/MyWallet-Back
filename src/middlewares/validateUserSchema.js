import userSchema from '../schemas/userSchema.js'

export default function validateUserSchema(req, res, next) {
  const validation = userSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(422).send(validation.error.details.map( ( { message } ) => message));
  }

  next();
}