import routerx from 'express-promise-router';
import pessoaController from '../controllers/pessoaController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add',auth.verifyUsuario, pessoaController.add);
router.get('/query',auth.verifyUsuario, pessoaController.query);
router.get('/list',auth.verifyUsuario, pessoaController.list);
router.get('/listClientes',auth.verifyUsuario, pessoaController.list);
router.get('/listFornecedores',auth.verifyUsuario, pessoaController.list);
router.put('/update',auth.verifyUsuario, pessoaController.update);
router.delete('/remove',auth.verifyUsuario, pessoaController.remove);
router.put('/activate',auth.verifyUsuario, pessoaController.activate);
router.put('/deactivate',auth.verifyUsuario, pessoaController.deactivate);



export default router;