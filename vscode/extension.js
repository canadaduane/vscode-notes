const vscode = require('vscode')
const { Range, Position, commands, workspace, window } = vscode

exports.activate = async function activate(context) {
    context.subscriptions.push
        ( commands.registerTextEditorCommand
            ( 'notes.cycleTaskForward', cycleTaskForward )
        , commands.registerTextEditorCommand
            ( 'notes.cycleTaskBackward', cycleTaskBackward )
        )

    function swap(obj){
        let ret = {};
        for(let key in obj){
            ret[obj[key]] = key;
        }
        return ret;
    }

    const nextStateLookup = {
        "[ ]": "[√]",
        "[√]": "[x]",
        "[x]": "[ ]"
    }

    function nextTaskState(currentState) {
        const lookup = nextStateLookup[currentState]
        if (lookup) {
            return lookup
        } else {
            return currentState
        }
    }

    function prevTaskState(currentState) {
        const lookup = swap(nextStateLookup)[currentState]
        if (lookup) {
            return lookup
        } else {
            return currentState
        }
    }

    function cycleTaskForward(editor) {
        cycleTask(editor, nextTaskState)
    }

    function cycleTaskBackward(editor) {
        cycleTask(editor, prevTaskState)
    }

    function cycleTask(editor, nextStateFn) {
        editor.edit(editBuilder => {
            editor.selections.forEach(selection => {
                let lineNo = selection.start.line
                while (lineNo <= selection.end.line) {
                    const line = editor.document.lineAt(lineNo)
                    const m = line.text.match(/^\s*(\[.?\])/ )
                    if (m) {
                        const braceMatch = m[1];
                        const position = line.text.indexOf(braceMatch)
                        const range = new Range(
                            new Position(lineNo, position),
                            new Position(lineNo, position + 3)
                        )
                        const newText = nextStateFn(braceMatch)
                        editBuilder.replace(range, newText)
                    } else {
                        editBuilder.insert(
                            new Position(lineNo, 0),
                            "[ ] "
                        )
                    }
                    lineNo++
                }
            })
        })
    }
}
