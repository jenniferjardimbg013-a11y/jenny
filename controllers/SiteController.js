import Jogo from '../models/jogo.js'
import Desenvolvedora from '../models/desenvolvedora.js'
import Genero from '../models/genero.js'
import Plataforma from '../models/plataforma.js'

export default class SiteController {

    constructor() {
        this.home = async (req, res) => {
          const jogos = await Jogo.find({}).sort({ _id: -1 }).limit(4)
          res.render('site/index', { jogos })
        };

        this.login = (req, res) => {
          res.render('site/login');
        };

        this.jogos = async (req, res) => {
          const jogos = await Jogo.find({})
            .populate('desenvolvedora')
            .populate('genero')
            .populate('plataforma')
            .sort({ _id: -1 })
          res.render('site/jogos', { jogos });
        };

        this.desenvolvedoras = async (req, res) => {
          const desenvolvedoras = await Desenvolvedora.find({}).sort({ nome: 1 })
          res.render('site/desenvolvedoras', { desenvolvedoras });
        };

        this.generos = async (req, res) => {
          const generos = await Genero.find({}).sort({ nome: 1 })
          res.render('site/generos', { generos });
        };

        this.plataformas = async (req, res) => {
          const plataformas = await Plataforma.find({}).sort({ nome: 1 })
          res.render('site/plataformas', { plataformas });
        };

        this.jogoDetalhes = async (req, res) => {
          const jogo = await Jogo.findById(req.params.id)
            .populate('desenvolvedora')
            .populate('genero')
            .populate('plataforma')

          if (!jogo) {
            return res.sendStatus(404)
          }

          res.render('site/jogo-detalhes', { jogo });
        };
    }
}