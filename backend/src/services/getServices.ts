import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const getServices = {
  get: async () => {
    try {
      const rotas = await prisma.rotaEntrega.findMany({
        include: {
          moto: true,
          motoboy: true,
          pontosEntrega: {
            include: {
              cliente: true,
            },
          },
        },
      });

      return rotas;
    } catch (error) {
      console.error("Erro ao buscar rotas:", error);
      throw error;
    }
  },
};

export default getServices;
