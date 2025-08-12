"use client";

import React, { useEffect, useState } from "react";
import { getRotasEntrega } from "../../services/rotasEntrega";

type Entrega = {
  id: number;
  status: string;
  nomeMotoBoy: string;
  veiculo: string;
  dataHoraCriada: string;
  pedidos: {
    id: number;
    endereco: string;
    peso: number;
    status: string;
  }[];
};

const entregasMock: Entrega[] = [
  {
    id: 1,
    status: "Em andamento",
    nomeMotoBoy: "Motoboy1",
    veiculo: "Moto1",
    dataHoraCriada: "11/08/2025 10:00",
    pedidos: [
      { id: 1, endereco: "Rua A, 123", peso: 1.5, status: "Finalizado" },
    ],
  },
  {
    id: 2,
    status: "Em andamento",
    nomeMotoBoy: "Motoboy2",
    veiculo: "Moto2",
    dataHoraCriada: "11/08/2025 10:00",
    pedidos: [{ id: 2, endereco: "Rua B, 456", peso: 2.0, status: "Pendente" }],
  },
  {
    id: 3,
    status: "Em andamento",
    nomeMotoBoy: "Motoboy3",
    veiculo: "Moto3",
    dataHoraCriada: "11/08/2025 10:00",
    pedidos: [{ id: 3, endereco: "Rua C, 789", peso: 2.5, status: "Pendente" }],
  },
];

export default function Home() {
  const [entregas, setEntregas] = useState<Entrega[]>([]);
  const [rotaAberta, setRotaAberta] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await getRotasEntrega();
        setEntregas(entregasMock);
      } catch (error) {
        console.error("Error fetching delivery routes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main
      style={{
        background: "#181818",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "2px solid #fff",
          borderRadius: "24px",
          padding: "32px 40px",
          background: "#181818",
          color: "#fff",
          minWidth: 600,
        }}
      >
        <div
          style={{
            fontFamily: "cursive",
            fontSize: 22,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Gestão de Entregas
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 48,
            fontFamily: "cursive",
            fontSize: 18,
            marginBottom: 16,
            borderBottom: "1px solid #444",
            paddingBottom: 8,
          }}
        >
          <span>Status</span>
          <span>Motoboy</span>
          <span>Veículo</span>
          <span>Data Criada</span>
        </div>
        {entregas.map((entrega) => (
          <div key={entrega.id}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 48,
                fontFamily: "cursive",
                fontSize: 18,
                marginBottom: 8,
                cursor: "pointer",
                background: rotaAberta === entrega.id ? "#222" : "inherit",
                borderRadius: "12px",
                padding: "8px 0",
                transition: "background 0.2s",
              }}
              onClick={() =>
                setRotaAberta(rotaAberta === entrega.id ? null : entrega.id)
              }
            >
              <span>{entrega.status}</span>
              <span>{entrega.nomeMotoBoy}</span>
              <span>{entrega.veiculo}</span>
              <span>{entrega.dataHoraCriada}</span>
            </div>
            {rotaAberta === entrega.id && (
              <div
                style={{
                  marginLeft: 16,
                  marginBottom: 16,
                  background: "#222",
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <div
                  style={{ fontWeight: "bold", marginBottom: 8, fontSize: 16 }}
                >
                  Pedidos:
                </div>
                <div>
                  {entrega.pedidos.length === 0 ? (
                    <span style={{ color: "#aaa" }}>
                      Nenhum pedido nesta rota.
                    </span>
                  ) : (
                    <table
                      style={{ width: "100%", borderCollapse: "collapse" }}
                    >
                      <thead>
                        <tr style={{ color: "#fff", background: "#333" }}>
                          <th
                            style={{
                              padding: "6px",
                              borderBottom: "1px solid #444",
                            }}
                          >
                            ID
                          </th>
                          <th
                            style={{
                              padding: "6px",
                              borderBottom: "1px solid #444",
                            }}
                          >
                            Endereço
                          </th>
                          <th
                            style={{
                              padding: "6px",
                              borderBottom: "1px solid #444",
                            }}
                          >
                            Peso
                          </th>
                          <th
                            style={{
                              padding: "6px",
                              borderBottom: "1px solid #444",
                            }}
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {entrega.pedidos.map((pedido) => (
                          <tr key={pedido.id} style={{ color: "#eee" }}>
                            <td
                              style={{
                                padding: "6px",
                                borderBottom: "1px solid #444",
                              }}
                            >
                              {pedido.id}
                            </td>
                            <td
                              style={{
                                padding: "6px",
                                borderBottom: "1px solid #444",
                              }}
                            >
                              {pedido.endereco}
                            </td>
                            <td
                              style={{
                                padding: "6px",
                                borderBottom: "1px solid #444",
                              }}
                            >
                              {pedido.peso} kg
                            </td>
                            <td
                              style={{
                                padding: "6px",
                                borderBottom: "1px solid #444",
                              }}
                            >
                              {pedido.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
