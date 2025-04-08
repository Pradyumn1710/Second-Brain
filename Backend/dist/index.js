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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const loginSchema = zod_1.z.object({
    username: zod_1.z.string().email("Invalid Email Address").min(3, "Minimum length should be 3 character"),
    password: zod_1.z.string().min(6, 'Minimum length should be 3 character')
});
const signupSchema = zod_1.z.object({
    username: zod_1.z.string()
        .min(3, 'Username must be at least 3 characters long')
        .email('Invalid email address'),
    password: zod_1.z.string()
        .min(6, 'Password must be at least 6 characters long')
});
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginDetails = loginSchema.safeParse(req.body);
    if (!loginDetails.success) {
        res.status(400).json({
            error: "Error parsing details",
            details: loginDetails.error.errors,
        });
        return;
    }
    const { username, password } = loginDetails.data;
    // searching through the db with the help of models here 
    try {
        const user = yield db_1.User.findOne({ username });
        if (!user) {
            res.status(401).json({
                msg: "Invalid details"
            });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                error: "Invalid Password"
            });
            return;
        }
        const jwtSecret = process.env.JWT_PASSWORD;
        if (!jwtSecret) {
            throw new Error("There is an error");
        }
        const token = jsonwebtoken_1.default.sign({ username: user.username }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful',
            user: { username: user.username }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const signupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDetails = signupSchema.safeParse(req.body);
    if (!userDetails.success) {
        res.status(400).json({
            error: 'Validation failed',
            details: userDetails.error.errors,
        });
        return;
    }
    const { username, password } = userDetails.data;
    try {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        // Save user to database (placeholder)
        const newUser = yield db_1.User.create({ username, password: hashedPassword });
        const jwtSecret = process.env.JWT_PASSWORD;
        if (!jwtSecret)
            throw new Error("JWT_SECRET not defined");
        const token = jsonwebtoken_1.default.sign({ username: newUser.username }, jwtSecret, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000 // 1 hour
        });
        res.status(201).json({
            message: "User created successfully",
            user: { username: newUser.username }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.post('/signup', signupHandler);
app.post('/login', loginHandler);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
