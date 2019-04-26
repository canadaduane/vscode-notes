# Notes

## Features

Syntax highlighting for notes, with simple TODO lists. Also allows you to cross-link (cmd-click) between notes.

![vscode notes sample](images/vscode-notes-sample.png | width=544)

The example above comes from opening `examples/basic.notes` in VS Code, with the `notes` extension enabled and the `Dark+` default theme selected.

## Snippets & Commands

A `newday` snippet includes the current date and a set of organizing section headings:

```
[2019-02-02]
Notes:
Ideas:
TODO:
Activity Log:
```

To add a new "TODO" item checkbox, use the `cmd+L` shortcut:

```
[ ] Pick up daughter after school
[√] Install VS Code `notes` extension
```

When the cursor is on a line with a TODO checkbox, subsequent `cmd+L` directives will cycle through `[√]` (done) and `[x]` (won't do).

## Cross-linking Notes

If you mention another `*.notes` file, it will be underlined and become a hyperlink: `work.notes`. To follow the link, use the vscode `cmd+click` standard feature. References to notes can be absolute or relative; if relative, they are relative to the current document.

If the notes file you'd like to link to contains spaces, you can use "double quotes" to indicate the spaces should be included in the hyperlink. You can also use tilde (`~`) to mean your home directory, e.g. `~Notes/journal.notes`.

## Configuration

You may want to configure some of the text colors, for instance in your vscode settings file (`Cmd+,` on Mac OS X), you can add scopes like so:

```
"editor.tokenColorCustomizations": {
    "textMateRules": [
        {
            "scope": "keyword.operator.notes",
            "settings": {
                "foreground": "#92b630"
            }
        },
        {
            "scope": "variable.language.notes",
            "settings": {
                "foreground": "#92b630",
                "fontStyle": "italic"
            }
        }
    ]
}
```

All of the scopes you can configure are as follows:

```
source.notes
markup.heading.notes
markup.changed.notes
markup.canceled.notes
markup.bold.notes
variable.language.notes
keyword.other.notes
keyword.operator.notes
invalid.deprecated.notes
comment.notes
string.quoted.single.notes
string.quoted.double.notes
string.regexp
entity.name.tag.notes
```

Other scopes are language-specific. See `syntaxes/custom-colors.json` if you would like to override your theme and use the colors you see in the example image.

## Release Notes

See [CHANGELOG.md](CHANGELOG.md).

Syntax highlighting based on [Sublime Text Notes](https://packagecontrol.io/packages/Notes) by tbh1.
