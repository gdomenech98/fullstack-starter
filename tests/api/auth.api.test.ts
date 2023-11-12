import { API } from 'sixedge'

describe.skip('Test user authentication backend calls', () => { // Skip infra tests, just enabled it for better developing experience
    describe("login", () => {
        test("login success", async () => {
            const email = "lol@lol.lol"
            const password = "1234"
            try {
                const response = await API("/api/v1/auth/login", "POST", { email, password })
                expect(response.user.id).toBe(email)
                expect(response.user.type).toBe('user')
                expect(response.logged).toBe(true)
                expect(response.hasOwnProperty("token")).toBeTruthy()
            } catch (e) { }
        })
        test("login failed: no email", async () => {
            const password = "654321"
            try {
                const response = await API("/api/v1/auth/login", "POST", { password })
            } catch (e) {
                const error = JSON.parse(e.message);
                expect(error.statusCode).toBe(501)
            }
        })
        test("login failed: no password", async () => {
            const email = "lol@lol.lol"
            try {
                const response = await API("/api/v1/auth/login", "POST", { email })
            } catch (e) {
                const error = JSON.parse(e.message);
                expect(error.statusCode).toBe(501)
            }
        })
        test("login failed: wrong password", async () => {
            const email = "lol@lol.lol"
            const password = "wrongpassword"
            try {
                const response = await API("/api/v1/auth/login", "POST", { email, password })
            } catch (e) {
                const failResponse = JSON.parse(e.message);
                expect(failResponse.status).toBe("rejected")
                expect(failResponse.statusCode).toBe(501)
            }
        })
        test("login failed: No found email", async () => {
            const email = "thisuser@doesnt.exist"
            const password = "654321"
            try {
                const response = await API("/api/v1/auth/login", "POST", { email, password })
            } catch (e) {
                const failResponse = JSON.parse(e.message);
                expect(failResponse.status).toBe("rejected")
                expect(failResponse.statusCode).toBe(404)
                expect(failResponse.statusText).toBe("Not Found")
            }
        })
    })
    describe("register", () => {
        test("register success", async () => {
            try {
                const email = "lol@lol.lol"
                const password = "1234"
                const response = await API("/api/v1/auth/register", "POST", { email, password })
                expect(response.user.id).toBe(email)
                expect(response.user.type).toBe('user')
                expect(response.logged).toBe(true)
                expect(response.hasOwnProperty("token")).toBeTruthy()
            } catch (e) {
                const error = JSON.parse(e.message)
                expect(error.statusCode).toBe(409) // Email already exists, duplicated key
            }
        }, 10000)
        test("register failed (no password)", async () => {
            try {
                const email = "lol@lol.lol"
                const res = await API("/api/v1/auth/register", "POST", { email })
            } catch (e) {
                const err = JSON.parse(e.message)
                expect(err.statusCode).toBe(501)
            }
        }, 10000)
        test("register failed (no email)", async () => {
            try {
                const password = "1234"
                const res = await API("/api/v1/auth/register", "POST", { password })
            } catch (e) {
                const err = JSON.parse(e.message)
                expect(err.statusCode).toBe(501)
            }
        }, 10000)
    })
});