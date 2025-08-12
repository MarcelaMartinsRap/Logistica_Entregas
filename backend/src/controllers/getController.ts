import { Request, Response } from "express";
import getServices from "../services/getServices.js";

const get = async (req: Request, res: Response) => {
  try {
    const result = await getServices.get();
    res.json(result);
  } catch (error) {
    console.error("Erro no controller:", error);
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
};

export default { get };
