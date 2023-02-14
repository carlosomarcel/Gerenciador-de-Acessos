import models from '../models';
export default {
    add: async (req,res,next) =>{
        try {
            const reg = await models.Artigo.create(req.body);
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
            const reg=await models.Artigo.findOne({_id:req.query._id})
            .populate('categoria',{nome:1});
            if (!reg){
                res.status(404).send({
                    message: 'O registro não existe'
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
    queryCodigo: async (req,res,next) => {
        try {
            const reg=await models.Artigo.findOne({codigo:req.query.codigo})
            .populate('categoria',{nome:1});
            if (!reg){
                res.status(404).send({
                    message: 'O registro não existe'
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
            const reg=await models.Artigo.find({$or:[{'nome':new RegExp(valor,'i')},{'descricao':new RegExp(valor,'i')}]},{createdAt:0})
            .populate('categoria',{nome:1})
            .sort({'createdAt':-1});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocorreu um erro'
            });
            next(e);
        }
    },
    update: async (req,res,next) => {
        try {
            const reg = await models.Artigo.findByIdAndUpdate({_id:req.body._id},{categoria:req.body.categoria,codigo:req.body.codigo,nome:req.body.nome,descricao:req.body.descricao,preco_venda:req.body.preco_venda,estoque:req.body.estoque});
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
            const reg = await models.Artigo.findByIdAndDelete({_id:req.body._id});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocorreu um erro'
            });
            next(e);
        }
    },
    activate: async (req,res,next) => {
        try {
            const reg = await models.Artigo.findByIdAndUpdate({_id:req.body._id},{estado:1});
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
            const reg = await models.Artigo.findByIdAndUpdate({_id:req.body._id},{estado:0});
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocorreu um erro'
            });
            next(e);
        }
    }
}
