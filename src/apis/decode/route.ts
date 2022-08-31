import express from "express";
import { decode } from "./api"
import { DecodeMessages, IDecodeInputs, IDecodeResults } from "./types"
import { StatusCodes } from 'http-status-codes';

export const route = express.Router()

route.get('/:encodedString', async (req: express.Request, res: express.Response): Promise<void> => {
    
    const encodedString = req.params.encodedString

    const results: IDecodeResults = {
        encodedURL: encodedString,
        message: DecodeMessages.MALFORMED
    }

    if (!encodedString){
        res.status(StatusCodes.BAD_REQUEST)

    }else{
        const requestParams : IDecodeInputs = {
            encodedString: encodedString
        }
        const response = await decode(requestParams)
        if (response !== undefined){
            results.message = DecodeMessages.SUCCESS
            results.url = response
            res.status(StatusCodes.OK)

        }else{
            results.message = DecodeMessages.NOTFOUND
            res.status(StatusCodes.NOT_FOUND)
        }
    }
    res.json(results)
})