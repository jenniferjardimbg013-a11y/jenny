// importar o Model
import Plataforma from '../models/plataforma.js'

export default class PlataformaController{

    constructor(caminhoBase='plataforma/'){
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }

        this.add = async(req, res)=>{
            // cria a Plataforma

            await Plataforma.create({
                nome: req.body.nome,
                fabricante: req.body.fabricante,
                anoLancamento: req.body.anoLancamento
            });

            res.redirect('/'+caminhoBase + 'add');
        }

        this.list = async(req, res)=>{
            const resultado = await Plataforma.find({})

            res.render(caminhoBase + 'lst', {
                Plataformas: resultado
            })
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro

            const resultado = await Plataforma.find({
                nome: {
                    $regex: filtro,
                    $options: 'i'
                }
            })

            res.render(caminhoBase + 'lst', {Plataformas: resultado})
        }

        this.openEdt = async(req, res)=>{
            // passar quem eu quero editar

            const id = req.params.id

            const plataforma = await Plataforma.findById(id)

            res.render(caminhoBase + "edt", {
                Plataforma: plataforma
            })
        }

        this.edt = async(req, res)=>{
            await Plataforma.findByIdAndUpdate(
                req.params.id,
                req.body
            )

            res.redirect('/'+caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
            await Plataforma.findByIdAndDelete(req.params.id)

            res.redirect('/'+caminhoBase + 'lst');
        }

    }
}