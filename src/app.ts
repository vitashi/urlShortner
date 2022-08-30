import express from "express";
import { route as encodeRoute } from "./apis/encode/route";
import  bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/encode", encodeRoute)
