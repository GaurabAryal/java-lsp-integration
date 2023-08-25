"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const node_1 = require("vscode-languageclient/node");
const vscode = __importStar(require("vscode"));
let client;
function activate(context) {
    // Assuming the Java LSP binary is in the mentioned path
    // You need to replace this path to the location of your Java LSP binary
    let serverExecutable = '/Users/gaurab.aryal/mongold/target/debug/mongold';
    let serverOptions = {
        run: { command: serverExecutable },
        debug: { command: serverExecutable }
    };
    let clientOptions = {
        // This should match Java files
        documentSelector: [{ scheme: 'file', language: 'java' }],
        synchronize: {
            // This can be the section of your config settings specific to Java if you have any.
            // If not, you can leave it or remove it.
            configurationSection: 'java',
            // Listen for changes in Java files. This is a simple setup that watches `.java` files.
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.java')
        }
    };
    client = new node_1.LanguageClient('java', 'Java Language Server', serverOptions, clientOptions);
    client.start();
}
exports.activate = activate;
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
exports.deactivate = deactivate;
