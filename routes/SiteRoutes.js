import express from 'express';
const router = express.Router();
import SiteController from '../controllers/SiteController.js'
const controle = new SiteController();

const caminhobase = 'site/'

router.get('/' + caminhobase, controle.home)
router.get('/' + caminhobase + 'login', controle.login)
router.get('/' + caminhobase + 'desenvolvedoras', controle.desenvolvedoras)
router.get('/' + caminhobase + 'generos', controle.generos)
router.get('/' + caminhobase + 'plataformas', controle.plataformas)
router.get('/' + caminhobase + 'jogos', controle.jogos)
router.get('/' + caminhobase + 'jogo-detalhes/:id', controle.jogoDetalhes)
router.get('/' + caminhobase + 'jogo-detalhes', (req, res) => {
    res.redirect('/site/jogos')
})
router.get('/' + caminhobase + 'jogo-detalhes.html', (req, res) => {
    res.redirect(301, '/site/jogos')
})

export default router
