import express from "express";
import cors from "cors";
import "./redisClient";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
