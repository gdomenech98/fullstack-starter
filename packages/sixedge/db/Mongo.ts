import { MongoClient } from 'mongodb';

const DB_URL = "mongodb://localhost:27017/db"

export class MongoDB {
    client;
    db;
    constructor(client: MongoClient) {
        this.client = client;
    }

    static async _newInstance(uri = DB_URL): Promise<MongoDB> {
        try {
            const client: MongoClient = await new MongoClient(uri).connect()
            return new this(client);
        } catch (e) {
            throw "Could not connect client"
        }
    }

    static async connect(uri) {
        try {
            return MongoDB._newInstance(uri)
        } catch (e) {
            console.error("Failed to connect to: ", uri)
        }
    }

    private getDB() {
        return this.client.db()
    }

    async list(collectionName: string, dbquery: any, showHidden?: boolean) {
        const collection = this.getDB().collection(collectionName);
        if (!showHidden) dbquery = { ...dbquery, hidden: { $exists: false } }
        const data = await collection.find(dbquery).toArray();
        if (data.length == 0) throw "Not found"
        return data
    }

    async read(collectionName: string, dbquery: any, showHidden?: boolean) {
        const collection = this.getDB().collection(collectionName);
        if (!showHidden) dbquery = { ...dbquery, hidden: { $exists: false } }
        const data = await collection.findOne(dbquery)
        if (!data) throw "Not found"
        return data
    }

    async create(collectionName: string, data: any) {
        const collection = this.getDB().collection(collectionName);
        try {
            await collection.insertOne(data)
            return data
        } catch (e) {
            if (e.code == 11000) throw "Duplicated key"
        }
    }

    async createMany(collectionName: string, data: any[]) {
        const collection = this.getDB().collection(collectionName);
        try {
            await collection.insertMany(data);
        } catch (e) {
            console.error(e);
        }
    }

    async update(collectionName: string, dbquery: any, data: any) { // update One
        const collection = this.getDB().collection(collectionName);
        try {
            await collection.replaceOne(dbquery, data)
            return data
        } catch (e) {
            if (e.code == 11000) throw "Duplicated key"
        }
    }

    async delete(collectionName: string, dbquery: any) { // delete One
        let data = await this.read(collectionName, dbquery)
        if (!data) throw "Not found"
        data = { ...data, hidden: true }; // Sets to hidden
        await this.update(collectionName, dbquery, data)
        return data
    }

    async generateIndex(collectionName: string, field: string, indexType: 'unique' | 'text') { // recover one element deleted
        const collection = this.getDB().collection(collectionName);
        switch (indexType) {
            case 'unique':
                await collection.createIndex({ [field]: 1 }, { unique: true })
                break;
            case 'text':
                await collection.createIndex({ [field]: "text" })
                break;
        }
    }

}