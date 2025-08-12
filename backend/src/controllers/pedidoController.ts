import { Request, Response } from "express";
import pedidosService from "../services/pedidosService";

const pedidosController = {
  editarStatusPedido: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pedidosService.editarStatusPedido(id, status);

    if (result.success) {
      return res
        .status(200)
        .json({ message: "Status atualizado com sucesso." });
    }

    return res.status(500).json({
      message: "Erro ao atualizar status do pedido.",
      error: result.error,
    });
  },
};

export default pedidosController;
