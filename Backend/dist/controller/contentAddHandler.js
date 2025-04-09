"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentShowHandler = exports.contentAddHandler = void 0;
const db_1 = require("../db");
const contentAddHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    try {
        const contentEntry = yield db_1.Content.create({
            link,
            type,
            title,
            //@ts-ignore
            userId: req.userId,
            tags: []
        });
    }
    catch (error) {
        console.log("There is error creating entry in the Database :", error);
        return;
    }
    res.status(200).json("Content is added in the database");
    return;
});
exports.contentAddHandler = contentAddHandler;
const contentShowHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    try {
        const content = yield db_1.Content.find({
            userId: userId
        }).populate('userId', 'username');
        console.log(content);
        res.status(200).json({
            content
        });
        return;
    }
    catch (error) {
        console.log("There is an error gathering content from db");
        return;
    }
});
exports.contentShowHandler = contentShowHandler;
