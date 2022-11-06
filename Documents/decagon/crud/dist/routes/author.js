"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
const crud_1 = require("../controllers/crud");
app.get("/", crud_1.getAuthor);
app.post("/user", crud_1.createAuthor);
app.get("/user/:id", crud_1.getIdAuthor);
app.delete("/user/:id", crud_1.deleteAuthor);
app.put("/user/:id", crud_1.updateAuthor);
exports.default = app;
//# sourceMappingURL=author.js.map