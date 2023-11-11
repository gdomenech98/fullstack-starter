import express from 'express';

const router = express.Router();

router.get('/api/v1/test', (req, res) => {
    res.json('TESTTT');
});
// Puedes agregar más rutas aquí

export default router;