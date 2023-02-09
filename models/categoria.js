import mongoose,{Schema} from "mongoose";

const categoriaSchema = new Schema({
    nome:{type:String, maxlength:50, unique:true, required:true},
    descricao:{type:String, maxlength:255},
    estado:{type:Number, default:1},
    criacao:{type:Date, default:Date.now}

});


const Categoria = mongoose.model('categoria', categoriaSchema);

export default Categoria;