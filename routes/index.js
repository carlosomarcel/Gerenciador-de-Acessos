import routerx from "express-promise-router";
import categoriaRouter from './categoria';
import ArtigoRouter from './artigo'

const router = routerx();

router.use('/categoria', categoriaRouter);
router.use('/artigo', ArtigoRouter);


export default router;