import express from "express";
import cors from "cors";
import pedidoRouter from "./routes/pedidoRouter";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/pedido", pedidoRouter);

export default app;
