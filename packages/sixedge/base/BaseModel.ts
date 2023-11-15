import { z } from 'zod';

export const BaseSchema = z.object({
    id: z.string().describe("a1ks-421g-00kl-v2za"),
    _delete: z.boolean().optional(), // Know if its deleted
});
export const BaseShape = BaseSchema.shape; // Typescript types e.g {id: "string", _delete: "boolean"}
export type BaseType = z.infer<typeof BaseSchema>; // Typescript types e.g {id:string, _delete: boolean}

export class BaseModel<T> {
    protected data: any; // pass BaeSchema
    protected session: any; // pass SessionSchema 

    constructor(data, session?) {
        this.data = data;
        this.session = session;
    }

    // TODO
    static __newInstance(data, session) {
        // This method should be implemented by each model that extend BaseModel
        return new this(data, session)
    }

    static load(data, session?) {
        return this.__newInstance(data, session)
    }

    getData(): any {
        return this.data;
    }

    get(key): any {
        return this.getData()[key]
    }

    getId(): any {
        return this.getData().id
    }

    validate(): BaseModel<T> {
        BaseSchema.parse(this.getData())
        return this
    }

    // CRUD METHODS
    onList(data: any[]) { 
        // This method should be reimplemented at child class
        return this.onList(data)
    }

    onRead() {
        // Apply Transformations
        return this.getData();
    }

    create() {
        this.validate()// Validate the item before adding it to the model
        // Apply transformations
        return this.getData();
    }

    onCreate() {
        // Apply transformations
        return this.getData()
    }

    update(): BaseModel<T> {
        this.validate();
        // Apply transformations
        return this.getData();
    }

    onUpdate(): BaseModel<T> {
        // Apply transformations
        return this.getData()
    }

    delete(): BaseModel<T> {
        return {...this.getData(), _delete: true} // Apply transformations
    }

    onDelete(): BaseModel<T> {
        // Apply transformations
        return this.getData()
    }
}