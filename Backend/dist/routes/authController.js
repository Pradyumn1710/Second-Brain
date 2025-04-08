"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../controller/authentication");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/signup', authentication_1.signupHandler);
exports.userRouter.post('/login', authentication_1.loginHandler);
