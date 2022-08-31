import express from "express";
import { encode } from "./api"
import { EncodeMessages, IEncodeInputs, IEncodeResults } from "./types"
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

    const results: IEncodeResults = {
        rawURL: URLString,
        message: EncodeMessages.MALFORMED
    }

    try{
        if (!isValidURL(URLString)){
            res.status(StatusCodes.BAD_REQUEST)
    
        }else{
            const requestParams : IEncodeInputs = {
                rawURL: URLString
            }
            const response = await encode(requestParams)
            results.message = EncodeMessages.SUCCESS
            results.encodedURL = response
            res.status(StatusCodes.ACCEPTED)
        }
    }catch(error){
        console.error(`Encode error: ${error}`)
        results.message = EncodeMessages.CONFLICT
        res.status(StatusCodes.CONFLICT)
    }

    res.json(results)

    
})