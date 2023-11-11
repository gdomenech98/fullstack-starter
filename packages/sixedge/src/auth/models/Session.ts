import { z } from 'zod';
import { jwtSign } from '../jwt';

export const SessionSchema = z.object({
    user: z.object({
        id: z.string(), // user identifier such as email
        type: z.enum(["admin", "user"])
    }),
    token: z.string(),
    logged: z.boolean()
});

export const SessionShape = SessionSchema.shape; // Typescript types e.g {id: "string", _delete: "boolean"}
export type SessionType = z.infer<typeof SessionSchema>; // Typescript types e.g {id:string, _delete: boolean}

export class SessionModel {
    data: SessionType; 

    constructor(data: SessionType) {
        this.data = data;
    }

    static __newInstance(data) { 
        // Check data has shape of model, if not, creates guest session
        return new this(data)
    }
    
    getData(): any {
        return this.data;
    }

    get(key): any {
        return this.getData()[key]
    }

    getUser(): any {
        return this.getData().user
    }

    getToken(): any {
        return this.getData().token
    }

    isLogged(): any {
        return this.getData().logged
    }

    static generateSession(data: { id: string, type: "user" | "admin"} ): SessionType{
        return {
            user: data,
            token: jwtSign(data),
            logged: true
        }
    }
}