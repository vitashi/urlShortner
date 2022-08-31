import express from "express";
import { route as encodeRoute } from "./apis/encode/route";
import { route as decodeRoute } from "./apis/decode/route";
import  bodyParser from "body-parser";
import { HashTable } from "./store/hashTable";

export const app = express();
export const store = new HashTable()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API Routes
app.use("/encode", encodeRoute)
app.use("/decode", decodeRoute)
