import conexao from '../config/conexao.js'

const Avaliacao = conexao.Schema({

    usuario: {type:String, required:true},

    jogo: {type:String, required:true},

    nota: {type:Number, required:true},

    comentario: {type:String, required:true},

    data: {type:Date, required:true}

})

export default conexao.model('Avaliacao', Avaliacao)