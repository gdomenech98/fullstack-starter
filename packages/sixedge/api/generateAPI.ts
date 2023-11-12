import express, { Router, Request, Response } from 'express';

// UPDATE STORES

export function createAPI(entity, modelInstance: any, prefix: string = "/api/v1/",): Router {
    const router = express.Router();
    // List
    router.get(prefix + entity, async (req: Request, res: Response) => {
        res.json("LIST" + entity);
    });
    // Read
    router.get(prefix + entity + `/:id`, async (req: Request, res: Response) => {
        const { id } = req.params;
        res.json("READ" + entity + ":" + id);
    });
    // Create
    router.post(prefix + entity, async (req: Request, res: Response) => {
        const payload = req.body;
        res.json("CREATE" + entity + ":" + payload);

    });
    // Update
    router.post(prefix + entity + `/:id`, async (req: Request, res: Response) => {
        const { id } = req.params;
        const payload = req.body;
        res.json("UPDATE" + entity + ":" + id + "PAY: " + payload);

    });
    // Delete
    router.get(prefix + entity + `/:id/delete`, async (req: Request, res: Response) => {
        const {id} = req.params;
        res.json("Delete " + entity +":"+ id)
    });

    return router;
}