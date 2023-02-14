import routerx from 'express-promise-router';
import boletoController from '../controllers/BoletoController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.verifyMarceneiro, boletoController.add);
router.get('/query', auth.verifyMarceneiro, boletoController.query);
router.get('/list', auth.verifyMarceneiro, boletoController.list);
//router.put('/update', auth.verifyMarceneiro, boletoController.update);
//router.delete('/remove', auth.verifyMarceneiro, boletoController.remove);
router.put('/activate', auth.verifyMarceneiro, boletoController.activate);
router.put('/deactivate', auth.verifyMarceneiro, boletoController.deactivate);



export default router;