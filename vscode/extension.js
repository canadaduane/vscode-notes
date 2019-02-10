const vscode = require("vscode");
const path = require("path");
const {
    Uri,
    Range,
    Position,
    DocumentLink,
    DocumentLinkProvider,
    commands,
    languages,
    workspace,
    window
} = vscode;

exports.activate = async function activate(context) {
    context.subscriptions.push(
        commands.registerTextEditorCommand(
            "notes.cycleTaskForward",
            cycleTaskForward
        ),
        commands.registerTextEditorCommand(
            "notes.cycleTaskBackward",
            cycleTaskBackward
        )
    );

    const linkPattern = /([^\s]+?\.notes)/g;
    const linkProvider = {
        provideDocumentLinks: async function(document, token) {
            if (workspace.rootPath === null) {
                // Must be in workspace for relative notes links to work
                return [];
            }
            const text = document.getText();
            const results = [];
            let match;
            while ((match = linkPattern.exec(text))) {
                const linkEnd = document.positionAt(linkPattern.lastIndex);
                const linkStart = linkEnd.translate({
                    characterDelta: -match[1].length
                });
                const range = new Range(linkStart, linkEnd);
                const uri = new Uri.file(
                    path.resolve(workspace.rootPath, match[1])
                );
                results.push(new DocumentLink(range, uri));
            }
            return results;
        }
    };

    context.subscriptions.push(
        languages.registerDocumentLinkProvider(
            { language: "notes" },
            linkProvider
        )
    );

    function swap(obj) {
        let ret = {};
        for (let key in obj) {
            ret[obj[key]] = key;
        }
        return ret;
    }

    const nextStateLookup = {
        "[ ]": "[√]",
        "[√]": "[x]",
        "[x]": "[ ]"
    };

    function nextTaskState(currentState) {
        const lookup = nextStateLookup[currentState];
        if (lookup) {
            return lookup;
        } else {
            return currentState;
        }
    }

    function prevTaskState(currentState) {
        const lookup = swap(nextStateLookup)[currentState];
        if (lookup) {
            return lookup;
        } else {
            return currentState;
        }
    }

    function cycleTaskForward(editor) {
        cycleTask(editor, nextTaskState);
    }

    function cycleTaskBackward(editor) {
        cycleTask(editor, prevTaskState);
    }

    function cycleTask(editor, nextStateFn) {
        editor.edit(editBuilder => {
            editor.selections.forEach(selection => {
                let lineNo = selection.start.line;
                while (lineNo <= selection.end.line) {
                    const line = editor.document.lineAt(lineNo);
                    const m = line.text.match(/^\s*(\[.?\])/);
                    if (m) {
                        const braceMatch = m[1];
                        const position = line.text.indexOf(braceMatch);
                        const range = new Range(
                            new Position(lineNo, position),
                            new Position(lineNo, position + 3)
                        );
                        const newText = nextStateFn(braceMatch);
                        editBuilder.replace(range, newText);
                    } else {
                        let insertPos = 0;
                        const m2 = line.text.match(/[^\s]/);
                        if (m2) {
                            insertPos = line.text.indexOf(m2[0]);
                        }
                        editBuilder.insert(
                            new Position(lineNo, insertPos),
                            "[ ] "
                        );
                    }
                    lineNo++;
                }
            });
        });
    }
};
