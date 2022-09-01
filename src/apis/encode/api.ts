import { EncodeMessages, IEncodeAPIResults, IEncodeInputs, IEncodeResults } from "./types"
import { store } from "../../app"
import { StatusCodes } from "http-status-codes";


const isValidURL = (URLString: string): Boolean => {
    // Handling validations here but we could consider using https://www.npmjs.com/package/class-validator here.
    try { 
        return Boolean(new URL(URLString)); 
    }
    catch(e){ 
        return false; 
    }
}

export const encode = async (requestParams: IEncodeInputs): Promise<IEncodeAPIResults> => {
    let status;

    const results: IEncodeResults = {
        rawURL: requestParams.rawURL,
        message: EncodeMessages.MALFORMED
    }

    try{
        if (!isValidURL(requestParams.rawURL)){
            status = StatusCodes.BAD_REQUEST
    
        }else{
            const hash = await store.getHash(requestParams.rawURL)
            await store.put(requestParams.rawURL, hash)
            results.message = EncodeMessages.SUCCESS
            results.encodedURL = hash
            status = StatusCodes.ACCEPTED
        }
    }catch(error){
        console.error(`Encode error: ${error}`)
        results.message = EncodeMessages.CONFLICT
        status = StatusCodes.CONFLICT
    }

    const APIResults : IEncodeAPIResults = {
        status: status,
        results: results
    }

    return APIResults
}