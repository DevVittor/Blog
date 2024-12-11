import { query, body, validationResult } from "express-validator";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import commentaryModel from "../models/commentaryModel.js";

export const detailsPost = [
  query("postId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o post")
    .bail()
    .isMongoId()
    .withMessage("ID do post inválido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { postId } = req.query;
    try {
      const post = await postModel
        .findById(postId)
        .select("photos title content categories author blocked");
      if (!post) {
        return res
          .status(400)
          .json({ error: "Não foi possível localizar o post" });
      }

      res
        .status(200)
        .json({ msg: "Todos os detalhes desse post", details: post });
    } catch (error) {
      res.status(500).json({
        error: "Não foi possível mostrar detalhes do post",
        details: error.message,
      });
    }
  },
];

export const allPost = [
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (_, res) => {
    try {
      const posts = await postModel
        .find()
        .select(
          "_id author title content category commentaryId blocked edit createdAt updatedAt"
        );
      if (posts.length < 1) {
        return res
          .status(400)
          .json({ error: "No momento não tem post para mostrar" });
      }

      res
        .status(200)
        .json({ msg: "Aqui está todos os post no momento.", list: posts });
    } catch (error) {
      res.status(500).json({
        error: "Não foi possível mostrar a lista de post",
        details: error.message,
      });
    }
  },
];

export const showCommentary = [
  query("postId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o post")
    .bail()
    .isMongoId()
    .withMessage("ID do post inválido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    try {
      const { postId } = req.query;

      const commentarys = await commentaryModel.find({ postId: postId });

      if (commentarys.length < 0) {
        return res
          .status(400)
          .json({ error: "Não tem nenhum comentário nesse post" });
      }
      res
        .status(200)
        .json({ msg: "Todos os comentários do post", commentarys });
    } catch (error) {
      res.status(500).json({
        error: "Não foi possível mostrar os comentários do post",
        details: error.message,
      });
    }
  },
];

export const blockPost = [
  query("userId")
    .notEmpty()
    .withMessage("Não foi possível identificar o usuário")
    .bail()
    .isMongoId()
    .withMessage("ID de usuário inválido"),
  query("postId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o post")
    .bail()
    .isMongoId()
    .withMessage("ID do post inválido"),
  body("reason")
    .notEmpty()
    .isString()
    .isLength({ max: 500 })
    .withMessage("Não foi possível receber o motivo do bloqueio")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { userId, postId } = req.query;
    const { reason } = req.body;

    try {
      const user = await userModel.findOne({
        _id: userId,
        role: "admin",
        blocked: false,
      });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Não foi possível localizar o usuário" });
      }

      const post = await postModel.findById(postId);
      if (!post) {
        return res
          .status(400)
          .json({ error: "Não foi possível localizar o post" });
      }
      if (post.blocked === true) {
        return res.status(403).json({ error: "Esse post já está bloqueado" });
      }

      await postModel.findByIdAndUpdate(
        postId,
        { $set: { blocked: true, reason: reason } },
        { new: true }
      );

      res.status(200).json({ msg: "O post está bloqueado." });
    } catch (error) {
      res.status(500).json({
        error: "Não foi possível bloqueado o post",
        details: error.message,
      });
    }
  },
];

export const unblockPost = [
  query("userId")
    .notEmpty()
    .withMessage("Não foi possível identificar o usuário")
    .bail()
    .isMongoId()
    .withMessage("ID de usuário inválido"),
  query("postId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o post")
    .bail()
    .isMongoId()
    .withMessage("ID do post inválido"),
  body("reason")
    .notEmpty()
    .isString()
    .isLength({ max: 500 })
    .withMessage("Não foi possível receber o motivo do bloqueio")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { userId, postId } = req.query;
    const { reason } = req.body;

    try {
      const user = await userModel.findOne({
        _id: userId,
        role: "admin",
        blocked: false,
      });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Não foi possível localizar o usuário" });
      }

      const post = await postModel.findById(postId);
      if (!post) {
        return res
          .status(400)
          .json({ error: "Não foi possível localizar o post" });
      }
      if (post.blocked === false) {
        return res
          .status(403)
          .json({ error: "Esse post já está desbloqueado" });
      }

      await postModel.findByIdAndUpdate(
        postId,
        { $set: { blocked: false, reason: reason } },
        { new: true }
      );

      res.status(200).json({ msg: "O post está desbloqueado." });
    } catch (error) {
      res.status(500).json({
        error: "Não foi possível desbloqueado o post",
        details: error.message,
      });
    }
  },
];

