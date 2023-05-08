# ouspg.github.io
The website for OUSPG
This is a test.

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


## Dynamic content generation

### Content discovery

Target repositories under [OUSPG](https://github.com/ouspg) need content topics set before it can be discovered, filtered and categorised.
Topic `learning` is used to list repositories which are are specifically meant for learning.

### Acquiring data


To get repository metadata from the OUSPG org, use GitHub CLI to include only useful fields for presentation purposes.
Authentication is required beforehand unless tokens have been used.

```console
gh repo list ouspg --json url,description,name,repositoryTopics,stargazerCount,openGraphImageUrl
```

Filter by repository topic with `jq`
```console
jq ' map(select(.repositoryTopics[]?.name=="learning"))' out.json
```

Sort by stars:
```console
jq ' map(select(.repositoryTopics[]?.name=="learning")) | sort_by(.stargazerCount)' out.json
```



Combined command with GH cli
```console
gh repo list ouspg --json url,description,name,repositoryTopics,stargazerCount,openGraphImageUrl --jq 'map(select(.repositoryTopics[]?.name=="learning")) | sort_by(.stargazerCount)'

```

The repository meta information is currently updated automatically in deployment (see workflows) into the `data` folder, but not modified back to the repository.
The file in the repository serves for development purposes and can be modified locally and updated if needed.

## Benchmarking recommendations

* [Mozilla Observatory](https://observatory.mozilla.org)
* [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)

## Future development ideas

Use a subdomain for resources (guides, docs et al.) and move content into the other repository.
Could be https://github.com/h-enk/doks