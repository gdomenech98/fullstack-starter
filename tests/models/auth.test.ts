import { Auth } from 'sixedge';

describe('Test Auth model', () => {
    describe("Test validateRegister", () => {
        test('validateRegister shape success', () => {
            const data = {
                identifier: "lol@lol.lol",
                password: "1234",
                repassword: "1234"
            }
            try {
                Auth.validateRegister(data)
                expect(true).toBeTruthy()
            } catch (e) {
                expect(true).toBe(false)
            }
        });
        test('validateRegister shape fail: no password and no repassword', () => {
            const data = {
                identifier: "lol@lol.lol",
            }
            try {
                Auth.validateRegister(data)
                expect(true).toBeFalsy()
            } catch (e) {
                const error1 = JSON.parse(e.message)[0]
                const emsg1 = `Error: "${error1?.code}". Expected "${error1?.expected}" received "${error1?.received}" at "${error1?.path[0]}"`
                expect(emsg1).toBe(`Error: "invalid_type". Expected "string" received "undefined" at "password"`)
            }
        });
        test('validateRegister shape fail: no identifier', () => {
            const data = {
                password: "1234",
                repassword: "1234",
            }
            try {
                Auth.validateRegister(data)
                expect(true).toBeFalsy()
            } catch (e) {
                const error = JSON.parse(e.message)[0]
                const emsg = `Error: "${error?.code}". Expected "${error?.expected}" received "${error?.received}" at "${error?.path[0]}"`
                expect(emsg).toBe(`Error: "invalid_type". Expected "string" received "undefined" at "identifier"`)
            }
        });
        test('validateRegister shape fail: identifier is not type email', () => {
            const data = {
                identifier: "lollol.lol",
                password: "1234",
                repassword: "4321",
            }
            try {
                Auth.validateRegister(data)
                expect(true).toBeFalsy()
            } catch (e) {
                const error = JSON.parse(e.message)[0]
                const emsg = `Error: "${error?.code}". ${error.message} at "${error?.path[0]}"`
                expect(emsg).toBe('Error: "invalid_string". Invalid email at "identifier"')
            }
        });
    });
    describe("Test validateLogin", () => {
        test('validateLogin shape success', () => {
            const data = {
                identifier: "lol@lol.lol",
                password: "1234",
            }
            try {
                Auth.validateLogin(data)
                expect(true).toBeTruthy()
            } catch (e) {
                expect(true).toBe(false)
            }
        });
        test('validateLogin shape fail: no password', () => {
            const data = {
                identifier: "lol@lol.lol",
            }
            try {
                Auth.validateLogin(data)
                expect(true).toBeFalsy()
            } catch (e) {
                const error1 = JSON.parse(e.message)[0]
                const emsg1 = `Error: "${error1?.code}". Expected "${error1?.expected}" received "${error1?.received}" at "${error1?.path[0]}"`
                expect(emsg1).toBe(`Error: "invalid_type". Expected "string" received "undefined" at "password"`)
            }
        });
        test('validateLogin shape fail: no identifier', () => {
            const data = {
                password: "1234"
            }
            try {
                Auth.validateLogin(data)
                expect(true).toBeFalsy()
            } catch (e) {
                const error = JSON.parse(e.message)[0]
                const emsg = `Error: "${error?.code}". Expected "${error?.expected}" received "${error?.received}" at "${error?.path[0]}"`
                expect(emsg).toBe(`Error: "invalid_type". Expected "string" received "undefined" at "identifier"`)
            }
        });
        test('validateLogin shape fail: identifier is not type email', () => {
            const data = {
                identifier: "lollol.lol",
                password: "1234",
            }
            try {
                Auth.validateLogin(data)
                expect(true).toBeFalsy()
            } catch (e) {
                const error = JSON.parse(e.message)[0]
                const emsg = `Error: "${error?.code}". ${error.message} at "${error?.path[0]}"`
                expect(emsg).toBe('Error: "invalid_string". Invalid email at "identifier"')
            }
        });
    });
});
