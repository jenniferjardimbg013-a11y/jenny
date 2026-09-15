// importar o Model
import Avaliacao from '../models/avaliacao.js'

export default class AvaliacaoController{

    constructor(caminhoBase='avaliacao/'){
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }

        this.add = async(req, res)=>{
            // cria a Avaliação

            await Avaliacao.create({
                usuario: req.body.usuario,
                jogo: req.body.jogo,
                nota: req.body.nota,
                comentario: req.body.comentario,
                data: req.body.data
            });

            res.redirect('/'+caminhoBase + 'add');
        }

        this.list = async(req, res)=>{
            const resultado = await Avaliacao.find({})

            res.render(caminhoBase + 'lst', {
                Avaliacoes: resultado
            })
        }

        this.openEdt = async(req, res)=>{
            // passar quem eu quero editar

            const id = req.params.id

            const avaliacao = await Avaliacao.findById(id)

            res.render(caminhoBase + "edt", {
                Avaliacao: avaliacao
            })
        }

        this.edt = async(req, res)=>{
            await Avaliacao.findByIdAndUpdate(
                req.params.id,
                req.body
            )

            res.redirect('/'+caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
            await Avaliacao.findByIdAndDelete(req.params.id)

            res.redirect('/'+caminhoBase + 'lst');
        }

    }
}