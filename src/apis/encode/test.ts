import request from "supertest";
import { app } from "../../app";
import { EncodeMessages, IEncodeInputs, IEncodeResults } from "./types";
import {StatusCodes} from 'http-status-codes';

describe("Encoding error cases", () => {

    it("API call with no body is rejected",  async () => {
        const response = await request(app).post('/encode').send()
        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });

    it("API call with empty body is rejected",  async () => {
        const response = await request(app).post('/encode').send({})
        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
    it("API call with malformed url receives the correct response object",  async () => {
        const response = await request(app).post('/encode').send({})
        expect(response.body).toMatchObject({message: EncodeMessages.MALFORMED})
    });
    it("calling API multiple times with same url receives the correct response object",  async () => {
        const encodeRequestBody: IEncodeInputs = {
            rawURL: "http://somerandomurl.com"
        }
        await request(app).post('/encode').send(encodeRequestBody)
        setTimeout(()=>{}, 0)
        const response = await request(app).post('/encode').send(encodeRequestBody)
        expect(response.body).toMatchObject({message: EncodeMessages.CONFLICT})
    });

    it("API call with correct URL parameters are accepted and correct HTTP status code returned ",  async () => {
        const encodeRequestBody: IEncodeInputs = {
            rawURL: "http://somerandomurl1.com"
        }
        const response = await request(app).post('/encode').send(encodeRequestBody)
        expect(response.statusCode).toEqual(StatusCodes.ACCEPTED);
    });

    it("API call with correct URL parameters are accepted and correct response object returned ",  async () => {
        const encodeRequestBody: IEncodeInputs = {
            rawURL: "http://somerandomurl2.com"
        }
        const response = await request(app).post('/encode').send(encodeRequestBody)
        expect(response.statusCode).toEqual(StatusCodes.ACCEPTED);
        expect(response.body).toMatchObject<IEncodeResults>({rawURL: encodeRequestBody.rawURL, encodedURL: "kS59QzabtIO", message: EncodeMessages.SUCCESS})
    });
});