require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 7000;
const router = require("./router/auth-router");
const connectDB = require("./utils/db");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET , POST , PUT , PATCH , DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/route/", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Is Running At Port ${PORT}`);
  });
});