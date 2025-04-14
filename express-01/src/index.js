import "dotenv/config";
import cors from "cors";
import express from "express";

const app = express();

// middlewares
app.use(cors());

// handlers
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
