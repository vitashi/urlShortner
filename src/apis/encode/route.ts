import express from "express";
import { encode } from "./api"
import { IEncodeAPIResults } from "./types"

export const route = express.Router()

route.post('/', async (req: express.Request, res: express.Response): Promise<void> => {
    const response: IEncodeAPIResults = await encode({rawURL: req.body.rawURL})
    res.status(response.status).json(response.results)
})