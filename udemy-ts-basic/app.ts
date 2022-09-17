import express from "express";
import todosRounter from "./routes/todos";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(todosRounter);

app.listen(3000, () => {
  console.log(`PORT : 3000`);
});
