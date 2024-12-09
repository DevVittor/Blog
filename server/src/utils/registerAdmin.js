import dotenv from "dotenv";
dotenv.config();
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const registerAdmin = async () => {
  const username = process.env.USERNAME_ADMIN;
  const email = process.env.EMAIL_ADMIN;
  const password = process.env.PASSWORD_ADMIN;

  if (!username || !email || !password) {
    return console.log(
      "Todas as variáveis de ambiente devem está preenchidas corretamente."
    );
  }

  try {
    const duplicateAdmin = await userModel.findOne({
      $or: [{ email, role: "admin" }, { role: "admin" }],
    });

    if (duplicateAdmin) {
      return console.log("Já tem um admin cadastrado.");
    }

    const createPasswordWithHash = await bcrypt.hash(password, 10);

    await userModel.create({
      username,
      email,
      password: createPasswordWithHash,
      role: "admin",
    });

    console.log("Conta admin foi criada");
  } catch (error) {
    return console.log(
      `Não foi possível criar a conta de admin. Error: ${error.message}`
    );
  }
};
