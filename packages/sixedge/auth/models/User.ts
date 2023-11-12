import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export const UserSchema = z.object({
    id: z.string(),
    identifier: z.string(), // email
    password: z.string(),
    createdAt: z.number(),
    lastLogin: z.number(),
    type: z.enum(["user", "admin"]),
    from: z.enum(["api"]),
    _delete: z.boolean().optional(), // Know if its deleted
});

export const UserShape = UserSchema.shape; // Typescript types e.g {id: "string", _delete: "boolean"}
export type UserType = z.infer<typeof UserSchema>; // Typescript types e.g {id:string, _delete: boolean}

export class UserModel {
    data: UserType;
    session: any; // pass SessionSchema 

    constructor(data: UserType, session?) {
        this.data = data;
        this.session = session;
    }

    static __newInstance(data: UserType, session?) {
        return new this(data, session)
    }

    static load(data: UserType, session?) {
        return this.__newInstance(data, session)
    }

    getData(): UserType {
        return this.data;
    }

    get(key: string): any {
        return this.getData()[key]
    }

    getId(): any {
        return this.getData().id
    }

    validate() {
        UserSchema.parse(this.getData())
        return this;
    }

    static create(data: { identifier: string; hash: string, from?: "api", type?: "user" | "admin" }): UserModel {
        const userData = {
            id: uuidv4(),
            identifier: data.identifier,
            password: data.hash,
            createdAt: Date.now(),
            lastLogin: Date.now(),
            from: data.from ?? "api",
            type: data.type ?? "user"
        };
        return UserModel.load(userData)
    }
}