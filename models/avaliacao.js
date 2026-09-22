import conexao from '../config/conexao.js'

const Avaliacao = conexao.Schema({

    usuario: {
        type: conexao.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    jogo: {
        type: conexao.Types.ObjectId,
        ref: 'Jogo',
        required: true
    },

    nota: {type:Number, required:true},

    comentario: {type:String, required:true},

    data: {type:Date, required:true}

})

export default conexao.model('Avaliacao', Avaliacao)