import express from "express";
import { decode } from "./api"
import { IDecodeAPIResults } from "./types";

export const route = express.Router()

route.get('/:encodedString', async (req: express.Request, res: express.Response): Promise<void> => {
    const response: IDecodeAPIResults = await decode({encodedString: req.params.encodedString})
    res.status(response.status).json(response.results)
})