import routerx from 'express-promise-router';
import pessoaController from '../controllers/pessoaController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add',auth.verifyUsuario, pessoaController.add);
router.get('/query',auth.verifyUsuario, pessoaController.query);
router.get('/list',auth.verifyUsuario, pessoaController.list);
router.put('/update',auth.verifyUsuario, usuarioController.update);
router.delete('/remove',auth.verifyUsuario, usuarioController.remove);
router.put('/activate',auth.verifyUsuario, usuarioController.activate);
router.put('/deactivate',auth.verifyUsuario, usuarioController.deactivate);
router.post('/login', usuarioController.login);


export default router;