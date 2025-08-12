import { Router } from "express";
import { criarPedidoController } from "../controllers/pedidoController";

const router = Router();

router.post("/", criarPedidoController);

export default router;
