import assert from 'node:assert/strict';
import detect from '..';

describe('detect-case', () => {
  it('should handle invalid inputs', () => {
    assert.equal(detect(''), 'unknown', '');
    assert.equal(detect('123'), 'unknown', '123');
    assert.equal(detect('!@#'), 'unknown', '!@#');
    assert.throws(() => detect(null), TypeError);
  });

  it('should detect single characters', () => {
    assert.equal(detect('a'), 'lowercase', 'a');
    assert.equal(detect('A'), 'uppercase', 'A');
    assert.equal(detect('1'), 'unknown', '1');
    assert.equal(detect('-'), 'unknown', '-');
  });

  it('should detect pascalcase', () => {
    assert.equal(detect('Pascal'), 'pascalcase', 'Pascal');
    assert.equal(detect('PascalCase'), 'pascalcase', 'PascalCase');
    assert.equal(detect('XMLHttpRequest'), 'pascalcase', 'XMLHttpRequest');
    assert.equal(detect('AClass'), 'pascalcase', 'AClass');
    assert.equal(detect('PaScAl'), 'pascalcase', 'PaScAl');
    assert.equal(detect('PaScAlCase'), 'pascalcase', 'PaScAlCase');
  });

  it('should detect camelcase', () => {
    assert.equal(detect('camelCase'), 'camelcase', 'camelCase');
    assert.equal(detect('camel'), 'lowercase', 'camel');
    assert.equal(detect('innerHTML'), 'camelcase', 'innerHTML');
    assert.equal(detect('dataType1'), 'camelcase', 'dataType1');
    assert.equal(detect('myXMLParser'), 'camelcase', 'myXMLParser');
    assert.equal(detect('getID'), 'camelcase', 'getID');
    assert.equal(detect('aB'), 'camelcase', 'aB');
  });

  it('should detect mixedcase', () => {
    assert.equal(detect('a_b-c'), 'mixedcase', 'a_b-c');
    assert.equal(detect('Fo_ob1_r'), 'mixedcase', 'Fo_ob1_r');
    assert.equal(detect('Foo_b9ar'), 'mixedcase', 'Foo_b9ar');
    assert.equal(detect('Foo_bar_baz'), 'mixedcase', 'Foo_bar_baz');
    assert.equal(detect('Fo122345'), 'mixedcase', 'Fo122345');
    assert.equal(detect('M123ed'), 'mixedcase', 'M123ed');
    assert.equal(detect('M1x3d'), 'mixedcase', 'M1x3d');
    assert.equal(detect('Class1'), 'mixedcase', 'Class1');
    assert.equal(detect('Class1Name2'), 'mixedcase', 'Class1Name2');
    assert.equal(detect('abc123'), 'mixedcase', 'abc123');
    assert.equal(detect('a1b2c3'), 'mixedcase', 'a1b2c3');
  });

  it('should detect titlecase', () => {
    assert.equal(detect('Title Case'), 'titlecase', 'Title Case');
    assert.equal(detect('A Title Case'), 'titlecase', 'A Title Case');
    assert.equal(detect('Page'), 'pascalcase', 'Page');
    assert.equal(detect('Ab'), 'pascalcase', 'Ab');
    assert.equal(detect('A'), 'uppercase', 'A');
    assert.equal(detect('2024 Annual Report'), 'titlecase', '2024 Annual Report');
  });

  it('should detect sentencecase', () => {
    assert.equal(detect('Sentence case'), 'sentencecase', 'Sentence case');
    assert.equal(detect('A sentence case'), 'sentencecase', 'A sentence case');
    assert.equal(detect('A long year, was 2024'), 'sentencecase', 'A long year, was 2024');
    assert.equal(detect('A long year, was 2024.'), 'sentencecase', 'A long year, was 2024.');
    assert.equal(detect('The cat saw John run.'), 'sentencecase', 'A long year, was 2024.');
    assert.equal(detect('THE CAT SAW JOHN.'), 'sentencecase', 'A long year, was 2024.');
  });

  it('should detect uppercase', () => {
    assert.equal(detect('UPPERCASE'), 'uppercase', 'UPPERCASE');
    assert.equal(detect('ABC'), 'uppercase', 'ABC');
    assert.equal(detect('ABC123'), 'uppercase', 'ABC123');
    assert.equal(detect('A1B2C3'), 'uppercase', 'A1B2C3');
    assert.equal(detect('AB'), 'uppercase', 'AB');
  });

  it('should detect lowercase', () => {
    assert.equal(detect('lowercase'), 'lowercase', 'lowercase');
    assert.equal(detect('abc'), 'lowercase', 'abc');
    assert.equal(detect('abc xyz'), 'lowercase', 'abc');
  });

  it('should detect kebabcase', () => {
    assert.equal(detect('kebab-case'), 'kebabcase', 'kebab-case');
    assert.equal(detect('my-component'), 'kebabcase', 'my-component');
    assert.equal(detect('my-component-1'), 'kebabcase', 'my-component-1');
    assert.equal(detect('a-b-c'), 'kebabcase', 'a-b-c');
    assert.equal(detect('abc-123'), 'kebabcase', 'abc-123');
    assert.equal(detect('a-'), 'kebabcase', 'a-');
  });

  it('should detect snakecase', () => {
    assert.equal(detect('snake_case'), 'snakecase', 'snake_case');
    assert.equal(detect('my_variable'), 'snakecase', 'my_variable');
    assert.equal(detect('my_variable_1'), 'snakecase', 'my_variable_1');
    assert.equal(detect('a_b_c'), 'snakecase', 'a_b_c');
    assert.equal(detect('abc_123'), 'snakecase', 'abc_123');
    assert.equal(detect('a_'), 'snakecase', 'a_');
  });

  it('should detect uppersnake', () => {
    assert.equal(detect('UPPER_SNAKE'), 'uppersnake', 'UPPER_SNAKE');
    assert.equal(detect('MY_CONSTANT'), 'uppersnake', 'MY_CONSTANT');
    assert.equal(detect('MY_CONSTANT_1'), 'uppersnake', 'MY_CONSTANT_1');
    assert.equal(detect('ABC_123'), 'uppersnake', 'ABC_123');
    assert.equal(detect('A_B_C'), 'uppersnake', 'A_B_C');
    assert.equal(detect('A_'), 'uppersnake', 'A_');
  });

  it('should handle edge cases', () => {
    assert.equal(detect('123ABC'), 'mixedcase', '123ABC');
    assert.equal(detect('123abc'), 'mixedcase', '123abc');
    assert.equal(detect('abc!def'), 'unknown', 'abc!def');
    assert.equal(detect('ABC!DEF'), 'unknown', 'ABC!DEF');
  });
});
