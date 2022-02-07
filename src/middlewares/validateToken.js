import db from "../database.js";

export default async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(401);
  }

  const session = await db.collection("sessions").findOne({token});
  if (!session) {
    return res.sendStatus(401);
  }

  const user = await db.collection("users-db").findOne({ _id: session.userId});
  if (!user) {
    return res.sendStatus(401);
  }

  res.locals.session = session;
  next();
}