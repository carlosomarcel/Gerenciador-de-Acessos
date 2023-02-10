import routerx from 'express-promise-router';
import artigoController from '../controllers/ArtigoController';

const router = routerx();

router.post('/add',artigoController.add);
router.get('/query',artigoController.query);
router.get('/list',artigoController.list);
router.put('/update',artigoController.update);
router.delete('/remove',artigoController.remove);
router.put('/activate',artigoController.activate);
router.put('/deactivate',artigoController.deactivate);



export default router;