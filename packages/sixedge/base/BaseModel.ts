import { z } from 'zod';

export const BaseSchema = z.object({
    id: z.string().describe("a1ks-421g-00kl-v2za"),
    _delete: z.boolean().optional(), // Know if its deleted
});
export const BaseShape = BaseSchema.shape; // Typescript types e.g {id: "string", _delete: "boolean"}
export type BaseType = z.infer<typeof BaseSchema>; // Typescript types e.g {id:string, _delete: boolean}

export class BaseModel<T> {
    private data: any; // pass BaeSchema
    private session: any; // pass SessionSchema 

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

    validate(): boolean {
        if (this.getId()) {
            return true // valid
        }
        return false; // not valid
    }

    // CRUD METHODS
    list(): T[] {
        return this.data;
    }

    create(item: T): void {
        // Validate the item before adding it to the model
        if (this.validate()) {
            this.data.push(item);
            this.saveData();
        }
    }

    update(id: number, newItem: T): void {
        const itemIndex = this.data.findIndex((item: T) => item['id'] === id);
        if (itemIndex !== -1 && this.validate()) {
            this.data[itemIndex] = newItem;
            this.saveData();
        }
    }

    delete(id: number): void {
        const itemIndex = this.data.findIndex((item: T) => item['id'] === id);
        if (itemIndex !== -1) {
            this.data.splice(itemIndex, 1);
            this.saveData();
        }
    }



    private saveData(): void {
        // Save data to a source (e.g., a database)
        // Example: database.update('UPDATE table SET ...');
    }
}