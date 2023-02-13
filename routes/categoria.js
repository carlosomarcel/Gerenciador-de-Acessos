import routerx from 'express-promise-router';
import CategoriaController from '../controllers/CategoriaController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.verifyMarceneiro, CategoriaController.add);
router.get('/query', auth.verifyMarceneiro, CategoriaController.query);
router.get('/list', auth.verifyMarceneiro, CategoriaController.list);
router.put('/update', auth.verifyMarceneiro, CategoriaController.update);
router.delete('/remove', auth.verifyMarceneiro, CategoriaController.remove);
router.put('/activate', auth.verifyMarceneiro, CategoriaController.activate);
router.put('/deactivate', auth.verifyMarceneiro, CategoriaController.deactivate);



export default router;