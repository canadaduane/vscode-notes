# Change Log
## [0.3] 
- Add `newday` snippet: adds the day as well as the following 4 subheadings:
  - Notes
  - Ideas
  - TODO
  - Activity Log
- Task cycling on a line that does not contain `[ ]` will insert
  a `[ ] ` at the beginning of the line.

## [0.2]
- Changed heading color to use markup.heading.notes
- Add new "date" heading syntax with highlight, e.g. `[2018-08-04]`
- Added taskCycleForward / taskCycleBackward to check tasks
  as incomplete, complete, or canceled:

  [ ] task
  [√] done task
  [x] canceled task

  By default, bound to Option+L and Option+H respectively.

## [0.1]
- Initial release
- Copied from https://github.com/tbh1/sublime-notes
- Adapted for Visual Studio Code
