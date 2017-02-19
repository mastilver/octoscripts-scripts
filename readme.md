# octoscripts-scripts [![Build Status](https://travis-ci.org/mastilver/octoscripts-scripts.svg?branch=master)](https://travis-ci.org/mastilver/octoscripts-scripts)

> Scripts run by [Octoscripts](https://octoscripts.com)


## Usage
- Log in [Octoscripts](https://octoscripts.com)
- customize your `octoscripts.json` config as follow:
```json
{
    "tag-merge-conflict": true,
    "merge-greenkeeper": true,
    "eslint": {
        "patterns": [
            "src"
        ]
    }
}
```


## Scripts

- [merge-greenkeeper](https://github.com/mastilver/octoscripts-scripts/blob/master/packages/octoscripts-merge-greenkeeper) Merge greenkeeper pull-requests when they pass
- [tag-merge-conflits](https://github.com/mastilver/octoscripts-scripts/blob/master/packages/octoscripts-tag-merge-conflits) Tags GitHub pull-requests when there is a merge conflict


## License

MIT © [Thomas Sileghem](http://mastilver.com)
