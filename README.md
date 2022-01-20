# Notes

## Features

Syntax highlighting for notes, with simple TODO lists. Also allows you to cross-link (cmd-click) between notes.

<img src="https://github.com/canadaduane/vscode-notes/blob/master/images/vscode-notes-sample.png?raw=true" width="544">

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


## Configurable Links

If you use shortened patterns in your notes files to refer to web pages (for example, an issue tracker has short IDs) then you can use a regular expression to teach your `notes` file what to do with it when clicked:

For example, to create links to tickets on Atlassian with prefix "ABC-", you could do something like this:
```
[/ABC-\d+/ -> https://abc-project.atlassian.net/browse/$0]
```

Now, the following pattern will be recognized as a clickable link in your note file:
```
(ABC-1234)
```
... and clicking it will send you to `https://abc-project.atlassian.net/browse/ABC-1234`

You can also add global link patterns to your config via the `notes.predefinedLinks.enabled` and `notes.predefinedLinks.vals` config keys.

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

## Supported Syntax Highlighting

When adding code snippets, you can use the following language indicators after a [language-tag] (square brackets necessary) to get syntax highlighting for that language:

```
actionscript|as -> source.actionscript.2
applescript -> source.applescript
asp|asa -> source.asp
c -> source.c
cs|c#|csharp -> source.cs
c++|cpp|cc|cxx -> source.c++
clj|clojure -> source.clojure
css -> source.css
di -> source.d
erl|hrl|Emakefile|emakefile| -> source.erlang
go|golang -> source.go
groovy|gvy -> source.groovy
hs|haskell -> source.haskell
html|htm|shtml|xhtml|phtml|inc|tmpl|tpl|ctp -> text.html.basic
java|bsh -> source.java
js|jsx|htc|javascript -> source.js
lua -> source.lua
gnumakefile|makefile|makefile|ocamlmakefile|make -> source.makefile
mdown|markdown|markdn|md -> text.html.markdown
matlab -> source.matlab
objective-c|objc|m|h -> source.objc
ocaml|ml|mli -> source.ocaml
p|pas|pascal -> source.pascal
pm|pl|pod|t|perl -> source.perl
php -> source.php
cpy|py|python|rpy|pyw -> source.python
r|s|rprofile -> source.r
re|regex|regexp -> source.regexp
rb|rbx|rjs|ruby|Rakefile|rake|cgi|fcgi|gemspec|irbrc|capfile|gemfile -> source.ruby
scala -> source.scala
sh|bash|zsh|bashrc -> source.shell
sql|dml|ddl|mysql -> source.sql
tcl -> source.tcl
tex|latex|sty|cls -> text.tex
xml|tld|jsp|pt|cpt|dtml|rss|opml -> text.xml
yaml|yml -> source.yaml
```

## Release Notes

See [CHANGELOG.md](CHANGELOG.md).

Syntax highlighting based on [Sublime Text Notes](https://packagecontrol.io/packages/Notes) by tbh1.
