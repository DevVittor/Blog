import { query, body, validationResult } from "express-validator";
import userModel from "../models/userModel.js";
import commentaryModel from "../models/commentaryModel.js";
import postModel from "../models/postModel.js";

export const publishCommentary = [
  query("userId")
    .notEmpty()
    .isString()
    .trim()
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
  body("commentary")
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage("Preencha o comentário corretamente")
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
    const { commentary } = req.body;
    try {
      const user = await userModel.findById(userId);

      if (!user) {
        return (
          res.status(400),
          json({ error: "Não foi possível localizar o usuário" })
        );
      }

      if (user.blocked === true) {
        return res.status(403).json({ error: "Usuário bloqueado." });
      }

      const post = await userModel.findById(postId);
      if (!post) {
        return res
          .status(400)
          .json({ error: "Não foi possível localizar esse post" });
      }

      if (post.blocked === true) {
        return res.status(403).json({ error: "Esse post está bloqueado" });
      }

      const comment = await commentaryModel.create({
        userId,
        postId,
        name: user.username,
        commentary,
      });

      await userModel.findByIdAndUpdate(userId, {
        $push: { commentaryId: comment._id },
      });

      await postModel.findByIdAndUpdate(postId, {
        $push: { commentaryId: comment._id },
      });
      res.status(201).json({ error: "Comentário Enviado" });
    } catch (error) {
      res.status(500).json({
        error: "Não foi possível criar uma comentário nesse post.",
        details: error.message,
      });
    }
  },
];

export const editarComment = [
  query("userId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o usuário")
    .bail()
    .isMongoId()
    .withMessage("ID de usuário inválido"),
  query("commentaryId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o comentário")
    .bail()
    .isMongoId()
    .withMessage("ID do comentário inválido"),
  body("newComment")
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage("Preencha o novo comentário corretamente")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { userId, commentaryId } = req.query;
    const { newComment } = req.body;
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res
          .status(400)
          .json({ error: "Não foi possível localizar o usuário" });
      }
      if (user.blocked === true) {
        return res.status(403).json({ error: "Usuário bloqueado" });
      }
      const comment = await commentaryModel.findById(commentaryId);

      if (user.commentaryId !== comment._id) {
        return res
          .status(403)
          .json({ error: "Você não pode editar esse comentário" });
      }

      if (comment.commentary === newComment) {
        return res
          .status(403)
          .json({ error: "Você digitou o mesmo comentário." });
      }

      await commentaryModel.findByIdAndUpdate(
        commentaryId,
        {
          $set: { commentary: newComment, edited: true },
        },
        { new: true }
      );

      res.status(200).json({ msg: "Seu comentário foi editado." });
    } catch (error) {
      res.status(500).json({
        error: "Não foi possível editar o comentário.",
        details: error.message,
      });
    }
  },
];

export const removeComment = [
  query("userId"),
  query("commentaryId"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { userId, commentaryId } = req.query;
    try {
      const user = await userModel.findById(userId);

      if (!user) {
        return res
          .status(400)
          .json({ error: "Não foi possível identificar o usuário" });
      }

      if (user.blocked === true) {
        return res.status(403).json({ error: "Usuário bloqueado" });
      }

      const comment = await commentaryModel.findById(commentaryId);

      if (!comment) {
        return res
          .status(400)
          .json({ error: "Não encontrei esse seu comentário" });
      }

      if (comment.blocked === true) {
        return res.status(403).json({
          error: "Não tem como remover um comentário que foi bloqueado",
        });
      }

      if (comment.userId === userId || post.userId === userId) {
        await postModel.findByIdAndUpdate(
          comment.postId,
          {
            $pull: { commentaryId: comment._id },
          },
          { new: true }
        );
        await userModel.findByIdAndUpdate(
          comment.userId,
          {
            $pull: { commentaryId: comment._id },
          },
          { new: true }
        );
        await commentaryModel.findByIdAndDelete(commentaryId);
      }

      res.status(200).json({ msg: "O comentário foi removido" });
    } catch (error) {
      res.status(500).json({
        error: "Não foi possivel deletar o comentário",
        details: error.message,
      });
    }
  },
];
