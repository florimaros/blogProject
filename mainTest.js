"use strict"
var test = require('tape');

test('timing test', function (t) {
  t.plan(1)
  t.equal(add(5,2), 7)
  t.end()
});

function add(a, b) {
  return a+b
}
