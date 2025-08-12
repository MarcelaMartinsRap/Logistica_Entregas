import getController from "../controllers/getController.js";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    await getController.get(req, res);
  } catch (error) {
    console.error("Erro na rota:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
