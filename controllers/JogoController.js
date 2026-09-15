import Jogo from '../models/jogo.js'

export default class JogoController{

    constructor(caminhoBase='Jogo/'){
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>{
            res.render(this.caminhoBase + "add")
        }

        this.add = async(req, res)=>{
            // cria o Jogo

            await Jogo.create({
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                anoLancamento: req.body.anoLancamento,
                classificacaoEtaria: req.body.classificacaoEtaria,
                dificuldade: req.body.dificuldade,
                desenvolvedora: req.body.desenvolvedora,
                genero: req.body.genero,
                plataforma: req.body.plataforma,
                capa: req.file?.buffer,
                capaTipo: req.file?.mimetype
            });

            res.redirect('/jogo/add');
        }

        this.list = async(req, res)=>{
            const resultado = await Jogo.find({})
            res.render(this.caminhoBase + 'lst', {Jogos:resultado})
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro;

            const resultado = await
            Jogo.find({
                titulo: {
                    $regex: filtro,
                    $options: "i"
                }
            })

            res.render(this.caminhoBase + 'lst', {Jogos:resultado})
        }

        this.openEdt = async(req, res)=>{
            // passar quem eu quero editar

            const id = req.params.id
            console.log(id)

            const jogo = await Jogo.findById(id)

            console.log(jogo)

            res.render(this.caminhoBase + "edt",
                {Jogo:jogo})
        }

        this.edt = async(req, res)=>{
            const dados = {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                anoLancamento: req.body.anoLancamento,
                classificacaoEtaria: req.body.classificacaoEtaria,
                dificuldade: req.body.dificuldade,
                desenvolvedora: req.body.desenvolvedora,
                genero: req.body.genero,
                plataforma: req.body.plataforma
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

            if (!jogo?.capa) {
                return res.sendStatus(404)
            }

            res.type(jogo.capaTipo || 'image/jpeg').send(jogo.capa)
        }
    }
}