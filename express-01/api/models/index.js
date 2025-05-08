import Sequelize from "sequelize";

import getUserModel from "./user";
import getMessageModel from "./message";

// const sequelize = new Sequelize(process.env.DB_URL);

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  protocol: "postgres",
  // logging: false, // Disable SQL query logging (set to true to debug)
  dialectOptions: {
    // Necessary for SSL on Render.com
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const models = {
  User: getUserModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
