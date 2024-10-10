import express from "express";
import cors from "cors";
import indexRouter from "./routes/indexRouter";
import morgan from "morgan";

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

server.use(indexRouter);

export default server;
