'use strict';

const userAuth = require('..');
const assert = require('assert').strict;

assert.strictEqual(userAuth(), 'Hello from userAuth');
console.info('userAuth tests passed');
