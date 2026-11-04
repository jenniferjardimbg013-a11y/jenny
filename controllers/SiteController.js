export default class SiteController {

    constructor() {
        this.home = async (req, res) => {
          res.render('site/index')
        };

        this.login = (req, res) => {
          res.render('site/login');
        };

         this.jogos = (req, res) => {
          res.render('site/jogos');
        };

        this.desenvolvedoras = (req, res) => {
          res.render('site/desenvolvedoras');
        };

        this.generos = (req, res) => {
          res.render('site/generos');
        };

        this.plataformas = (req, res) => {
          res.render('site/plataformas');
        };

        this.jogoDetalhes = (req, res) => {
          res.render('site/jogo-detalhes');
        };
    }
}