import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/route.js'; // rotas externas
import siteRoutes from './routes/SiteRoutes.js';
import avaliacaoRoutes from './routes/AvaliacaoRoutes.js'; // rotas externas
import desenvolvedoraRoutes from './routes/DesenvolvedoraRoutes.js'; // rotas externas
import generoRoutes from './routes/GeneroRoutes.js'; // rotas externas
import plataformaRoutes from './routes/PlataformaRoutes.js'; // rotas externas
import jogoRoutes from './routes/JogoRoutes.js'; // rotas externas
import usuarioRoutes from './routes/UsuarioRoutes.js'; // rotas externas

const PORT = 3000
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(join(__dirname, '/public')));
app.set('views', join(__dirname, '/views'));

// Rotas
app.use(siteRoutes)
app.use(avaliacaoRoutes)
app.use(desenvolvedoraRoutes)
app.use(generoRoutes)
app.use(plataformaRoutes)
app.use(jogoRoutes)
app.use(usuarioRoutes)
app.use(routes)
app.listen(PORT, ()=>{
   
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
// Exporta o handler compatível com Vercel
export default app;