import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pedidosService = {
  editarStatusPedido: async (id: string, status: string) => {
    try {
      await prisma.pedido.update({
        where: { id },
        data: { status },
      });

      return { success: true };
    } catch (error) {
      console.error("Error updating pedido status:", error);
      return {
        success: false,
        error:
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : String(error),
      };
    }
  },
};

export default pedidosService;
