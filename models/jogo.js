import conexao from '../config/conexao.js'

const Jogo = conexao.Schema({

    titulo: {type:String, required:true},

    descricao: {type:String, required:true},

    anoLancamento: {type:Number, required:true},

    classificacaoEtaria: {type:String, required:true},

    dificuldade: {type:String, required:true},

    desenvolvedora: {
        type: conexao.Types.ObjectId,
        ref: 'Desenvolvedora',
        required: false
    },

    genero: {
        type: conexao.Types.ObjectId,
        ref: 'Genero',
        required: false
    },

    plataforma: {
        type: conexao.Types.ObjectId,
        ref: 'Plataforma',
        required: false
    },

    capa: {type:Buffer},

    capaTipo: {type:String}

})

export default conexao.model('Jogo', Jogo)