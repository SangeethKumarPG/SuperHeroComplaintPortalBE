require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./DB/connection");

const complaintRouter = require("./routers/complaintRouter");
const userRouter = require('./routers/userRoutes');


const app = express();
app.use(cors());
app.use(express.json());
app.use(complaintRouter);
app.use(userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
