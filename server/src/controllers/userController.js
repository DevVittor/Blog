import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import path from "node:path";
import fs from "node:fs";
import sharp from "sharp";
import { body, query, validationResult } from "express-validator";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export const listUser = [
  query("userId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o usuário")
    .bail()
    .isMongoId()
    .withMessage("ID de usuário inválido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { userId } = req.query;
    try {
      const isAdmin = await userModel.findOne({ _id: userId, role: "admin" });
      if (!isAdmin) {
        return res
          .status(403)
          .json({ error: "Você não tem permissão para prosseguir!" });
      }

      const countUsers = await userModel.countDocuments();
      if (countUsers < 1) {
        return res.status(400).json({ error: "Não tem usuários cadastrados" });
      }

      const users = await userModel.find({ role: { $ne: "admin" } });
      if (users.length < 1) {
        return res.status(400).json({
          error:
            "Só tem a conta admin cadastrada, sem nenhum outro tipo de conta",
        });
      }
      res
        .status(200)
        .json({ msg: "Aqui está a lista de usuários", list: users });
    } catch (error) {
      res.status(500).json({
        error: "Não foi possível mostrar todos os usuários",
        details: error.message,
      });
    }
  },
];

export const detailsUser = [
  query("userId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o usuário")
    .bail()
    .isMongoId()
    .withMessage("ID de usuário inválido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { userId } = req.query;
    try {
      const user = await userModel
        .findById(userId)
        .select("username email limit role blocked createdAt updatedAt");
      if (!user) {
        return res
          .status(400)
          .json({ error: "Não foi possível localizar o usuário" });
      }

      if (user.blocked === true) {
        return res.status(403).json({ error: "Usuário bloqueado." });
      }

      res.status(200).json({ msg: "Detalhe do usuário", details: user });
    } catch (error) {
      res.status(500).json({
        error: "Não foi possível mostrar nada sobre o usuário",
        details: error.message,
      });
    }
  },
];

export const registerNewUser = [
  body("username")
    .notEmpty()
    .isString()
    .isLength({ min: 2, max: 32 })
    .withMessage("O campo nome nào foi preenchido corretamente.")
    .bail(),
  body("email")
    .notEmpty()
    .isString()
    .isEmail()
    .trim()
    .withMessage("O campo email não foi preenchido corretamente.")
    .bail(),
  body("password")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("O campo senha não foi preenchida corretamente.")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { username, email, password } = req.body;
    const avatar = req.file;

    let filePath;

    try {
      const pathFolder = path.join("src", "upload", "user");

      if (avatar) {
        // Verifica e cria a pasta se não existir
        if (!fs.existsSync(pathFolder)) {
          fs.mkdirSync(pathFolder, { recursive: true });
        }
        const nameFile = `${username.toLowerCase()}_${Date.now()}_${Math.floor(
          Math.random() * 1e9
        )}.webp`;

        // Caminho completo do arquivo
        filePath = path.join(nameFile);

        // Processa e otimiza a imagem com Sharp
        await sharp(avatar.buffer)
          .resize(300, 300, {
            fit: sharp.fit.cover, // Garante o corte proporcional
          })
          .toFormat("webp", { quality: 80 }) // Converte para WebP com qualidade 80
          .toFile(`${pathFolder}/${nameFile}`); // Salva no diretório especificado
      } else {
        // Caminho para a foto padrão
        filePath = "picture_empty.webp";
      }

      const emailRegistered = await userModel.findOne({ email });
      if (emailRegistered) {
        return res.status(400).json({ error: "Esse email já foi cadastrado." });
      }

      const createPasswordWithHash = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({
        avatar: filePath,
        username,
        email,
        password: createPasswordWithHash,
      });

      const payload = {
        _id: newUser._id,
        role: newUser.role,
      };

      const token = jwt.sign(payload, secret, {
        expiresIn: "7d",
      });

      const sevenDays = 1000 * 60 * 60 * 24 * 7;

      const cookieOptions = {
        httpOnly: true,
        maxAge: sevenDays,
        secure: false, // Quando estiver usando o HTTPS troque para true
        priority: "high",
        signed: false, // Não assinado (valor padrão)
        sameSite: "lax",
      };

      res
        .status(201)
        .cookie("access_token", `Bearer ${token}`, cookieOptions)
        .json({ msg: "User created successfully", token });
    } catch (error) {
      res.status(500).json({
        error:
          "Não foi possível receber os dados necessários para criar um novo usuário",
        details: error.message,
      });
    }
  },
];

