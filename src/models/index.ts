import { sequelize } from "../config/database";
import fs from "fs";

const db: { sequelize: typeof sequelize; models: { [key: string]: any } } = {
  sequelize,
  models: {},
};

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.ts" && file.endsWith(".ts"))
  .forEach((file) => {
    const modelDef = require(`./${file}`).default;
    db.models[modelDef.name] = modelDef;
  });

Object.keys(db.models).forEach((modelName) => {
  if ("associate" in db.models[modelName]) {
    db.models[modelName].associate(db.models);
  }
});

export default db;