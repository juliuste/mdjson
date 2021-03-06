# @juliuste/mdjson

Transform markdown to an object with headings as keys. **Originally forked from [yoshuawuyts/mdjson](https://github.com/yoshuawuyts/mdjson).**

[![npm version](https://img.shields.io/npm/v/@juliuste/mdjson.svg)](https://www.npmjs.com/package/@juliuste/mdjson)
[![Build Status](https://travis-ci.org/juliuste/mdjson.svg?branch=master)](https://travis-ci.org/juliuste/mdjson)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliuste/mdjson.svg)](https://greenkeeper.io/)
[![license](https://img.shields.io/github/license/juliuste/mdjson.svg?style=flat)](license)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Installation

```shell
npm install @juliuste/mdjson
```

## Usage

```js
const mdjson = require('@juliuste/mdjson')

const dictionary = mdjson(`
    text before any headings will be ignored

    # my heading
    oh wow, amazing
    newline means new paragraph

    another paragraph

    ### another heading
    gorgeous copy, stunning, [some other markdown](https://www.abc.de)

    ## headings without content will also be ignored
`)
// => {
//  'my heading': 'oh wow, amazing\n\nnewline means new paragraph\n\nanother paragraph',
//  'another heading': 'gorgeous copy, stunning, [some other markdown](https://www.abc.de)'
//}
```

## Contributing

If you found a bug or want to propose a feature, feel free to visit [the issues page](https://github.com/juliuste/mdjson/issues).