export const login = [
  body("email")
    .notEmpty()
    .isString()
    .isEmail()
    .trim()
    .withMessage("O campo email não foi preenchido corretamente.")
    .bail(),
  body("password")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Preencha a senha corretamente.")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ error: "Usuário não encontrado ou email inválido." });
      }

      if (user.blocked === true) {
        return res.status(403).json({ error: "Usuário bloqueado." });
      }

      const verifyPasswordWithHash = await bcrypt.compare(
        password,
        user.password
      );
      if (!verifyPasswordWithHash) {
        return res.status(400).json({ error: "Senha inválida." });
      }

      const payload = {
        _id: user._id,
        role: user.role,
      };

      const token = jwt.sign(payload, secret, {
        expiresIn: "7d",
      });

      const sevenDays = 1000 * 60 * 60 * 24 * 7;

      const cookieOptions = {
        httpOnly: true,
        maxAge: sevenDays,
        secure: false,
        priority: "high",
        signed: false,
        sameSite: "lax",
      };

      res
        .status(200)
        .cookie("access_token", `Bearer ${token}`, cookieOptions)
        .json({ msg: "Login Done", token });
    } catch (error) {
      res.status(500).json({
        error:
          "Não foi possível receber os dados necessários para fazer o login",
        details: error.message,
      });
    }
  },
];

export const blockUser = [
  query("adminId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o admin")
    .bail()
    .isMongoId()
    .withMessage("ID do admin está inválido"),
  query("userId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o usuário")
    .bail()
    .isMongoId()
    .withMessage("ID de usuário inválido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { adminId, userId } = req.query;
    try {
      const admin = await userModel.findOne({
        _id: adminId,
        role: "admin",
        blocked: false,
      });
      if (!admin) {
        return res
          .status(400)
          .json({ error: "Você não tem permissão para prosseguir" });
      }

      const user = await userModel.findOne({ _id: userId, blocked: true });
      if (!user) {
        return res
          .status(403)
          .json({ error: "Não foi possível bloquear esse usuário" });
      }

      await userModel.findByIdAndUpdate(
        userId,
        { $set: { blocked: true } },
        {
          new: true,
        }
      );
      res.status(200).json({ msg: "Esse usuário foi bloqueado" });
    } catch (error) {
      res.status(500).json({
        error: "Não foi possível bloquear o usuário",
        details: error.message,
      });
    }
  },
];

export const unblockUser = [
  query("adminId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o admin")
    .bail()
    .isMongoId()
    .withMessage("ID do admin está inválido"),
  query("userId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o usuário")
    .bail()
    .isMongoId()
    .withMessage("ID de usuário inválido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { adminId, userId } = req.query;
    try {
      const admin = await userModel.findOne({
        _id: adminId,
        role: "admin",
        blocked: false,
      });
      if (!admin) {
        return res
          .status(400)
          .json({ error: "Você não tem permissão para prosseguir" });
      }

      const user = await userModel.findOne({ _id: userId, blocked: false });
      if (!user) {
        return res
          .status(403)
          .json({ error: "Não foi possível desbloquear esse usuário" });
      }

      await userModel.findByIdAndUpdate(
        userId,
        { $set: { blocked: false } },
        {
          new: true,
        }
      );
      res.status(200).json({ msg: "Esse usuário foi desbloqueado" });
    } catch (error) {
      res.status(500).json({
        error: "Não foi possível desbloquear o usuário",
        details: error.message,
      });
    }
  },
];

