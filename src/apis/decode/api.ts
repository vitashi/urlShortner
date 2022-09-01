import { DecodeMessages, IDecodeInputs, IDecodeResults, IDecodeAPIResults } from "./types"
import { store } from "../../app"
import { StatusCodes } from "http-status-codes"

export const decode = async (requestParams: IDecodeInputs): Promise<IDecodeAPIResults> => {
    let status;

    const encodedString = requestParams.encodedString

    const results: IDecodeResults = {
        encodedURL: encodedString,
        message: DecodeMessages.MALFORMED
    }

    if (!encodedString){
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