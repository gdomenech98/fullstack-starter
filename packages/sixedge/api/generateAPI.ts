import express, { Router, Request, Response } from 'express';
import { MongoDB } from 'sixedge/db';
import ErrorResponse from './ErrorResponse';
require('dotenv').config({ path: __dirname + '/../../../.env' });

// UPDATE STORES
const getDefaultDB = (async () => {
    return await MongoDB.connect(process.env.DB_URI);
})

export async function createAPI(entity, modelInstance: any, schema: any, prefix: string = "/api/v1/", dbInstance: any = undefined): Promise<Router> {
    const router = express.Router();
    let db = dbInstance ?? await getDefaultDB()
    // List
    router.get(prefix + entity, async (req: Request, res: Response) => {
        try {
            const data = await db.list(entity, {});
            res.json(data)
        } catch (e) {
            ErrorResponse(e, res)
        }

    });
    // Read
    router.get(prefix + entity + `/:id`, async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const data = await db.read(entity, { id });
            res.json(data)
        } catch (e) {
            ErrorResponse(e, res)
        }
    });
    // Create
    router.post(prefix + entity, async (req: Request, res: Response) => {
        const payload = req.body;
        try {
            const data = await db.create(entity, payload);
            res.json(data)
        } catch (e) {
            ErrorResponse(e, res)
        }

    });
    // Update
    router.post(prefix + entity + `/:id`, async (req: Request, res: Response) => {
        const { id } = req.params;
        const payload = req.body;
        try {
            const data = await db.update(entity, {id} ,payload);
            res.json(data)
        } catch (e) {
            ErrorResponse(e, res)
        }
    });
    // Delete
    router.get(prefix + entity + `/:id/delete`, async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const data = await db.delete(entity, {id});
            res.json(data)
        } catch (e) {
            ErrorResponse(e, res)
        }
    });

    return router;
}