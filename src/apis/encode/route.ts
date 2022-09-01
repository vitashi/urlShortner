/**
 * Encode route module
 * @module route
 */

import express from "express";
import { encode } from "./api"
import { IEncodeAPIResults } from "./types"

const route = express.Router()

/**
 * function that handle the encode API call and sends the result back using response object
 * @async
 * @function processEncoding
 * @param {express.Request} req - Express's request object
 * @param {express.Response} res - Express's response object
 * @returns {Promise<void>} - returns void
 */
const processEncoding = async (req: express.Request, res: express.Response): Promise<void> => {
    const response: IEncodeAPIResults = await encode({rawURL: req.body.rawURL})
    res.status(response.status).json(response.results)
}

route.post('/', processEncoding)

export default route