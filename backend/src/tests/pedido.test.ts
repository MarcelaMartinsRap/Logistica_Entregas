import request from "supertest";
import app from "../app";

describe("POST /pedido", () => {
  it("deve criar um pedido com sucesso", async () => {
    const response = await request(app)
      .post("/pedido")
      .send({
        nome: "Cliente Teste",
        endereco: "Rua Teste, 123",
        valor: 100,
        peso: 10
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe("Cliente Teste");
    expect(response.body.endereco).toBe("Rua Teste, 123");
    expect(response.body.valor).toBe(100);
    expect(response.body.peso).toBe(10);
    expect(response.body.status).toBe("pending");
  });
});
