"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAuthor = exports.deleteAuthor = exports.getIdAuthor = exports.createAuthor = exports.getAuthor = void 0;
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
let data = [
    {
        "message": "hello to the freaking holiday",
        "author": "ben davies",
        "id": (0, uuid_1.v4)()
    },
    {
        "message": "hello to the freaking monday",
        "author": "joy wraught",
        "id": (0, uuid_1.v4)()
    },
    {
        "message": "hello to the freaking tuesday",
        "author": "samuel olalekan",
        "id": (0, uuid_1.v4)()
    }
];
let data1 = [];
const getAuthor = (req, res) => {
    const output = data;
    res.send(output);
};
exports.getAuthor = getAuthor;
const createAuthor = (req, res) => {
    const { message, author } = req.body;
    data1.push({
        message: message,
        author: author,
        id: "uuidv4"
        //the above code can also be written as such
        // message,
        // author,
        // id = uuidv4
    });
    res.json(data1);
};
exports.createAuthor = createAuthor;
const getIdAuthor = (req, res) => {
    const authorId = req.params.id; // this is used to get the value of the parameter "id"    res.send("userid is " + userId)
    //   res.send("the id of the user is " + userId)
    const detail = data.find((value) => {
        return value.id.toString() === authorId;
    });
    res.json(detail);
};
exports.getIdAuthor = getIdAuthor;
const deleteAuthor = (req, res) => {
    const authorId = req.params.id;
    data = data.filter((value) => {
        return (value.id !== authorId);
    });
    res.json(data);
};
exports.deleteAuthor = deleteAuthor;
const updateAuthor = (req, res) => {
    const authorId = req.params.id;
    const { message, author } = req.body;
    data = data.map((value) => {
        if (value.id === authorId) {
            return {
                message,
                author,
                id: value.id
            };
        }
        return value;
    });
    res.json(data);
};
exports.updateAuthor = updateAuthor;
//# sourceMappingURL=crud.js.map