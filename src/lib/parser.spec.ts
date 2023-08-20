import test from 'ava';

import { Lexer } from './lexer';
import { Parser } from './parser';
test('simple', (t) => {
  const input =
    'Fact deposit { int id; int date; int weight; //in kilos\n} Dimension date {int month;}';
  const expect =
    'Fact deposit {\n' +
    '\tint id;\n' +
    '\tint date;\n' +
    '\tint weight;//in kilos\n' +
    '},Dimension date {\n' +
    '\tint month;\n' +
    '}';

  const lexer = new Lexer(input);
  const parser = new Parser(lexer.tokens);
  t.is(parser.statements.toString(), expect);
});
