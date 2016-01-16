# commemoji
A command line tool to make emojify your boring commit messages. :star2:

## Why?
* Emojis are cool. :sunglasses:
* A lot of text is boring. :unamused:
* People like emojis. :smile:
* People don't like to read. :rage:

## Install
```
$ npm install -g commemoji
```

## Usage
Use `commemoji` wherever you'd use `git commit -m`. 

### An emoji with purpose
Want to standardize? Are you fixing a bug, writing docs, adding tests, or something common? Use the `-k` flag with a commit type to get the emoji that best represents your commit. Check out [Atom's contributing guide](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages) for more info.

```
$ commemoji -k "Fix bug causing random emojis to be returned." "bug"
```

#### Common commit types
* :bug: "bug" | "b" - When fixing a bug.
* :art: "formatting" | "f" - When improving the format/structure of the code.
* :memo: "docs" | "d" - When writing docs.
* :racehorse: "perf" | "p" - When improving performance.
* :penguin: "linux" | "l" - When fixing something on Linux.
* :apple: "mac" | "m" - When fixing something on Mac OS.
* :checkered_flag: "windows" | "w" - When fixing something on Windows.
* :fire: "removal" | "r" - When removing code or files.
* :green_heart: "ci" - When fixing the CI build.
* :white_check_mark: "tests" | "t" - When adding tests.
* :lock: "security" | "s" - When dealing with security.
* :arrow_up: "upgrade dep" | "ud" - When upgrading dependencies.
* :arrow_down: "downgrade dep" | "dd" - When downgrading dependencies.
* :shirt: "lint" - When removing/adding linter warnings. 

### Search for an emoji
Want to express something specific with your commit? Feel a certain way? Use the `-s` flag with a keyword to search for.

```
$ commemoji -s "This code is legit, but this message is boring." "fire"
```

### Random emoji
Not sure how you feel about the commit? Omit the `-k` flag and just supply your message and we'll give you a random emoji.

```
$ commemoji "This code is legit, but this message is boring."
```

## Thanks
Thanks to @muan and [emojilib]() for providing an awesome resource for GitHub-supported emojis. :clap: I frequently used their [emoji searcher](http://emoji.muan.co/) before creating this tool.

## License
MIT :copyright: Joe Martella