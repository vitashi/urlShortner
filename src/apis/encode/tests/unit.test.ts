/**
 * Tests for Encoding logic
 * 
 * @group unit
 */

import { EncodeMessages, IEncodeAPIResults } from "../types";
import {StatusCodes} from 'http-status-codes';
import { encode } from "../api";
import { store } from "../../../app";


 describe("encode api method", () => {

    it("returns a SUCCESS response object for a well formed url", async () => {
        const rawURL = "http://localhost/someurl"
        const hash = "hash"
        jest.spyOn(store, "getHash").mockResolvedValue(hash)
        jest.spyOn(store, "put").mockResolvedValue(true)
        const response = await encode({rawURL: rawURL})
        expect(response).toMatchObject<IEncodeAPIResults>({status: StatusCodes.ACCEPTED, results: {message: EncodeMessages.SUCCESS, encodedURL: hash, rawURL: rawURL}})
    });

    it("returns a MALFORMED response object for an incorrect url", async () => {
        const rawURL = "malformedurl";
        const response = await encode({rawURL: rawURL});
        expect(response).toMatchObject<IEncodeAPIResults>({status: StatusCodes.BAD_REQUEST, results: {message: EncodeMessages.MALFORMED, rawURL: rawURL}})
    });

    it("returns a CONFLICT response object for duplicate request", async () => {
        const rawURL = "http://localhost/someurl"
        const hash = "hash"
        jest.spyOn(store, "getHash").mockResolvedValue(hash)
        jest.spyOn(store, "put").mockRejectedValue(new Error("error raised during put"))
        const response = await encode({rawURL: rawURL});
        expect(response).toMatchObject<IEncodeAPIResults>({status: StatusCodes.CONFLICT, results: {message: EncodeMessages.CONFLICT, rawURL: rawURL}})
    });

})