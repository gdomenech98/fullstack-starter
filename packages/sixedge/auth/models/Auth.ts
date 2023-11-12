import { z } from 'zod';

export const LoginSchema = z.object({
    identifier: z.string().email(),
    password: z.string()
});

export const RegisterSchema = z.object({
    identifier: z.string().email(),
    password: z.string(),
});

export class Auth {
    static validateRegister(data) {
        RegisterSchema.parse(data)
        // if( repeatPassword && data.password !== data?.repassword) throw "Passwords doesn't match"
    }
    static validateLogin(data) {
        LoginSchema.parse(data)
    }
 
}
