import express, {json} from "express";

const app = express();
app.use(json());

app.listen(5000, () => {
  console.log('Server is listening on port 5000.');
});