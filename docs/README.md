
```js
'use strict';

const { toStringLiteral, isIdentifier, isBareKey } = require('@ltd/j-es');

toStringLiteral('\n\r\u2028\u2029\'\\') // '\n\r\u2028\u2029\'\\'

let notStrictMode;
isIdentifier('yield'/*, notStrictMode = false*/) // false
isIdentifier('yield', notStrictMode = true) // true

let notES3_IE678;
isBareKey('var'/*, notES3_IE678 = false*/) // false
isBareKey('var', notES3_IE678 = true) // true

isBareKey('01') // false
isBareKey('1') // true
isBareKey('9007199254740993') // false
isBareKey('9007199254740994') // true

```
