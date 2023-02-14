import models from '../models';


async function aumentarEstoque(idartigo,quantidade){
    let {estoque}=await models.Artigo.findOne({_id:idartigo});
    // Aumenta quantidade de estoque somando estoque  = quantidade
    let nEstoque=parseInt(estoque)+parseInt(quantidade);
    // id do artigo que vai ser atualizado 
    const reg=await models.Artigo.findByIdAndUpdate({_id:idartigo},{estoque:nEstoque});
}

async function diminuirEstoque(idartigo,qua){
    let {estoque}=await models.Artigo.findOne({_id:idartigo});
    // Diminuir quantidade de estoque somando estoque  = quantidade
    let nestoque=parseInt(estoque)-parseInt(quantidade);
    const reg=await models.Artigo.findByIdAndUpdate({_id:idartigo},{estoque:nestoque});
}

export default {
    add: async (req,res,next) =>{
        try {
            const reg = await models.Boleto.create(req.body);
            //Atualiza estoque
            let detalhes=req.body.detalhes;
            detalhes.map(function(x){
                aumentarEstoque(x._id,x.quantidade);
            });
            res.status(200).json(reg);
        } catch (e){
            res.status(500).send({
                message:'Ocorreu um erro'
            });
            next(e);
        }
    },
    query: async (req,res,next) => {
        try {
            const reg=await models.Boleto.findOne({_id:req.query._id})
            .populate('usuario',{nome:1})
            .populate('pessoa',{nome:1});
            if (!reg){
                res.status(404).send({
                    message: 'Registro não existe'
                });
            } else{
                res.status(200).json(reg);
            }
        } catch(e){
            res.status(500).send({
                message:'Ocorreu um erro'
            });
            next(e);
        }
    },
    list: async (req,res,next) => {
        try {
            let valor=req.query.valor;
            const reg=await models.Boleto.find({$or:[{'num_comprovante':new RegExp(valor,'i')},{'serie_comprovante':new RegExp(valor,'i')}]},{criacao:0})
            .populate('usuario',{nome:1})
            .populate('pessoa',{nome:1})
            .sort({'criacao':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocorreu um erro'
            });
            next(e);
        }
    },
    /*
    update: async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{nome:req.body.nome,descripcion:req.body.descripcion});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocorreu um erro'
            });
            next(e);
        }
    },
    remove: async (req,res,next) => {
        try {
            const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocorreu um erro'
            });
            next(e);
        }
    },
    */
    activate: async (req,res,next) => {
        try {
            const reg = await models.Boleto.findByIdAndUpdate({_id:req.body._id},{estado:1});
            //Atualizar estoque
            let detalhes=reg.detalhes;
            detalhes.map(function(x){
                aumentarEstoque(x._id,x.quantidade);
            });
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocorreu um erro'
            });
            next(e);
        }
    },
    deactivate:async (req,res,next) => {
        try {
            const reg = await models.Boleto.findByIdAndUpdate({_id:req.body._id},{estado:0});
            //Atualizar estoque
            let detalhes=reg.detalhes;
            detalhes.map(function(x){
                diminuirEstoque(x._id,x.quantidade);
            });
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocorreu um erro'
            });
            next(e);
        }
    }
}
