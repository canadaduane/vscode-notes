const vscode = require("vscode");
const os = require("os");
const paths = require("path");
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

  function expandPathHome(path) {
    if (path.slice(0, 1) == "~") {
      return paths.join(os.homedir(), path.slice(1, path.length));
    } else {
      return path;
    }
  }

  function regexpSubstitute(text, matches) {
    return text.replace(/\$(\d+)/g, (_, p1) => matches[parseInt(p1, 10)]);
  }

  const linkPattern = /("([^"]+?\.notes)"|[^\s]+?\.notes)/g;
  // A file can describe it's own links via this pattern, e.g.
  //   [/\(MLG-\d+\)/ -> https://mediciventures.atlassian.net/browse/$0]
  const externalLinkPatterns = /\[\/([^\/]+)\/\s*->\s*(https?:\/\/[^\]]+)\]/g;
  const linkProvider = {
    provideDocumentLinks: async function (document, token) {
      let relativeRoot;
      if (document.uri.scheme === "file") {
        relativeRoot = paths.dirname(document.uri.fsPath);
      } else {
        relativeRoot = null;
      }
      const text = document.getText();
      let match;
      const externalPatterns = [];
      while ((match = externalLinkPatterns.exec(text))) {
        externalPatterns.push({regexp: match[1], link: match[2]});
      }
      const results = [];

      // Find "*.notes" links to other notes files in this document
      while ((match = linkPattern.exec(text))) {
        const linkEnd = document.positionAt(linkPattern.lastIndex);
        const linkStart = linkEnd.translate({
          characterDelta: -match[1].length
        });
        const range = new Range(linkStart, linkEnd);
        // If inner parens match on the unquoted link text, prefer that,
        // otherwise, use the outermost match (no parens)
        const linkPath = expandPathHome(match[2] ? match[2] : match[1]);
        let linkTarget;
        if (paths.isAbsolute(linkPath)) {
          linkTarget = linkPath;
        } else if (relativeRoot) {
          linkTarget = paths.resolve(relativeRoot, linkPath);
        } else {
          // Can't add the link if it isn't absolute, and we
          // don't have a relative dir path to work with
          continue;
        }
        const fileUri = Uri.file(linkTarget);
        const docLink = new DocumentLink(range, fileUri);
        results.push(docLink);
      }

      // Find customized external links in this document
      for (pattern of externalPatterns) {
        const RE = new RegExp(pattern.regexp, "g");
        while ((match = RE.exec(text))) {
          const linkEnd = document.positionAt(RE.lastIndex);
          const linkStart = linkEnd.translate({
            characterDelta: -match[0].length
          });
          const range = new Range(linkStart, linkEnd);
          const uri = Uri.parse(regexpSubstitute(pattern.link, match));
          const docLink = new DocumentLink(range, uri);
          results.push(docLink);
        }
      }
      return results;
    }
  };

  context.subscriptions.push(
    languages.registerDocumentLinkProvider({ language: "notes" }, linkProvider)
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
            let insertPos = selection.active.character;
            const m2 = line.text.match(/[^\s]/);
            if (m2) {
              insertPos = line.text.indexOf(m2[0]);
            }
            editBuilder.insert(new Position(lineNo, insertPos), "[ ] ");
          }
          lineNo++;
        }
      });
    });
  }
};
