# Testo 

A small testing utility based on the Writer monad. 

## Tracer Monad 

The `Tracer` monad logs strings alongside `Maybe` values. 

```js
//  Tracer a = Writer (Maybe a)

//  ta : Tracer Int
let ta = [1, ['all', 'good']]

//  tb : Tracer Int 
let tb = [null, ['oops', 'no int!']]
```

All tests return values inside the `Tracer` monad, e.g. 

```js
//  unit : () -> Tracer Bool 
let unit = () => {
    let expect = 1, 
        obtain = someIntFunction(); 
    return expect === obtain 
        ? [true, ['1 = 1']],
        : [false, [`1 != ${obtain}`]];
}
```

## Writing unit tests 

Each testing file exports a collection of unit tests,
which are functions to the `Tracer` monad. 

```
    File = {Unit} 
    Unit = () -> Tracer a
```

Units are run one by one by providing files
to be tested to `test.run`, e.g.

```js
//  tests.js

let test = require('@opeltre/testo');

let a = require('./fileA.js'),
    b = require('./fileB.js');

test.run({a, b}); 
``` 

The main `test` object exports comparison functions 
to conveniently write these tests. 

```js 
//  fileA.js

let test = require('@opeltre/testo');

//     .t1 : () -> Tracer ()
exports.t1 = () => 
    test([0, 1, 2], [0, 1, 3]);

//     .t2 : () -> Tracer ()
exports.t2 = () => 
    test.subrecord({a: [0, 1]}, {a: [0, 1], b: [1, 2]})
``` 

## npm 

Edit `package.json` to: 

```
... "test": "node tests.js"
```

And run `$ npm test`