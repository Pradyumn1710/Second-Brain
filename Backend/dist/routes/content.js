"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRouter = void 0;
const express_1 = __importDefault(require("express"));
const contentAddHandler_1 = require("../controller/contentAddHandler");
const userMiddleware_1 = require("../middleware/userMiddleware");
exports.contentRouter = express_1.default.Router();
exports.contentRouter.post('/add', userMiddleware_1.userAuthMiddleware, contentAddHandler_1.contentAddHandler);
exports.contentRouter.get('/show', userMiddleware_1.userAuthMiddleware, contentAddHandler_1.contentShowHandler);
