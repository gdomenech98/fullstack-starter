import { jwtSign, jwtVerify } from 'sixedge';

const JWT_SECRET = "secret1234"
describe('Test JWT', () => {
    describe("Test sign", () => {
        test('jwt sign', () => {
            const data = {
                email: "lol@lol.lol",
                id: 123,
            }
            const token = jwtSign(data, JWT_SECRET)
            expect(typeof token).toBe("string")
        });
    })
    describe("Test verify", () => {
        test('jwt verify', () => {
            const data = {
                email: "lol@lol.lol",
                id: 123,
            }
            const token = jwtSign(data, JWT_SECRET)
            const verifiedTokenData = jwtVerify(token, JWT_SECRET);
            const { exp, iat, ...verifiedData } = verifiedTokenData
            expect(verifiedData).toStrictEqual(data);
        })
        test('jwt verify error: no token', () => {
            const token = undefined;
            try {
                jwtVerify(token, JWT_SECRET);
            } catch (e) {
                expect(e).toBe("Token must be provided.");
            }
        })
        test('jwt verify error: unauthorized', () => {
            const data = {
                email: "lol@lol.lol",
                id: 123,
            }
            const token = jwtSign(data, JWT_SECRET)
            const WRONG_JWT_SECRET = "1234"
            try {
                jwtVerify(token, WRONG_JWT_SECRET);
            } catch (e) {
                expect(e).toBe("Unauthorized token.")
            }
        })
    })
});