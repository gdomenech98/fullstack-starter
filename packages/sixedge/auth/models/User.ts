import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { BaseModel } from '../../base';

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

export class UserModel extends BaseModel<UserModel> {
    data: UserType;
    session: any; // pass SessionSchema 

    constructor(data: UserType, session?) {
        super(data, session)
    }

    static __newInstance(data: UserType, session?): UserModel {
        return new UserModel(data, session)
    }

    static load(data: UserType, session?): UserModel {
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

    validate(): BaseModel<UserModel> {
        UserSchema.parse(this.getData())
        return this;
    }

    // CRUD METHODS
    onList(data: any[]){
        return data;
    }

    create(data?: { identifier: string; password: string, from?: "api", type?: "user" | "admin" }): any {
        const _data = data ?? this.getData();
        const userData = {
            id: uuidv4(),
            identifier: _data.identifier,
            password: _data.password, // TODO HASH PASSWORD
            createdAt: Date.now(),
            lastLogin: Date.now(),
            from: _data.from ?? "api",
            type: _data.type ?? "user"
        };
        const validatedData = UserModel.load(userData, this.session).validate()?.getData()
        return validatedData
    }
}