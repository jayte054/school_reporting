"use strict";

var _vscode = require("vscode");

var _isWsl = require("is-wsl");

var _isWsl2 = _interopRequireDefault(_isWsl);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _directory = require("./directory");

var directory = _interopRequireWildcard(_directory);

var _unixWinPathFormat = require("./unix-win-path-format");

var _unixWinPathFormat2 = _interopRequireDefault(_unixWinPathFormat);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable-line import/no-unresolved */
async function showWorkspaceFolderPick() {
  const workspaceFolder = await _vscode.window.showWorkspaceFolderPick({ ignoreFocusOut: true });
  return workspaceFolder;
}

async function getWorkspaceFolderName() {
  const workspaceFolder = await showWorkspaceFolderPick();
  return workspaceFolder.name.toLowerCase();
}

function getEscapedWorkspaceFolderByName(workspaceFolders, workspaceName) {
  return directory.escapeBackslash(directory.getWorkspaceFolderByName(workspaceFolders, workspaceName));
}

function activate(context) {
  const disposable = _vscode.commands.registerCommand("extension.vscode-wsl-workspaceFolder", async (...args) => {
    const isExtensionDebug = !!process.env.VSCODE_EXTENSION_WSL_WORKSPACEFOLDER_TEST;
    const vars = {
      isLinux: process.platform === "linux",
      isWin: process.platform === "win32",
      isWsl: _isWsl2.default,
      isExtensionDebug
    };

    (0, _debug2.default)("vscode-wsl-workspacefolder:index")(`env.isLinux: ${vars.isLinux}`);
    (0, _debug2.default)("vscode-wsl-workspacefolder:index")(`env.isWin: ${vars.isWin}`);
    (0, _debug2.default)("vscode-wsl-workspacefolder:index")(`env.isWsl: ${vars.isWsl}`);
    (0, _debug2.default)("vscode-wsl-workspacefolder:index")(`env.isExtensionDebug: ${vars.isExtensionDebug}`);
    // window.showInformationMessage(`env.isLinux: ${vars.isLinux}`);
    // window.showInformationMessage(`env.isWin: ${vars.isWin}`);
    // window.showInformationMessage(`env.isWsl: ${vars.isWsl}`);
    // window.showInformationMessage(`env.isExtensionDebug: ${vars.isExtensionDebug}`);

    const { workspaceFolders } = _vscode.workspace;
    let workspaceName = Array.isArray(workspaceFolders) && workspaceFolders.length > 1 ? args[0].name : _vscode.workspace.name;

    if (typeof workspaceFolders.find(x => x.name.toLowerCase() === workspaceName.toLowerCase()) === "undefined") {
      try {
        workspaceName = await getWorkspaceFolderName();
      } catch (error) {
        _vscode.window.showErrorMessage("Extension: WSL workspaceFolder failed!");
        _vscode.window.showErrorMessage("Error: workspace folder selection required!");
      }
    }

    const workspaceFolderUriFsPath = getEscapedWorkspaceFolderByName(workspaceFolders, workspaceName);

    return (0, _unixWinPathFormat2.default)(workspaceFolderUriFsPath, vars).then(wslPath => {
      (0, _debug2.default)("vscode-wsl-workspacefolder:index")(`stdout: ${wslPath}`);
      // // eslint-disable-next-line no-console
      // console.log("wslPath:", wslPath);
      return wslPath;
    }).catch(err => {
      _vscode.window.showErrorMessage("Extension: WSL workspaceFolder failed!");
      _vscode.window.showErrorMessage(`Error: ${err.message}`);
    });
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
  // noop
}
exports.deactivate = deactivate;