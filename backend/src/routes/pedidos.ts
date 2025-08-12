import { Request, Response } from "express";
import { Router } from "express";
import pedidosController from "../controllers/pedidoController";

const router = Router();

router.put("/pedido/:id", async (req: Request, res: Response) => {
  pedidosController.editarStatusPedido(req, res);
});

export default router;
