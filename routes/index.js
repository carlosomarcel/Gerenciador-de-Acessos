import routerx from "express-promise-router";
import categoriaRouter from './categoria';
import artigoRouter from './artigo'
import usuarioRouter from './usuario';

const router = routerx();

router.use('/categoria', categoriaRouter);
router.use('/artigo', artigoRouter);
router.use('/usuario', usuarioRouter)


export default router;