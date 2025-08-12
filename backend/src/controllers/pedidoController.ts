import { Request, Response } from "express";
import { criarPedidoService } from "../services/pedidoService";
import { PedidoRequest } from "../types/pedido";

export async function criarPedidoController(req: Request, res: Response) {
  try {
    const { nome, endereco, valor, peso } = req.body as PedidoRequest;
    if (!nome || !endereco || valor === undefined || peso === undefined) {
      return res.status(400).json({ erro: "Campos obrigatórios ausentes." });
    }
    const pedido = await criarPedidoService({ nome, endereco, valor, peso });
    return res.status(201).json(pedido);
  } catch (error: any) {
    if (error.message && error.message.includes("moto")) {
      return res.status(409).json({ erro: "Nenhuma moto disponível com capacidade suficiente." });
    }
    if (error.message && error.message.includes("motoboy")) {
      return res.status(409).json({ erro: "Nenhum motoboy disponível." });
    }
    return res.status(500).json({ erro: "Erro interno ao criar pedido." });
  }
}
