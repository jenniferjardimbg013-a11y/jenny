import conexao from '../config/conexao.js'

const Jogo = conexao.Schema({

    titulo: {type:String, required:true},

    descricao: {type:String, required:true},

    anoLancamento: {type:Number, required:true},

    classificacaoEtaria: {type:String, required:true},

    dificuldade: {type:String, required:true},

    desenvolvedora: {type:String, required:true},

    genero: {type:String, required:true},

    plataforma: {type:String, required:true},

    capa: {type:Buffer},

    capaTipo: {type:String}

})

export default conexao.model('Jogo', Jogo)