import express from "express";
import encodeRoute from "./apis/encode/route";
import decodeRoute from "./apis/decode/route";
import  bodyParser from "body-parser";
import { HashTable } from "./store/hashTable";
import morgan from "morgan";
import swaggerSpec from "./swagger-spec";

const swaggerUi = require("swagger-ui-express");

export const app = express();
export const store = new HashTable()
  
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API Routes
app.use("/encode", encodeRoute)
app.use("/decode", decodeRoute)
