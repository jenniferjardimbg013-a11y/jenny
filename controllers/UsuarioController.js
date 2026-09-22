// importar o Model
import Usuario from '../models/usuario.js'

export default class UsuarioController{

    constructor(caminhoBase='usuario/'){
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }

        this.add = async(req, res)=>{
            // cria o Usuário
            let fotoEnviada
           if(req.file!=null){
            console.log(" foi")
            fotoEnviada = req.file.buffer
           }
           else{
            console.log("nao foi")
            fotoEnviada = null
           }
            await Usuario.create({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                foto: fotoEnviada,
                fotoTipo: req.file?.mimetype
            });

            res.redirect('/'+caminhoBase + 'add');
        }

        this.list = async(req, res)=>{
            const resultado = await Usuario.find({})

            res.render(caminhoBase + 'lst', {
                Usuarios: resultado
            })
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro

            const resultado = await Usuario.find({
                nome: {
                    $regex: filtro,
                    $options: 'i'
                }
            })

            res.render(caminhoBase + 'lst', {Usuarios: resultado})
        }

        this.openEdt = async(req, res)=>{
            // passar quem eu quero editar

            const id = req.params.id

            const usuario = await Usuario.findById(id)

            res.render(caminhoBase + "edt", {
                Usuario: usuario
            })
        }

        this.edt = async(req, res)=>{
            const dados = {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            }

            if (req.file) {
                dados.foto = req.file.buffer
                dados.fotoTipo = req.file.mimetype
            } else if (req.body.removerFoto === 'on') {
                dados.foto = null
                dados.fotoTipo = null
            }

            await Usuario.findByIdAndUpdate(req.params.id, dados)

            res.redirect('/'+caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
            await Usuario.findByIdAndDelete(req.params.id)

            res.redirect('/'+caminhoBase + 'lst');
        }

        this.foto = async(req, res)=>{
            const usuario = await Usuario.findById(req.params.id)

            if (!usuario?.foto) {
                return res.sendStatus(404)
            }

            res.type(usuario.fotoTipo || 'image/jpeg').send(usuario.foto)
        }

    }
}