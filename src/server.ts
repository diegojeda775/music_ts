import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import song from "./routes/song";
import artist from "./routes/artist";
import user from "./routes/user";

dotenv.config({ path: "./src/config/config.env" });

connectDB();

const app = express();

app.use(bodyParser.json());

app.use("/song", song);
app.use("/user", user);
app.use("/artist", artist);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
