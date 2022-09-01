import { StatusCodes } from "http-status-codes";

export interface IAPIResults {
    status: StatusCodes
    results: any
  }