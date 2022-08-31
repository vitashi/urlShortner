import { IEncodeInputs } from "./types"
import { store } from "../../app"

export const encode = async (encodeParams: IEncodeInputs): Promise<string> => {
    const hash = await store.getHash(encodeParams.rawURL)
    await store.put(encodeParams.rawURL, hash)
    return hash
}