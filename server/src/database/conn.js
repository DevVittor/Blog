import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const conn = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: process.env.MONGO_NAME,
    })
    .then(() => {
      console.log(`Banco de dados sincronizado com sucesso!`);
    })
    .catch((error) => {
      console.log(
        `Nào foi possível sincronizar com o bando de dados. Error: ${error.message}`
      );
    });
};
