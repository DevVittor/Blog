import express from "express";
const app = express();
import { createServer } from "node:http";
const serverHTTP = createServer(app);
import dotenv from "dotenv";
dotenv.config();
import path from "node:path";
import fs from "node:fs";
import compression from "compression";
import morgan from "morgan";
import { cookieParser } from "@tinyhttp/cookie-parser";
import cors from "cors";
import { conn } from "../database/conn.js";
import router from "../routes/v1/index.js";
import { registerAdmin } from "../utils/registerAdmin.js";
const logPath = path.join("src", "logs", "access.log");
const accessLogs = fs.createWriteStream(logPath, { flags: "a" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms", {
    stream: accessLogs,
  })
);
app.use(
  cors({
    origin: process.env.FRONT_URL,
    //origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);
app.disable("x-powered-by");

app.use("/api/v1/", (req, _, next) => {
  console.log(`Path: ${req.path} | Method: ${req.method}`);
  next();
});

app.use("/api/v1/", router);

const port = process.env.PORT || process.env.PORT_ALTERNATIVE;

serverHTTP.listen(port, async () => {
  try {
    console.log(`Servindo rodando na porta ${port}...`);
    await conn();
    await registerAdmin();
  } catch (error) {
    console.log(
      `Não foi possível iniciar o servidor na porta ${port}. Error: ${error.message}`
    );
  }
});