export const createNewPost = [
  query("userId")
    .notEmpty()
    .withMessage("Não foi possível identificar o usuário")
    .bail()
    .isMongoId()
    .withMessage("ID de usuário inválido")
    .bail(),
  body("title")
    .notEmpty()
    .isString()
    //.isLength({ min: 30, max: 150 })
    .withMessage("Preencha o campo título corretamente")
    .bail(),
  body("content")
    .notEmpty()
    .isString()
    //.isLength({ min: 50, max: 500 })
    .withMessage("O conteúdo deve ter no mínimo 30 caracteres")
    .bail(),
  /*body("category").isString().withMessage("Defina uma categoria").bail(),
  body("level"),
  body("skills").isArray().isLength({ min: 3, max: 5 }).bail(),
  body("min")
    .isInt()
    .withMessage("Informe o valor minimo para o serviço")
    .bail(),
  body("max")
    .isInt()
    .withMessage("Informe o valor máximo para o serviço")
    .bail(),
  body("contact")
    .isString()
    //.isLength({ min: 15 })
    .withMessage("Informe o seu número de contato")
    .bail(),*/
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { userId } = req.query;
    const { title, content, category, level, skills, min, max, contact } =
      req.body;

    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(400).json({ error: "Esse usuário não existe." });
      }

      if (user.blocked === true) {
        return res.status(403).json({ error: "Usuário bloqueado." });
      }

      if (user.limit < 1) {
        return res.status(400).json({ error: "Você não tem mais créditos." });
      }

      const postDuplicate = await postModel.findOne({ title });
      if (postDuplicate) {
        return res
          .status(403)
          .json({ error: "Já existe um post com esse nome." });
      }

      const newPost = await postModel.create({
        userId,
        author: user.username,
        title,
        content,
        category,
        level,
        skills,
        min,
        max,
        contact,
      });

      await userModel.findByIdAndUpdate(
        userId,
        {
          $push: { postId: newPost._id },
          $inc: { limit: -1 },
          $set: { role: "author" },
        },
        { new: true }
      );
      res.status(201).json({ msg: "Post criado com sucesso", post: newPost });
    } catch (error) {
      res.status(500).json({
        error:
          "Não foi possível receber os dados necessários para criar um novo post",
        details: error.message,
      });
    }
  },
];

