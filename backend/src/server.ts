import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { router } from "./routes";

// Carrega variáveis de ambiente do arquivo .env
config();

const app = express();

// Habilita o CORS para todas as requisições
app.use(cors());

// Desabilita o cabeçalho 'X-Powered-By' por questões de segurança
app.disable("x-powered-by");

// Middleware para parsing de JSON e URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão ao MongoDB
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || '3000'; // Fornece um valor padrão caso PORT não esteja definido

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in .env file');
  process.exit(1); // Encerra a aplicação com um código de erro
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Utiliza as rotas definidas no arquivo de rotas
app.use(router);

// Inicia o servidor na porta definida no arquivo .env ou porta padrão
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
