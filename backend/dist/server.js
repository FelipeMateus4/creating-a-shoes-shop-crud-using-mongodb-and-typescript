"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const routesauth_1 = require("./routesauth");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middleware_1 = require("./middleware/middleware");
// Carrega variáveis de ambiente do arquivo .env
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// Habilita o CORS para todas as requisições
app.use((0, cors_1.default)());
// Desabilita o cabeçalho 'X-Powered-By' por questões de segurança
app.disable("x-powered-by");
// Middleware para parsing de JSON e URL-encoded bodies
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Conexão ao MongoDB
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || '3000'; // Fornece um valor padrão caso PORT não esteja definido
if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1); // Encerra a aplicação com um código de erro
}
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err));
// Utiliza as rotas definidas no arquivo de rotas
app.use(routes_1.router);
app.use('/users', middleware_1.authenticateToken, routesauth_1.authrouter);
// Inicia o servidor na porta definida no arquivo .env ou porta padrão
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