export const alterTitle = [
  query("userId")
    .notEmpty()
    .withMessage("Não foi possível identificar o usuário")
    .bail()
    .isMongoId()
    .withMessage("ID de usuário inválido"),
  query("postId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o post")
    .bail()
    .isMongoId()
    .withMessage("ID do post inválido"),
  body("newTitle")
    .notEmpty()
    .isString()
    .isLength({ min: 10, max: 150 })
    .withMessage("Preencha o campo do novo título não está correto.")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { postId, userId } = req.query;
    const { newTitle } = req.body;
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res
          .status(400)
          .json({ error: "Não foi possível encontrar esse usuário" });
      }

      if (user.blocked === true) {
        return res.status(403).json({ error: "Usuário bloqueado." });
      }

      const myPost = await postModel.findById(postId);

      if (!myPost) {
        return res
          .status(400)
          .json({ error: "Não foi possível localizar esse post" });
      }

      // Verifica se o post pertence ao usuário
      const post = await postModel.findOne({
        _id: postId,
        userId,
        title: myPost.title,
      });
      if (!post) {
        return res.status(404).json({
          error: "Post não encontrado ou não pertence a este usuário.",
        });
      }

      if (post.title == newTitle) {
        return res
          .status(403)
          .json({ error: "O seu novo titulo está igual o antigo" });
      }

      // Verifica se o novo título já existe em outro post
      const existingPost = await postModel.findOne({
        title: newTitle,
        _id: { $ne: postId }, // Garante que não é o mesmo post
      });
      if (existingPost) {
        return res.status(400).json({ error: "Esse título já está em uso." });
      }

      await postModel.findByIdAndUpdate(
        postId,
        { $set: { title: newTitle, edit: true } },
        { new: true }
      );
      res.status(200).json({
        msg: `O seu post mudou de titulo.`,
      });
    } catch (error) {
      res.status(500).json({
        error: "Não foi possível editar o titulo do post.",
        details: error.message,
      });
    }
  },
];

export const alterContent = [
  query("userId")
    .notEmpty()
    .withMessage("Não foi possível identificar o usuário")
    .bail()
    .isMongoId()
    .withMessage("ID de usuário inválido"),
  query("postId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o post")
    .bail()
    .isMongoId()
    .withMessage("ID do post inválido"),
  body("content")
    .notEmpty()
    .isString()
    .isLength({ min: 30, max: 500 })
    .withMessage("O conteúdo deve ter no mínimo 30 caracteres")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { userId, postId } = req.query;
    const { content } = req.body;

    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res
          .status(400)
          .json({ error: "Nào foi possível localizar o usuário" });
      }
      if (user.blocked === true) {
        return res.status(403).json({ error: "Usuário bloqueado" });
      }
      const post = await postModel.findById(postId);
      if (!post) {
        return res.status(400).json({ error: "O post não foi localizado" });
      }

      if (post.blocked === true) {
        return res
          .status(403)
          .json({ error: "Esse post está bloqueado no momento." });
      }

      if (userId !== post.userId) {
        return res
          .status(403)
          .json({ error: "Você não tem permissão para alterar o conteudo" });
      }

      if (post.content === content) {
        return res
          .status(400)
          .json({ error: "Você digitou o mesmo conteúdo." });
      }

      await postModel.findByIdAndUpdate(
        postId,
        { $set: { content: content, edit: true } },
        { new: true }
      );

      res.status(200).json({ msg: "O conteúdo do post foi alterado!" });
    } catch (error) {
      res.status(500).json({
        error: "Não foi possível alterar o conteúdo do post",
        details: error.message,
      });
    }
  },
];

export const deletePost = [
  query("userId")
    .notEmpty()
    .withMessage("Não foi possível identificar o usuário")
    .bail()
    .isMongoId()
    .withMessage("ID de usuário inválido"),
  query("postId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o post")
    .bail()
    .isMongoId()
    .withMessage("ID do post inválido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { userId, postId } = req.query;
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(400).json({ error: "Esse usuário não existe" });
      }

      if (user.blocked === true) {
        return res.status(403).json({ error: "Usuário bloqueado" });
      }

      const myPost = await postModel.findOne({ userId: userId, _id: postId });
      if (!myPost) {
        return res
          .status(400)
          .json({ error: "Você não tem permissão para deletar esse post" });
      }

      await postModel.findByIdAndDelete(postId);
      await userModel.findByIdAndUpdate(
        userId,
        { $pull: { postId: postId }, $inc: { limit: 1 } },
        { new: true }
      );

      res.status(200).json({
        msg: "Post delete com sucesso e você recebeu mais 1 de limite",
      });
    } catch (error) {
      res.status(500).json({
        error: "Erro ao deletar o post. Tente novamente mais tarde.",
        details: error.message,
      });
    }
  },
];
