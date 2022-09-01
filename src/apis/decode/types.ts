import { IAPIResults } from "../types";

export interface IDecodeInputs {
  encodedString: string;
}

export enum DecodeMessages {
  MALFORMED = "MALFORMED REQUEST",
  SUCCESS = "DECODED SUCCESSFUL",
  NOTFOUND = "ENTRY NOT FOUND"
}

export interface IDecodeResults{
  encodedURL: string;
  url?: string;
  message: DecodeMessages;
}

export interface IDecodeAPIResults extends IAPIResults{
  results: IDecodeResults
}
