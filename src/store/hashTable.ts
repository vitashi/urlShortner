import * as base62 from 'base62-ts'

export class HashTable{

    private table: Record<string, string> = {}

    private async getCRCHash(keyString: string): Promise<number>{
        // A modification of the CRC variant of hashing as described in
        // https://iq.opengenus.org/hash-functions-examples/
        let h = 0
        keyString.split("").forEach(character => {
            const highOrder = h & 0xf8000000
            h = h << 5;
            h = h ^ (highOrder >> 27);
            h = h ^ character.charCodeAt(0)
        });
        h = Math.abs(h)
        return parseInt(`${h}${h}`)
    }

    private async getBase62Hash(hashInt: number): Promise<string>{
        return base62.encode(hashInt)
    }

    async getHash(keyString: string): Promise<string>{
        const crcHash = await this.getCRCHash(keyString)
        return this.getBase62Hash(crcHash)
    }

    async put(rawString: string, encodedString: string): Promise<boolean>{
        
        if (this.table.hasOwnProperty(encodedString)){
            throw new Error(`Collision detected. An attempt to overwrite ${encodedString} was rejected`)
        }

        this.table[encodedString] = rawString
        return true
    }

    async get(encodedString: string): Promise<string|undefined>{
        return this.table[encodedString]
    }

}
