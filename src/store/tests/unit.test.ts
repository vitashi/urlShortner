/**
 * Tests for Encode API
 * 
 * @group unit
 */

import { HashTable } from "../hashTable";

describe("Store APIs", () => {

    it("hashing medium length url returns correct hash string",  async () => {
        const hashTable = new HashTable()
        expect(await hashTable.getHash("https://iq.opengenus.org/hash-functions-examples/")).toEqual("ibNytooCty");
    });

    it("hashing a string multiple times produces the same hash",  async () => {
        const hashTable = new HashTable()
        const hash = await hashTable.getHash("https://iq.opengenus.org/hash-functions-examples/")
        expect(await hashTable.getHash("https://iq.opengenus.org/hash-functions-examples/")).toEqual(hash);
        expect(await hashTable.getHash("https://iq.opengenus.org/hash-functions-examples/")).toEqual(hash);
        expect(await hashTable.getHash("https://iq.opengenus.org/hash-functions-examples/")).toEqual(hash);
    });

    it("removing or adding any character from the string produces different hashes",  async () => {
        const hashTable = new HashTable()
        const url = "https://iq.opengenus.org/hash-functions-examples/"
        const hash = await hashTable.getHash(url)
        expect(await hashTable.getHash(url.slice(0, -1))).not.toEqual(hash)
        expect(await hashTable.getHash(`${url} `)).not.toEqual(hash);
    });

    it("hashing very long length url returns correct hash string",  async () => {
        const hashTable = new HashTable()
        const url = "https://www.google.com/search?as_q=you+have+to+write+a+really+really+long+search+to+get+to+2000+characters.+like+seriously%2C+you+have+no+idea+how+long+it+has+to+be&as_epq=2000+characters+is+absolutely+freaking+enormous.+You+can+fit+sooooooooooooooooooooooooooooooooo+much+data+into+2000+characters.+My+hands+are+getting+tired+typing+this+many+characters.+I+didn%27t+even+realise+how+long+it+was+going+to+take+to+type+them+all.&as_oq=Argh!+So+many+characters.+I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.+I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.I%27m+bored+now%2C+so+I%27ll+just+copy+and+paste.&as_eq=It+has+to+be+freaking+enormously+freaking+enormous&as_nlo=123&as_nhi=456&lr=lang_hu&cr=countryAD&as_qdr=m&as_sitesearch=stackoverflow.com&as_occt=title&safe=active&tbs=rl%3A1%2Crls%3A0&as_filetype=xls&as_rights=(cc_publicdomain%7Ccc_attribute%7Ccc_sharealike%7Ccc_nonderived).-(cc_noncommercial)&gws_rd=ssl"
        expect(await hashTable.getHash(url)).toEqual("cGmG4k2NQO8");
    });

    it("check adding a value to the store returns true", async () => {
        const hashTable = new HashTable()
        const url = "https://iq.opengenus.org/hash-functions-examples/"
        const hash = await hashTable.getHash(url)
        expect(await hashTable.put(url, hash)).toBeTruthy()
    });

    it("An error is thrown when a collision is detected", async () => {
        const hashTable = new HashTable()
        await hashTable.put("url", "hash")
        await expect(hashTable.put("url", "hash")).rejects.toThrow("Collision detected. An attempt to overwrite hash was rejected")
    });

    it("check that get with a stored hash retrieves the non-hash value", async () => {
        const hashTable = new HashTable()
        const url = "https://iq.opengenus.org/hash-functions-examples/"
        const hash = await hashTable.getHash(url)
        await hashTable.put(url, hash)
        expect(await hashTable.get(hash)).toEqual(url)
    });

    it("check that get with a non stored hash returns null ", async () => {
        const hashTable = new HashTable()
        const hash = "hashValueNotStored"
        expect(await hashTable.get(hash)).toBeUndefined()
    });
});