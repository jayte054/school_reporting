"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const getUserData = () => {
    const jsonData = require(path_1.default.join(__dirname, "database.json"));
    console.log(jsonData);
    return JSON.parse(jsonData);
};
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs_1.default.writeFileSync("./database.json", stringifyData);
};
app.get("/", (req, res) => {
    const output = getUserData();
    res.send(output);
});
app.post("/user/data", (req, res) => {
    const existUser = getUserData();
    const userData = req.body;
    existUser.push(userData);
});
app.listen(2000, () => {
    console.log("app is listening on port 2000");
});
//# sourceMappingURL=crud.js.map