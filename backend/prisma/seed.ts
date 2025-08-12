import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criar Motos
  const motos = await prisma.moto.createMany({
    data: [
      {
        placa: "ABC1A23",
        modelo: "Honda CG 160",
        capacidadeCargaQuilos: 20,
        status: "Disponivel",
      },
      {
        placa: "XYZ4B56",
        modelo: "Yamaha YBR 125",
        capacidadeCargaQuilos: 25,
        status: "Manutencao",
      },
      {
        placa: "KLM7C89",
        modelo: "Honda Biz 125",
        capacidadeCargaQuilos: 15,
        status: "EmUso",
      },
    ],
  });

  // Criar Motoboys
  const motoboys = await prisma.motoboy.createMany({
    data: [
      {
        cpf: "11122233344",
        cnh: "CNH123456",
        nome: "João Silva",
        status: "Disponivel",
      },
      {
        cpf: "55566677788",
        cnh: "CNH654321",
        nome: "Maria Souza",
        status: "EmServico",
      },
      {
        cpf: "99900011122",
        cnh: "CNH987654",
        nome: "Carlos Pereira",
        status: "Indisponivel",
      },
    ],
  });

  // Criar Clientes
  const clientes = await prisma.cliente.createMany({
    data: [
      { nome: "Padaria do Zé", endereco: "Rua A, 123" },
      { nome: "Mercado Central", endereco: "Av. B, 456" },
      { nome: "Lanchonete Saborosa", endereco: "Praça C, 789" },
    ],
  });

  // Conectar Motos e Motoboys (MotoMotoboy)
  await prisma.motoMotoboy.createMany({
    data: [
      { motoId: 1, motoboyId: 1, emUso: true },
      { motoId: 2, motoboyId: 2, emUso: false },
      { motoId: 3, motoboyId: 3, emUso: true },
    ],
  });

  console.log("Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
