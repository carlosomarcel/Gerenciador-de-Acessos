import routerx from "express-promise-router";
import categoriaRouter from './categoria';
import artigoRouter from './artigo'

const router = routerx();

router.use('/categoria', categoriaRouter);
router.use('/artigo', artigoRouter);


export default router;