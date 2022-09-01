/**
 * Tests for Decode API
 * 
 * @group integration
 */

import request from "supertest";
import { app } from "../../../app";
import { DecodeMessages, IDecodeInputs, IDecodeResults } from "../types";
import {StatusCodes} from 'http-status-codes';
import { IEncodeInputs } from "../../encode/types";

describe("Decoding", () => {

    let encoding = ""
    const url = "http://somerandomurl2.com"

    beforeAll(async ()=>{
        const encodeRequestBody: IEncodeInputs = {
            rawURL: url
        }
        const response = await request(app).post('/encode').send(encodeRequestBody)
        encoding = response.body.encodedURL
    })
    

    it("API call with no request params is rejected",  async () => {
        const response = await request(app).get('/decode/')
        expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
    });

    it("API call with proper and previously stored encoding returns correct HTTP status code ",  async () => {
        const response = await request(app).get(`/decode/${encoding}`)
        expect(response.statusCode).toEqual(StatusCodes.OK);
    });

    it("API call with proper and previously stored encoding returns correct response object ",  async () => {
        const decodeRequestBody: IDecodeInputs = {
            encodedString: encoding
        }
        const response = await request(app).get(`/decode/${encoding}`)
        expect(response.statusCode).toEqual(StatusCodes.OK);
        expect(response.body).toMatchObject<IDecodeResults>({url: url, encodedURL: encoding, message: DecodeMessages.SUCCESS})
    });

    it("Calling API multiple times with previously stored encoding returns same result",  async () => {
        const decodeRequestBody: IDecodeInputs = {
            encodedString: encoding
        }
        const response1 = await request(app).get(`/decode/${encoding}`)
        const response2 = await request(app).get(`/decode/${encoding}`)
        const response3 = await request(app).get(`/decode/${encoding}`)
        expect(response1.body).toMatchObject<IDecodeResults>({url: url, encodedURL: encoding, message: DecodeMessages.SUCCESS})
        expect(response2.body).toMatchObject<IDecodeResults>({url: url, encodedURL: encoding, message: DecodeMessages.SUCCESS})
        expect(response3.body).toMatchObject<IDecodeResults>({url: url, encodedURL: encoding, message: DecodeMessages.SUCCESS})

    });

    it("Calling API with a non existant encoding returns correct result",  async () => {
        const decodeRequestBody: IDecodeInputs = {
            encodedString: "encoding"
        }
        const response = await request(app).get(`/decode/encoding`)
        expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(response.body).toMatchObject<IDecodeResults>({encodedURL: "encoding", message: DecodeMessages.NOTFOUND})

    });

    it("Calling API multiple times with a non existant encoding returns same result",  async () => {
        const decodeRequestBody: IDecodeInputs = {
            encodedString: "encoding"
        }
        const response1 = await request(app).get(`/decode/encoding`)
        const response2 = await request(app).get(`/decode/encoding`)
        const response3 = await request(app).get(`/decode/encoding`)
        expect(response1.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(response2.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(response3.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(response1.body).toMatchObject<IDecodeResults>({encodedURL: "encoding", message: DecodeMessages.NOTFOUND})
        expect(response2.body).toMatchObject<IDecodeResults>({encodedURL: "encoding", message: DecodeMessages.NOTFOUND})
        expect(response3.body).toMatchObject<IDecodeResults>({encodedURL: "encoding", message: DecodeMessages.NOTFOUND})
    });
});