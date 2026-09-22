// importar o Model
import Avaliacao from '../models/avaliacao.js'
import Usuario from '../models/usuario.js'
import Jogo from '../models/jogo.js'

export default class AvaliacaoController{

    constructor(caminhoBase='avaliacao/'){
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>{
            const usuarios = await Usuario.find({})
            const jogos = await Jogo.find({})

            res.render(caminhoBase + "add", {
                Usuarios: usuarios,
                Jogos: jogos
            })
        }

        this.add = async(req, res)=>{
            if(req.body.usuario == '' || req.body.jogo == '') {
                return res.redirect('/' + caminhoBase + 'add')
            }

            const usuario = await Usuario.findById(req.body.usuario)
            const jogo = await Jogo.findById(req.body.jogo)

            await Avaliacao.create({
                usuario: usuario,
                jogo: jogo,
                nota: req.body.nota,
                comentario: req.body.comentario,
                data: req.body.data
            });

            res.redirect('/'+caminhoBase + 'add');
        }

        this.list = async(req, res)=>{
            const resultado = await Avaliacao.find({})
                .populate('usuario')
                .populate('jogo')

            res.render(caminhoBase + 'lst', {
                Avaliacoes: resultado
            })
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro

            const resultado = await Avaliacao.find({
                comentario: {
                    $regex: filtro,
                    $options: 'i'
                }
            })
                .populate('usuario')
                .populate('jogo')

            res.render(caminhoBase + 'lst', {Avaliacoes: resultado})
        }

        this.openEdt = async(req, res)=>{
            // passar quem eu quero editar

            const id = req.params.id

            const avaliacao = await Avaliacao.findById(id)
                .populate('usuario')
                .populate('jogo')

            const usuarios = await Usuario.find({})
            const jogos = await Jogo.find({})

            res.render(caminhoBase + "edt", {
                Avaliacao: avaliacao,
                Usuarios: usuarios,
                Jogos: jogos
            })
        }

        this.edt = async(req, res)=>{
            if(req.body.usuario == '' || req.body.jogo == '') {
                return res.redirect('/' + caminhoBase + 'edt/' + req.params.id)
            }

            const usuario = await Usuario.findById(req.body.usuario)
            const jogo = await Jogo.findById(req.body.jogo)

            await Avaliacao.findByIdAndUpdate(
                req.params.id,
                {
                    usuario: usuario,
                    jogo: jogo,
                    nota: req.body.nota,
                    comentario: req.body.comentario,
                    data: req.body.data
                }
            )

            res.redirect('/'+caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
            await Avaliacao.findByIdAndDelete(req.params.id)

            res.redirect('/'+caminhoBase + 'lst');
        }

    }
}