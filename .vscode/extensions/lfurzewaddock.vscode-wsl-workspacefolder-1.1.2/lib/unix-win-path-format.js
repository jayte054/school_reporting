"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _execa = require("execa");

var _execa2 = _interopRequireDefault(_execa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function runWslpathUnderWslEnv(isWslEnv, workspaceFolder) {
  const { stdout } = await (0, _execa2.default)(isWslEnv ? "wslpath" : "wsl wslpath", [workspaceFolder], {
    cleanup: true
  });

  return stdout;
}

exports.default = async function getWslFolder(workspaceFolder, env) {
  if (env.isLinux && env.isWsl) {
    return runWslpathUnderWslEnv(true, workspaceFolder);
  }

  if (env.isWin) {
    return runWslpathUnderWslEnv(false, workspaceFolder);
  }

  return Promise.resolve(workspaceFolder);
};

module.exports = exports["default"];