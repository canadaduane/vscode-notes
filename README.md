# Notes

## Features

Syntax highlighting for simple notes based on [Sublime Text Notes](https://packagecontrol.io/packages/Notes) by tbh1.

![vscode notes sample](images/vscode-notes-sample.png)

A `newday` snippet that includes the current date and the following headings:
```
Notes:
Ideas:
TODO:
Activity Log:
```

## Configuration

You may want to configure some of the colors, for instance in your vscode settings file (`Cmd+,` on Mac OS X), you can add scopes like so:

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

Some of the scopes you can configure are as follows:

```
keyword.operator.notes
keyword.other.notes
variable.language.notes
entity.name.tag.notes
comment.notes
string.quoted.single.notes
string.quoted.double.notes
invalid.deprecated.notes
```

Other scopes are language-specific.

## Release Notes

See [CHANGELOG.md](CHANGELOG.md).