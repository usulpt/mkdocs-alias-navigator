import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import frontMatter from 'front-matter';

export function activate(context: vscode.ExtensionContext) {
    console.log('Alias Navigation extension is now active!');
    let disposable = vscode.commands.registerCommand('extension.navigateAlias', async () => {
        console.log('Navigate Alias command executed');
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const position = editor.selection.active;
            const wordRange = document.getWordRangeAtPosition(position, /\[\[([^\]]+)\]\]/);
            if (wordRange) {
                const alias = document.getText(wordRange).slice(2, -2); // Extract alias from [[alias]]
                const targetFile = await findAliasTarget(alias);
                if (targetFile) {
                    const targetUri = vscode.Uri.file(targetFile);
                    vscode.workspace.openTextDocument(targetUri).then(doc => {
                        vscode.window.showTextDocument(doc);
                    });
                } else {
                    vscode.window.showErrorMessage(`Alias "${alias}" not found.`);
                }
            } else {
                vscode.window.showErrorMessage('No alias found at the cursor position.');
            }
        }
    });

    context.subscriptions.push(disposable);
}

async function findAliasTarget(alias: string): Promise<string | undefined> {
    const config = vscode.workspace.getConfiguration('aliasNavigation');
    const folder = config.get<string>('folder');
    if (!folder) {
        vscode.window.showErrorMessage('No folder specified in configuration.');
        return undefined;
    }

    const markdownFiles = await vscode.workspace.findFiles(new vscode.RelativePattern(folder, '**/*.md'));

    for (const file of markdownFiles) {
        const content = fs.readFileSync(file.fsPath, 'utf8');
        const frontmatter = frontMatter(content, { allowUnsafe: true }).attributes as any;
        if (frontmatter.alias === alias) {
            return file.fsPath;
        }
    }
    return undefined;
}

export function deactivate() {}