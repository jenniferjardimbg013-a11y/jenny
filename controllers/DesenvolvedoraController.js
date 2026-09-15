// importar o Model
import Desenvolvedora from '../models/desenvolvedora.js'

export default class DesenvolvedoraController {

    constructor(caminhoBase = 'desenvolvedora/') {
        this.caminhoBase = caminhoBase

        // Abrir tela de cadastro
        this.openAdd = async (req, res) => {
            res.render(caminhoBase + 'add')
        }

        // Cadastrar desenvolvedora
        this.add = async (req, res) => {

            await Desenvolvedora.create({
                nome: req.body.nome,
                pais: req.body.pais,
                anoFundacao: req.body.anoFundacao
            })

            res.redirect('/' + caminhoBase + 'add')
        }

        // Listar desenvolvedoras
        this.list = async (req, res) => {

            const resultado = await Desenvolvedora.find({})

            res.render(caminhoBase + 'lst', {
                Desenvolvedoras: resultado
            })
        }

        // Abrir tela de edição
        this.openEdt = async (req, res) => {

            const id = req.params.id

            const desenvolvedora = await Desenvolvedora.findById(id)

            res.render(caminhoBase + 'edt', {
                Desenvolvedora: desenvolvedora
            })
        }
    }
}
