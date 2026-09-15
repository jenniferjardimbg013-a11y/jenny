import conexao from '../config/conexao.js'

const Plataforma = conexao.Schema({

    nome: {type:String, required:true},

    fabricante: {type:String, required:true},

    anoLancamento: {type:Number, required:true}

})

export default conexao.model('Plataforma', Plataforma)