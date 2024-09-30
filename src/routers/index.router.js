import { Router } from 'express';
import viewRouter from './views/index.views.js'
import apiRouter from './api/index.api.js'


const router = Router();

router.use("/", viewRouter)
router.use ("/api", apiRouter)

export default router