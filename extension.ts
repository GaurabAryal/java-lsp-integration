import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind,
} from 'vscode-languageclient/node';
import * as vscode from 'vscode';

let client: LanguageClient;


export function activate(context: vscode.ExtensionContext) {
    let serverExecutable = '/Users/gaurab.aryal/mongold/target/debug/mongold';

    let serverOptions: ServerOptions = {
        run: { command: serverExecutable },
        debug: { command: serverExecutable }
    };

    let clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'java' }],
        synchronize: {
            configurationSection: 'java',
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.java')
        }
    };

    client = new LanguageClient(
        'java',
        'Java Language Server',
        serverOptions,
        clientOptions
    );

    client.start();
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
