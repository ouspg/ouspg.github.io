# ouspg.github.io
The website for OUSPG

## Developing locally

 1. [Install hugo](https://gohugo.io/installation/)
 1. `git clone git@github.com:ouspg/ouspg.github.io.git`
 1. `cd ouspg.github.io`
 1. `git submodule init && git submodule update`
 1. If you plan to change things bit might be time to `git checkout -b ...` at this point
 1. `hugo server`
 1. Point your web browser to the local URL given by `hugo` in the previous step
 1. Edit anything and enjoy automatic live updates and refresh by `hugo` and your browser
 1. Commit changes, push your branch and make a pull request against `main`

## Modifying top banner

Modify the file `config/_default/languages.en.toml` to change the contents of the banner, or disable it.

Sample configuration:

```toml
notification1 = { enabled = true, info_full = "Go check this wonderful search engine!", info_short = "Here is Google.", url = "https://google.com" }
```