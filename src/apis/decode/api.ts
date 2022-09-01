/**
 * decode api module
 * @module api
 */

import { DecodeMessages, IDecodeInputs, IDecodeResults, IDecodeAPIResults } from "./types"
import { store } from "../../app"
import { StatusCodes } from "http-status-codes"

/**
 * function to  decode a url string
 * @async
 * @function decode
 * @param {IDecodeInputs} requestParams - request parameters from the api call
 * @returns {Promise<IDecodeAPIResults>} - A response object with status and result keys
 */
export const decode = async (requestParams: IDecodeInputs): Promise<IDecodeAPIResults> => {
    let status;

    const results: IDecodeResults = {
        encodedURL: requestParams.encodedString,
        message: DecodeMessages.MALFORMED
    }

    if (!requestParams.encodedString){
        status = StatusCodes.BAD_REQUEST

    }else{
        const response = await store.get(requestParams.encodedString)
        if (response !== undefined){
            results.message = DecodeMessages.SUCCESS
            results.url = response
            status = StatusCodes.OK

        }else{
            results.message = DecodeMessages.NOTFOUND
            status = StatusCodes.NOT_FOUND
        }
    }

    const APIResults: IDecodeAPIResults = {
        status: status,
        results: results
    }

    return APIResults
}