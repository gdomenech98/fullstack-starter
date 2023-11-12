import { crypt, validate } from 'sixedge'

describe('Test cryptographic methods', () => {
    test("Test cypher method", async () => {
        const hash = await crypt("hello my friend")
        expect(typeof hash).toBe("string")
    })
    test("Test validate method", async () => {
        try {
            const data = "hello my friend"
            const hash = await crypt(data)
            const isValid = await validate(data, hash)
            expect(isValid).toBe(true)
        } catch (e) { }
        // Fail validation
        try {
            const hash = await crypt("1234")
            await validate("4321", hash)
        } catch (e) {
            expect(e).toBe("Unauthorized password and hash doesn't match")
         }
    })
});