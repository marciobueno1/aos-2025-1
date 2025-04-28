import "dotenv/config";
import cors from "cors";
import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(
    `Method: ${req.method} - URI: ${req.url} - `,
    `BODY: ${JSON.stringify(req.body)}`
  );
  next();
});
app.use((req, res, next) => {
  // simulando que está recebendo um token válido do usuário id 1
  req.me = users[1];
  next();
});
// data
let users = {
  1: {
    id: "1",
    username: "Robin Wieruch",
  },
  2: {
    id: "2",
    username: "Dave Davids",
  },
};

let messages = {
  1: {
    id: "1",
    text: "Hello World",
    userId: "1",
  },
  2: {
    id: "2",
    text: "By World",
    userId: "2",
  },
};

// handlers
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/session", (req, res) => {
  return res.send(users[req.me.id]);
});

app.get("/", (req, res) => {
  return res.send("Received a GET HTTP method");
});

app.post("/", (req, res) => {
  return res.send("Received a POST HTTP method");
});

app.put("/", (req, res) => {
  return res.send("Received a PUT HTTP method");
});

app.delete("/", (req, res) => {
  return res.send("Received a DELETE HTTP method");
});

app.get("/users", (req, res) => {
  return res.send(Object.values(users));
});

app.get("/users/:userId", (req, res) => {
  return res.send(users[req.params.userId]);
});

app.post("/users", (req, res) => {
  return res.send("POST HTTP method on user resource");
});

app.put("/users/:userId", (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete("/users/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

// messages
app.get("/messages", (req, res) => {
  return res.send(Object.values(messages));
});

app.get("/messages/:messageId", (req, res) => {
  return res.send(messages[req.params.messageId]);
});

app.post("/messages", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };

  messages[id] = message;

  return res.send(message);
});

app.delete("/messages/:messageId", (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } = messages;
  messages = otherMessages;
  return res.send(message);
});

// Outro código para realizar a remoção do objeto
// app.delete("/messages/:messageId", (req, res) => {
//   const message = messages[req.params.messageId];
//   delete messages[req.params.messageId];
//   return res.send(message);
// });

const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
