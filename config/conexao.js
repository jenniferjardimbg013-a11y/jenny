import mongoose from "mongoose";
//const url = "mongodb+srv://marcelosiedler:ifsul@ifsul.fify4.mongodb.net/"
const url = "mongodb+srv://aluno:123@cluster0.qv9piyh.mongodb.net/?appName=Cluster0"
const conexao = await mongoose.connect(url)

export default conexao

const MarcaSchema = conexao.Schema({
    nome:{type:String, required:true},
    foto:{type:Buffer}
    })