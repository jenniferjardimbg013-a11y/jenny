import Jogo from '../models/jogo.js'
import Desenvolvedora from '../models/desenvolvedora.js'
import Genero from '../models/genero.js'
import Plataforma from '../models/plataforma.js'

export default class JogoController{

    constructor(caminhoBase='Jogo/'){
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>{
            const desenvolvedoras = await Desenvolvedora.find({})
            const generos = await Genero.find({})
            const plataformas = await Plataforma.find({})

            res.render(this.caminhoBase + "add", {
                Desenvolvedoras: desenvolvedoras,
                Generos: generos,
                Plataformas: plataformas
            })
        }

        this.add = async(req, res)=>{
            let desenvolvedora = null
            let genero = null
            let plataforma = null

            if(req.body.desenvolvedora != '') {
                desenvolvedora = await Desenvolvedora.findById(req.body.desenvolvedora)
            }

            if(req.body.genero != '') {
                genero = await Genero.findById(req.body.genero)
            }

            if(req.body.plataforma != '') {
                plataforma = await Plataforma.findById(req.body.plataforma)
            }

            await Jogo.create({
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                anoLancamento: req.body.anoLancamento,
                classificacaoEtaria: req.body.classificacaoEtaria,
                dificuldade: req.body.dificuldade,
                desenvolvedora: desenvolvedora,
                genero: genero,
                plataforma: plataforma,
                capa: req.file ? req.file.buffer : null,
                capaTipo: req.file ? req.file.mimetype : null
            });

            res.redirect('/jogo/add');
        }

        this.list = async(req, res)=>{
            const resultado = await Jogo.find({})
                .populate('desenvolvedora')
                .populate('genero')
                .populate('plataforma')
            res.render(this.caminhoBase + 'lst', {Jogos:resultado})
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro;

            const resultado = await Jogo.find({
                titulo: {
                    $regex: filtro,
                    $options: "i"
                }
            })
                .populate('desenvolvedora')
                .populate('genero')
                .populate('plataforma')

            res.render(this.caminhoBase + 'lst', {Jogos:resultado})
        }

        this.openEdt = async(req, res)=>{
            const id = req.params.id

            const jogo = await Jogo.findById(id)
                .populate('desenvolvedora')
                .populate('genero')
                .populate('plataforma')

            const desenvolvedoras = await Desenvolvedora.find({})
            const generos = await Genero.find({})
            const plataformas = await Plataforma.find({})

            res.render(this.caminhoBase + "edt", {
                Jogo: jogo,
                Desenvolvedoras: desenvolvedoras,
                Generos: generos,
                Plataformas: plataformas
            })
        }

        this.edt = async(req, res)=>{
            let desenvolvedora = null
            let genero = null
            let plataforma = null

            if(req.body.desenvolvedora != '') {
                desenvolvedora = await Desenvolvedora.findById(req.body.desenvolvedora)
            }

            if(req.body.genero != '') {
                genero = await Genero.findById(req.body.genero)
            }

            if(req.body.plataforma != '') {
                plataforma = await Plataforma.findById(req.body.plataforma)
            }

            const dados = {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                anoLancamento: req.body.anoLancamento,
                classificacaoEtaria: req.body.classificacaoEtaria,
                dificuldade: req.body.dificuldade,
                desenvolvedora: desenvolvedora,
                genero: genero,
                plataforma: plataforma
            }

            if (req.file) {
                dados.capa = req.file.buffer
                dados.capaTipo = req.file.mimetype
            } else if (req.body.removerCapa === 'on') {
                dados.capa = null
                dados.capaTipo = null
            }

            await Jogo.findByIdAndUpdate(req.params.id, dados)

            res.redirect('/jogo/lst');
        }

        this.del = async(req, res)=>{
            await Jogo.findByIdAndDelete(req.params.id)

            res.redirect('/jogo/lst');
        }

        this.capa = async(req, res)=>{
            const jogo = await Jogo.findById(req.params.id)

            if (!jogo || !jogo.capa) {
                return res.sendStatus(404)
            }

            res.type(jogo.capaTipo || 'image/jpeg').send(jogo.capa)
        }
    }
}