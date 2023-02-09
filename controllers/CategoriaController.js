import models from "../models";

// --------------------------- Registrando no Banco------------------------

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Categoria.create(req.body);
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro",
      });
      next(e);
    }
  },

// --------------------------- Busca por ID ------------------------

  query: async (req, res, next) => {
    try {
        const reg = await models.Categoria.findOne({_id:req.query._id});
        if (!reg){
            res.status(404).send({
                message:"Registro não existe"
            });
        }else{
            res.status(200).json(reg);
        }
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro",
      });
      next(e);
    }
  },

// --------------------------- Listando dados -------------------------------


  list: async (req, res, next) => {
    try {
        const reg = await models.Categoria.find({});       
            res.status(200).send(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro",
      });
      next(e);
    }
  },

// --------------------------- Atualizando dados ------------------------

  update: async (req, res, next) => {
    try {
        const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{nome:req.body.nome, descricao:req.body.descricao});
        res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro",
      });
      next(e);
    }
  },

 // --------------------------- Deletando dados ------------------------ 

  remove: async (req, res, next) => {
    try {
        const reg = await models.Categoria.findOneAndDelete({_id:req.body._id});
        res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro",
      });
      next(e);
    }
  },

// --------------------------- Ativos  ------------------------

  activete: async (req, res, next) => {
    try {
        const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id}, {estado:1});
        res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro",
      });
      next(e);
    }
  },

// --------------------------- Desativados ------------------------

  deactivate: async (req, res, next) => {
    try {
        const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id}, {estado:0});
        res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro",
      });
      next(e);
    }
  },
};
