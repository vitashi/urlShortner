/**
 * Tests for Decoding logic
 * 
 * @group unit
 */

 import { DecodeMessages, IDecodeAPIResults } from "../types";
 import {StatusCodes} from 'http-status-codes';
import { decode } from "../api";
import { store } from "../../../app";


 describe("decode api method", () => {

    it("non existant encoded string returns the NOT_FOUND API response object", async () => {
        const encodedURL = "randomurlHASH"
        jest.spyOn(store, "get").mockResolvedValue(undefined)
        const response = await decode({encodedString: encodedURL})
        expect(response).toMatchObject<IDecodeAPIResults>({status: StatusCodes.NOT_FOUND, results: {message: DecodeMessages.NOTFOUND, encodedURL: encodedURL}})
    })

    it("An existing encoded string returns the SUCCESS API response object", async () => {
        const url = "somerandomeurl"
        const encodedURL = "randomurlHASH"
        jest.spyOn(store, "get").mockResolvedValue(url)
        const response = await decode({encodedString: encodedURL})
        expect(response).toMatchObject<IDecodeAPIResults>({status: StatusCodes.OK, results: {message: DecodeMessages.SUCCESS, encodedURL: encodedURL, url: url}})
    })
})