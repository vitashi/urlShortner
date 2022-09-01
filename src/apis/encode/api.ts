/**
 * encode api module
 * @module api
 */

import { EncodeMessages, IEncodeAPIResults, IEncodeInputs, IEncodeResults } from "./types"
import { store } from "../../app"
import { StatusCodes } from "http-status-codes";

/**
 * function to check if a URL is valid or not. It tries to create a standard URL object from the string passed it but we could consider using https://www.npmjs.com/package/class-validator later.
 * @function isValidURL
 * @param {string} URLString - The url to be validated
 * @returns {boolean} - true if valid and false if not
 */
const isValidURL = (URLString: string): boolean => {
    try { 
        return Boolean(new URL(URLString)); 
    }
    catch(e){ 
        return false; 
    }
}

/**
 * function to  encode a url string
 * @async
 * @function encode
 * @param {IEncodeInputs} requestParams - request parameters from the api call
 * @returns {Promise<IEncodeAPIResults>} - A response object with status and result keys
 */
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