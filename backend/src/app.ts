import express from "express";
import cors from "cors";
import pedidosRoutes from "./routes/pedidos";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", pedidosRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