export const alterEmail = [
  query("userId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o usuário")
    .bail()
    .isMongoId()
    .withMessage("ID de usuário inválido"),
  body("email")
    .notEmpty()
    .isString()
    .isEmail()
    .trim()
    .withMessage("O email atual é inválido")
    .bail(),
  body("newEmail")
    .notEmpty()
    .isString()
    .isEmail()
    .trim()
    .withMessage("O novo email é inválido")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { userId } = req.query;
    const { email, newEmail } = req.body;
    try {
      const user = await userModel.findOne({ _id: userId, email });
      if (!user) {
        return res
          .status(404)
          .json({ error: "Usuário não encontrado ou email inválido." });
      }

      if (user.blocked === true) {
        return res.status(403).json({ error: "Usuário bloqueado." });
      }

      const emailExists = await userModel.findOne({ email: newEmail });
      if (emailExists) {
        return res.status(400).json({ error: "Esse email já foi cadastrado." });
      }

      const updateUser = await userModel.findByIdAndUpdate(
        userId,
        { $set: { email: newEmail } },
        { new: true }
      );

      res
        .status(200)
        .json({ msg: "Email alterado com sucesso", user: updateUser.email });
    } catch (error) {
      res.status(500).json({
        error:
          "Não foi possível receber os dados necessários para alterar o email.",
        details: error.message,
      });
    }
  },
];

export const alterPassword = [
  query("userId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o usuário")
    .bail()
    .isMongoId()
    .withMessage("ID de usuário inválido"),
  body("password")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Não foi possível alterar a senha")
    .bail(),
  body("newPassword")
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Não foi possível alterar a senha")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { userId } = req.query;
    const { password, newPassword } = req.body;
    try {
      const user = await userModel.findById(userId);

      if (!user) {
        return res
          .status(404)
          .json({ error: "Usuário não encontrado ou email inválido." });
      }
      if (user.blocked === true) {
        return res.status(403).json({ error: "Usuário bloqueado." });
      }

      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (!passwordCorrect) {
        return res.status(400).json({ error: "Senha inválida" });
      }

      const createNewPasswordWithHash = await bcrypt.hash(newPassword, 10);

      await userModel.findByIdAndUpdate(
        userId,
        { $set: { password: createNewPasswordWithHash } },
        { new: true }
      );

      res.status(200).json({ msg: "Senha alterado com sucesso" });
    } catch (error) {
      res.status(500).json({
        error:
          "Não foi possível receber os dados necessários para alterar o email.",
        details: error.message,
      });
    }
  },
];

export const deleteUser = [
  query("userId")
    .notEmpty()
    .isString()
    .trim()
    .withMessage("Não foi possível identificar o usuário")
    .bail()
    .isMongoId()
    .withMessage("ID de usuário inválido"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next();
  },
  async (req, res) => {
    const { userId } = req.query;
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(400).json({ error: "Usuário não foi encontrado." });
      }

      if (user.blocked === true) {
        return res.status(400).json({ error: "Usuário bloqueado." });
      }

      await userModel.findByIdAndDelete(userId);

      const sevenDays = 1000 * 60 * 60 * 24 * 7;

      const cookieOptions = {
        httpOnly: true,
        maxAge: sevenDays,
        secure: false, // Quando estiver usando o HTTPS troque para true
        priority: "high",
        signed: false, // Não assinado (valor padrão)
        sameSite: "lax",
      };

      res
        .status(200)
        .clearCookie("access_token", cookieOptions)
        .json({ msg: "User Deleted" });
    } catch (error) {
      res.status(500).json({
        error:
          "Não foi possível receber os dados necessários para deletar a sua conta",
      });
    }
  },
];
