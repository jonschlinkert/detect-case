'use strict';

require('mocha');
const assert = require('assert').strict;
const detect = require('..');

describe('replace-case', () => {
  describe('.detect', () => {
    it('should detect pascalcase', () => {
      assert.equal(detect('Fo_oB1_r'), 'pascalcase');
      assert.equal(detect('FooBarBaz'), 'pascalcase');
      assert.equal(detect('FooBarB'), 'pascalcase');
      assert.equal(detect('FooB'), 'pascalcase');
    });

    it('should detect camelcase', () => {
      assert.equal(detect('fo_oB1_r'), 'camelcase');
      assert.equal(detect('fooBar'), 'camelcase');
      assert.equal(detect('fooBarBaz'), 'camelcase');
      assert.equal(detect('fooBarB'), 'camelcase');
      assert.equal(detect('fooB'), 'camelcase');
    });

    it('should detect mixedcase', () => {
      assert.equal(detect('Fo_ob1_r'), 'mixedcase');
      assert.equal(detect('Foo_b9ar'), 'mixedcase');
      assert.equal(detect('Foo_bar_baz'), 'mixedcase');
      assert.equal(detect('Fo122345'), 'mixedcase');
    });

    it('should detect titlecase', () => {
      assert.equal(detect('Abc'), 'titlecase');
    });

    it('should detect uppercase', () => {
      assert.equal(detect('A'), 'uppercase');
      assert.equal(detect('ABCDE'), 'uppercase');
    });

    it('should detect lowercase', () => {
      assert.equal(detect('a'), 'lowercase');
      assert.equal(detect('abcde'), 'lowercase');
    });

    it('should detect snakecase', () => {
      assert.equal(detect('fo_ob1_r'), 'snakecase');
      assert.equal(detect('foo_bar'), 'snakecase');
      assert.equal(detect('foo_bar_baz'), 'snakecase');
      assert.equal(detect('foo_bar_b'), 'snakecase');
      assert.equal(detect('foo_b'), 'snakecase');
      assert.equal(detect('foo_'), 'snakecase');
    });

    it('should detect uppersnake', () => {
      assert.equal(detect('FO_OB1_R'), 'uppersnake');
      assert.equal(detect('FOO_BAR'), 'uppersnake');
      assert.equal(detect('FOO_BAR_BAZ'), 'uppersnake');
      assert.equal(detect('FOO_BAR_B'), 'uppersnake');
      assert.equal(detect('FOO_B'), 'uppersnake');
      assert.equal(detect('FOO_'), 'uppersnake');
    });
  });
});
