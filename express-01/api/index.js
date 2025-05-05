import "dotenv/config";
import cors from "cors";
import express from "express";

import models from "./models";
import routes from "./routes";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middleware de log
app.use((req, res, next) => {
  console.log(
    `Method: ${req.method} - URI: ${req.url} - `,
    `BODY: ${JSON.stringify(req.body)}`
  );
  next();
});
// middleware adicionando um objeto context ao objeto request (req)
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1], // simulando que está recebendo um token válido do usuário id 1
  };
  next();
});

// rotas
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

app.get("/", (req, res) => {
  return res.send("Hello Express!");
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
