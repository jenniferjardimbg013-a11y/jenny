import conexao from '../config/conexao.js'

const Desenvolvedora = conexao.Schema({

    nome: {
        type: String,
        required: true
    },

    pais: {
        type: String,
        required: true
    },

    anoFundacao: {
        type: Number,
        required: true
    }

})

export default conexao.model('Desenvolvedora', Desenvolvedora)
