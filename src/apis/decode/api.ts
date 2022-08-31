import { IDecodeInputs } from "./types"
import { store } from "../../app"

export const decode = async (decodeParams: IDecodeInputs): Promise<string | undefined> => {
    return await store.get(decodeParams.encodedString)
}