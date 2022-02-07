import bcrypt from 'bcrypt';
import db from "../database.js";
import { v4 as uuid } from 'uuid';

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const participant = await db.collection("users-db").findOne( { email: email } );

    if ( participant && bcrypt.compareSync( password, participant.password)) {
      const session = await db.collection("sessions").findOne( {userId: participant._id});

      if (!session) {
        const token = uuid();

        await db.collection("sessions").insertOne({
          userId: participant._id,
          token
        })

         res.status(200).send({
          name: participant.name,
          token
        })
      } else {
        res.status(200).send({
          name: participant.name,
          token: session.token
        })
      }
    } else {
      res.status(401).send("user does not exists");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}