import test from 'ava';

import { Lexer } from './lexer';
import { MermaidTranspiler } from './mermaidTranspiler';
import { Parser } from './parser';

test('simple', (t) => {
  const input = 'Fact apport { int id; int date; int measurement; } Dimension date {int id -> apport.date; int month;} Dimension measurement {int id -> apport.measurement; int weight;}';
  const expect = 'erDiagram\n' +
    '\n' +
    'apport {\n' +
    '\tint id\n' +
    '\tint date\n' +
    '\tint measurement\n' +
    '}\n' +
    '\n' +
    'date ||--|{ apport:date\n' +
    'date {\n' +
    '\tint id\n' +
    '\tint month\n' +
    '}\n' +
    '\n' +
    'measurement ||--|{ apport:measurement\n' +
    'measurement {\n' +
    '\tint id\n' +
    '\tint weight\n' +
    '}\n\n';

  const lexer = new Lexer(input);
  const parser = new Parser(lexer.tokens);
  const transpilation = new MermaidTranspiler().generates(parser.statements);

  console.log(transpilation);

  t.is(transpilation, expect);
});
