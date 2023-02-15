import models from '../models';


async function aumentarEstoque(idartigo,quantidade){
    let {estoque}=await models.Artigo.findOne({_id:idartigo});
    // Aumenta quantidade de estoque somando estoque  = quantidade
    let nEstoque=parseInt(estoque)+parseInt(quantidade);
    // id do artigo que vai ser atualizado 
    const reg=await models.Artigo.findByIdAndUpdate({_id:idartigo},{estoque:nEstoque});
}

async function diminuirEstoque(idartigo,quantidade){
    let {estoque}=await models.Artigo.findOne({_id:idartigo});
    // Diminuir quantidade de estoque somando estoque  = quantidade
    let nEstoque=parseInt(estoque)-parseInt(quantidade);
    const reg=await models.Artigo.findByIdAndUpdate({_id:idartigo},{estoque:nEstoque});
}

export default {
    add: async (req,res,next) =>{
        try {
            const reg = await models.Venda.create(req.body);
            //Atualiza estoque
            let detalhes=req.body.detalhes;
            detalhes.map(function(x){
                diminuirEstoque(x._id,x.quantidade);
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
            const reg=await models.Venda.findOne({_id:req.query._id})
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
            const reg=await models.Venda.find({$or:[{'num_comprovante':new RegExp(valor,'i')},{'serie_comprovante':new RegExp(valor,'i')}]})
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
            const reg = await models.Venda.findByIdAndUpdate({_id:req.body._id},{estado:1});
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
    },
    deactivate:async (req,res,next) => {
        try {
            const reg = await models.Venda.findByIdAndUpdate({_id:req.body._id},{estado:0});
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
    // Grafico de 12 meses 
    grafico12Meses: async(req,res, next) =>{
        try {
            const reg = await models.Venda.aggregate(
                [
                    {
                        $group:{
                            _id:{
                                mes:{$month:"$criacao"},
                                year:{$year:"$criacao"}
                            },
                            total:{$sum:"$total"},
                            numero:{$sum:1}
                            }
                        
                    },
                    {
                        $sort:{
                            "_id.year":-1,"_id.mes":-1
                        }
                    }
                ]
            ).limit(12);

            res.status(200).json(reg);            
        } catch(e){
            res.status(500).send({
                message:'Ocorreu um erro'
            });
            next(e);
        }

    },
    consultaDatas: async (req,res,next) => {
        try {
            let start = req.query.start;
            let end = req.query.end;
            const reg=await models.Venda.find({"criado":{"$gte":start, "$lt": end}})
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
}
