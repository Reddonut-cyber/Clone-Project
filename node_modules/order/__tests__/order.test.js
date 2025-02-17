'use strict';

const order = require('..');
const assert = require('assert').strict;

assert.strictEqual(order(), 'Hello from order');
console.info('order tests passed');
