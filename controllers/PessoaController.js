import models from "../models";

// --------------------------- Registrando a pessoa no Banco------------------------

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Pessoa.create(req.body);
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
      const reg = await models.Pessoa.findOne({ _id: req.query._id });
      if (!reg) {
        res.status(404).send({
          message: "Registro não existe",
        });
      } else {
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
      let valor = req.query.valor;
      // filtrando a busca
      const reg = await models.Pessoa.find(
        {
          $or: [
            { nome: new RegExp(valor, "i") },
            { email: new RegExp(valor, "i") },
          ],
        },
        { criacao: 0 }
      ).sort({ criacao: -1 });
      res.status(200).send(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro",
      });
      next(e);
    }
  },

  // --------------------------- Listando Clientes -------------------------------

  listClientes: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      // filtrando a busca
      const reg = await models.Pessoa.find(
        {
          $or: [
            { nome: new RegExp(valor, "i") },
            { email: new RegExp(valor, "i") },
          ],
          tipo_pessoa: "cliente",
        },
        { criacao: 0 }
      ).sort({ criacao: -1 });
      res.status(200).send(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro",
      });
      next(e);
    }
  },
  // --------------------------- Listando Fornecedores -------------------------------

  listFornecedores: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      // filtrando a busca
      const reg = await models.Pessoa.find(
        {
          $or: [
            { nome: new RegExp(valor, "i") },
            { email: new RegExp(valor, "i") },
          ],
          tipo_pessoa: "fornecedor",
        },
        { criacao: 0 }
      ).sort({ criacao: -1 });
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
      const reg = await models.Pessoa.findByIdAndUpdate(
        { _id: req.body._id },
        {
          tipo_pessoa: req.body.tipo_pessoa,
          nome: req.body.nome,
          tipo_documento: req.body.tipo_documento,
          num_documento: req.body.num_documento,
          direcao: req.body.direcao,
          telefone: req.body.telefone,
          email: req.body.email,
        }
      );
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
      const reg = await models.Usuario.findOneAndDelete({ _id: req.body._id });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro",
      });
      next(e);
    }
  },

  // --------------------------- Ativos  ------------------------

  activate: async (req, res, next) => {
    try {
      const reg = await models.Usuario.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 1 }
      );
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
      const reg = await models.Usuario.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 0 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro",
      });
      next(e);
    }
  },
};
