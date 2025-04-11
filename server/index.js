const express = require("express");
const app = express();
const cors = require("cors");

const taskRouter = require("./Routes/TaskRoutes");

const connectDb = require("./config/db");
connectDb();

app.listen(8001, () => {
  console.log("connected to the server at port 8001");
});

app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRouter);

app.use("/", (req, res) => {
  res.json({ message: "Hello from the express server" });
});
