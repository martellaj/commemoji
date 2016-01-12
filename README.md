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
Use `commemoji` wherever you'd use `git commit`. 

### An emoji with purpose
Want to standardize? Are you fixing a bug, writing docs, adding tests, or something common? Use the `-k` flag with a commit type to get the emoji that best represents your commit. Check out [Atom's contributing guide](https://github.com/atom/atom/blob/master/CONTRIBUTING.md#git-commit-messages) for more info.

```
$ commemoji -mk "Fix bug causing random emojis to be returned." "bug"
```

### Search for an emoji
Want to express something specific with your commit? Feel a certain way? Use the `-s` flag with a keyword to search for.

```
$ commemoji -ms "This code is legit, but this message is boring." "fire"
```

### Random emoji
Not sure how you feel about the commit? Omit the `-k` flag and just supply your message and we'll give you a random emoji.

```
$ commemoji -m "This code is legit, but this message is boring."
```

## Thanks
Thanks to @muan and [emojilib]() for providing an awesome resource for GitHub-supported emojis. :clap: I frequently used their [emoji searcher](http://emoji.muan.co/) before creating this tool.

## License
MIT :copyright: Joe Martella