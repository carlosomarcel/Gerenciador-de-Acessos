import models from "../models";
import bcrypt from "bcryptjs";
import token from "../services/token";

// --------------------------- Registrando no Banco------------------------

export default {
  add: async (req, res, next) => {
    try {
      // criptografando a senha
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const reg = await models.Usuario.create(req.body);
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
      const reg = await models.Usuario.findOne({ _id: req.query._id });
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
      const reg = await models.Usuario.find(
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

  // --------------------------- Atualizando dados ------------------------

  update: async (req, res, next) => {
    try {
      // criptografando o updade da senha
      let pas = req.body.password;

      const reg0 = await models.Usuario.findOne({ _id: req.body._id });

      if (pas != reg0.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }

      const reg = await models.Usuario.findByIdAndUpdate(
        { _id: req.body._id },
        {
          role: req.body.role,
          nome: req.body.nome,
          tipo_documento: req.body.tipo_documento,
          num_documento: req.body.num_documento,
          direcao: req.body.direcao,
          telefone: req.body.telefone,
          email: req.body.email,
          password: req.body.password,
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
   // --------------------------- Login ------------------------
  login: async (req, res, next) => {
    try {
      let user = await models.Usuario.findOne({ email: req.body.email, estado:1});

      if (user) {
        //existe um usuario com esse email
        let match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          let tokenReturn = await token.encode(user._id);
          res.status(200).json({user,tokenReturn})
        
        } else {
          res.status(404).send({
            message: "Senha incorreta",
          });
        }
      } else {
        res.status(404).send({
          message: "Não existe o usuário",
        });
      }
    } catch (e) {
      res.status(500).send({
        message: "Ocorreu um erro",
      });
      next(e)
    }
  },
};
