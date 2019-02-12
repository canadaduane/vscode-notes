# Change Log

## [0.8]

-   Enable relative and absolute file cross-linking. Also allow tilde (`~`) to refer to home dir.

## [0.7]

-   Add icon to vscode extension. Modified from source: <a href="http://www.onlinewebfonts.com">Online Web Fonts</a>. License: CC-BY.

## [0.6]

-   Added ability to cross-link between notes by referencing the name of another \*.notes file in current workspace
-   Added double-quotes around notes filenames as a way to link to files with spaces in the name

## [0.5]

-   improved insertion of todo-list item checkbox so it is placed before the first text at the beginning of a line, rather than always at the first character of the line
-   switched to using "cmd+L" and "alt+L" for new todo-list item, or cycling between states

## [0.4]

-   improved

## [0.3]

-   Add `newday` snippet: adds the day as well as the following 4 subheadings:
    -   Notes
    -   Ideas
    -   TODO
    -   Activity Log
-   Task cycling on a line that does not contain `[ ]` will insert
    a `[ ]` at the beginning of the line.

## [0.2]

-   Changed heading color to use markup.heading.notes
-   Add new "date" heading syntax with highlight, e.g. `[2018-08-04]`
-   Added taskCycleForward / taskCycleBackward to check tasks
    as incomplete, complete, or canceled:

    [ ] task
    [√] done task
    [x] canceled task

    By default, bound to Option+L and Option+H respectively.

## [0.1]

-   Initial release
-   Copied from https://github.com/tbh1/sublime-notes
-   Adapted for Visual Studio Code
