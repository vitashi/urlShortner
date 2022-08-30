import express from "express";
import { encode } from "./api"
import { IEncodeInputs } from "./types"
import { StatusCodes } from 'http-status-codes';

export const route = express.Router()

const isValidURL = (URLString: string): Boolean => {
    // Handling validations here but we could consider using https://www.npmjs.com/package/class-validator here.
    try { 
        return Boolean(new URL(URLString)); 
    }
    catch(e){ 
        return false; 
    }
}

route.post('/', async (req: express.Request, res: express.Response): Promise<void> => {
    
    const URLString = req.body.rawURL

    if (!isValidURL(URLString)){
        res.status(StatusCodes.BAD_REQUEST).send()

    }else{
        const requestParams : IEncodeInputs = {
            rawURL: URLString
        }
        const response = await encode(requestParams)
        res.status(StatusCodes.ACCEPTED).json(response)
    }
})