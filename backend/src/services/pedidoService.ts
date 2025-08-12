import { PrismaClient } from "../generated/prisma";
import { PedidoRequest, PedidoResponse } from "../types/pedido";

const prisma = new PrismaClient();

export async function criarPedidoService({ nome, endereco, valor, peso }: PedidoRequest): Promise<PedidoResponse> {
  let cliente = await prisma.cliente.findFirst({ where: { nome, endereco } });
  if (!cliente) {
    cliente = await prisma.cliente.create({ data: { nome, endereco } });
  }

  const moto = await prisma.moto.findFirst({
    where: {
      status: "Disponivel",
      capacidadeCargaQuilos: { gte: peso }
    }
  });
  if (!moto) {
    throw new Error("Nenhuma moto disponível com capacidade suficiente.");
  }

  const motoboy = await prisma.motoboy.findFirst({
    where: { status: "Disponivel" }
  });
  if (!motoboy) {
    throw new Error("Nenhum motoboy disponível.");
  }

  const rota = await prisma.rotaEntrega.create({
    data: {
      motoboyId: motoboy.id,
      motoId: moto.id,
      status: "Planejada"
    }
  });

  const ponto = await prisma.pontoEntrega.create({
    data: {
      clienteId: cliente.id,
      rotaEntregaId: rota.id,
      endereco,
      peso,
      status: "Pendente"
    }
  });

  await prisma.moto.update({ where: { id: moto.id }, data: { status: "EmUso" } });
  await prisma.motoboy.update({ where: { id: motoboy.id }, data: { status: "EmServico" } });

  return {
    id: ponto.id,
    nome: cliente.nome,
    endereco: ponto.endereco,
    valor,
    peso: ponto.peso,
    status: "pending"
  };
}
