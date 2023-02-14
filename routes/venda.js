import routerx from 'express-promise-router';
import vendaController from '../controllers/VendaController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.verifyVendedor, vendaController.add);
router.get('/query', auth.verifyVendedor, vendaController.query);
router.get('/list', auth.verifyVendedor, vendaController.list);
router.get('/grafico12meses', auth.verifyUsuario, vendaController.grafico12Meses);
//router.put('/update', auth.verifyVendedor, vendaController.update);
//router.delete('/remove', auth.verifyVendedor, vendaController.remove);
router.put('/activate', auth.verifyVendedor, vendaController.activate);
router.put('/deactivate', auth.verifyVendedor, vendaController.deactivate);



export default router;