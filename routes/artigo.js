import routerx from "express-promise-router";
import artigoController from "../controllers/ArtigoController";
import auth from "../middlewares/auth";


const router = routerx();

router.post("/add",auth.verifyMarceneiro, artigoController.add);
router.get("/query",auth.verifyMarceneiro, artigoController.query);
router.get("/queryCodigo",auth.verifyUsuario, artigoController.queryCodigo);
router.get("/list",auth.verifyMarceneiro, artigoController.list);
router.put("/update",auth.verifyMarceneiro, artigoController.update);
router.delete("/remove",auth.verifyMarceneiro, artigoController.remove);
router.put("/activate",auth.verifyMarceneiro, artigoController.activate);
router.put("/deactivate",auth.verifyMarceneiro, artigoController.deactivate);

export default router;
