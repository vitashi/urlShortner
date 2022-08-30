import { IEncodeInputs, IEncodeResults } from "./types"

export const encode = async (encodeParams: IEncodeInputs): Promise<IEncodeResults> => {
    const results: IEncodeResults = {
        encodedURL: "",
        rawURL: encodeParams.rawURL,
    }
    return results
}