import { IAPIResults } from "../types";

export interface IEncodeInputs {
  rawURL: string;
}

export enum EncodeMessages {
  CONFLICT = "CONFLICT",
  MALFORMED = "MALFORMED URL",
  SUCCESS = "SHORTENING SUCCESSFUL"
}

export interface IEncodeResults {
  encodedURL?: string;
  rawURL: string;
  message: EncodeMessages;
}

export interface IEncodeAPIResults extends IAPIResults{
  results: IEncodeResults
}
