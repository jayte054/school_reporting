"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeBackslash = escapeBackslash;
exports.getWorkspaceFolderByName = getWorkspaceFolderByName;

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function escapeBackslash(path) {
  (0, _debug2.default)("vscode-wsl-workspacefolder:directory")(`escapeBackslash path: ${path}`);
  return path.replace(/\\/g, "\\\\");
}

function getWorkspaceFolderByName(workspaceFolders, workspaceFolderName) {
  (0, _debug2.default)("vscode-wsl-workspacefolder:directory")("getWorkspaceFolderByName workspaceFolders: %o", workspaceFolders);
  (0, _debug2.default)("vscode-wsl-workspacefolder:directory")(`getWorkspaceFolderByName workspaceFolderName: ${workspaceFolderName}`);
  return workspaceFolders.find(f => f.name.toLowerCase() === workspaceFolderName.toLowerCase()).uri.fsPath;
}