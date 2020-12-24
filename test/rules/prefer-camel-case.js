'use strict';

const RuleTester = require('eslint').RuleTester;
const rules = require('../..').rules;
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 8,
  },
});

ruleTester.run('prefer-camel-case', rules['prefer-camel-case'], {
  valid: [
    {
      code: 'expect(foo).toEqual("bar")',
    },
    {
      // Not a core assertion
      code: 'expect(foo, "to foo")',
    },
    {
      // The camel case syntax doesn't support flag forwarding, so don't try to rewrite that:
      code: 'expect(foo, "[not] to equal", "bar")',
    },
    {
      // The camel case syntax doesn't support flag forwarding, so don't try to rewrite that:
      code:
        'expect(foo, "when called with", [1, 2, 3], "[not] to equal", "bar")',
    },
    {
      // The camel case syntax doesn't support flag forwarding, so don't try to rewrite that:
      code: 'expect.it("[not] to equal", "bar")',
    },
  ],

  invalid: [
    {
      code: 'expect("foo", "to equal", "bar")',
      output: 'expect("foo").toEqual("bar")',
      errors: [
        {
          message: 'Assertion should use camel case syntax',
          column: 1,
          line: 1,
        },
      ],
    },
    {
      code: 'expect("foo", "to be undefined")',
      output: 'expect("foo").toBeUndefined()',
      errors: [
        {
          message: 'Assertion should use camel case syntax',
          column: 1,
          line: 1,
        },
      ],
    },
    {
      // Something that looks like a flag forwarding, but doesn't spell an assertion in core:
      code: 'expect(theThing, "to equal", "whatever that [might] be")',
      output: 'expect(theThing).toEqual("whatever that [might] be")',
      errors: [
        {
          message: 'Assertion should use camel case syntax',
          column: 1,
          line: 1,
        },
      ],
    },
    {
      code:
        'expect([1, 2, 3], "when passed as parameters to", Math.max, "to equal", 3)',
      output: 'expect([1, 2, 3]).whenPassedAsParametersTo(Math.max).toEqual(3)',
      errors: [
        {
          message: 'Assertion should use camel case syntax',
          column: 1,
          line: 1,
        },
      ],
    },
    {
      code:
        'expect([1, 2, 3], "when passed as parameters to", Math.max, "not to be NaN")',
      output:
        'expect([1, 2, 3]).whenPassedAsParametersTo(Math.max).notToBeNaN()',
      errors: [
        {
          message: 'Assertion should use camel case syntax',
          column: 1,
          line: 1,
        },
      ],
    },
    {
      code: 'expect(0, "to be NaN")',
      output: 'expect(0).toBeNaN()',
      errors: [
        {
          message: 'Assertion should use camel case syntax',
          column: 1,
          line: 1,
        },
      ],
    },
    {
      code: 'expect.it("to be a number")',
      output: 'expect.toBeANumber()',
      errors: [
        {
          message: 'Assertion should use camel case syntax',
          column: 1,
          line: 1,
        },
      ],
    },
    {
      code: 'expect.it("to be NaN")',
      output: 'expect.toBeNaN()',
      errors: [
        {
          message: 'Assertion should use camel case syntax',
          column: 1,
          line: 1,
        },
      ],
    },
    {
      code: 'expect.it("to equal", { foo: 123 })',
      output: 'expect.toEqual({ foo: 123 })',
      errors: [
        {
          message: 'Assertion should use camel case syntax',
          column: 1,
          line: 1,
        },
      ],
    },
    // Only useful when experimenting with the unexpected core test suite, consider leaving them out:
    {
      code: 'clonedExpect("foo", "to equal", "bar")',
      output: 'clonedExpect("foo").toEqual("bar")',
      errors: [
        {
          message: 'Assertion should use camel case syntax',
          column: 1,
          line: 1,
        },
      ],
    },
    {
      code: 'parentExpect("foo", "to equal", "bar")',
      output: 'parentExpect("foo").toEqual("bar")',
      errors: [
        {
          message: 'Assertion should use camel case syntax',
          column: 1,
          line: 1,
        },
      ],
    },
  ],
});
