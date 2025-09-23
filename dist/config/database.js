"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || "", process.env.DB_USER || "", process.env.DB_PASSWORD || "", {
    host: process.env.DB_HOST || "",
    dialect: "postgres",
    define: {
        timestamps: true, // Enable timestamps globally
        createdAt: "created_at", // Custom name for createdAt
        updatedAt: false, // Custom name for updatedAt
    },
    logging: console.log, // Enable logging
});
exports.default = exports.sequelize;
