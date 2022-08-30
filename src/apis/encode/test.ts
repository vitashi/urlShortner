import request from "supertest";
import { app } from "../../app";
import { IEncodeInputs, IEncodeResults } from "./types";
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
});

describe("Encoding happy cases", () => {

    it("API call with correct URL parameters are accepted and correct HTTP status code returned ",  async () => {
        const encodeRequestBody: IEncodeInputs = {
            rawURL: "http://somerandomurl.com"
        }
        const response = await request(app).post('/encode').send(encodeRequestBody)
        expect(response.statusCode).toEqual(StatusCodes.ACCEPTED);
    });

    it("API call with correct URL parameters are accepted and correct HTTP status code returned ",  async () => {
        const encodeRequestBody: IEncodeInputs = {
            rawURL: "http://somerandomurl.com"
        }
        const response = await request(app).post('/encode').send(encodeRequestBody)
        expect(response.statusCode).toEqual(StatusCodes.ACCEPTED);
        expect(response.body).toMatchObject<IEncodeResults>({rawURL: encodeRequestBody.rawURL, encodedURL: ""})
    });
});