import dayjs from "dayjs";
import db from '../database.js';

export async function handleEntry(req, res) {
  const entry = req.body;
  const { session } = res.locals;
  
  try {
    await db.collection("entries-db").insertOne({
      ...entry,
      date: dayjs().format("DD/MM"),
      userId: session.userId
    })
    
    res.sendStatus(201);
  } catch(err) {
    res.status(500).send(err);
  }
}

export async function getHistory(req, res) {
  let balance = 0.00;
  const { session } = res.locals;

  try {
    const history = await db.collection("entries-db").find({userId: session.userId}).toArray();

    history.forEach( entry => {
      delete entry.userId;

      if (entry.type === 'income') {
        balance += parseFloat(entry.price);
      } else {
        balance -= parseFloat(entry.price);
      }
    })

    balance = balance.toFixed(2).replace('.', ',');

    res.status(200).send({history, balance});
  } catch(err) {
    res.status(500).send(err);
  }
}