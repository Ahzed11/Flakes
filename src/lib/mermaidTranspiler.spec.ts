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

  t.is(transpilation, expect);
});

test('harder', (t) => {
  const input = '\n' +
    'Fact purchase {\n' +
    '  int id;\n' +
    '  int item;\n' +
    '  int price;\n' +
    '  int customer;\n' +
    '}\n' +
    '\n' +
    'Dimension customer {\n' +
    '  int id -> purchase.customer;\n' +
    '  text name;\n' +
    '}\n' +
    '\n' +
    'Dimension item {\n' +
    '  int id -> purchase.item;\n' +
    '  text name;\n' +
    '}\n';

  const expect = 'erDiagram\n' +
    '\n' +
    'purchase {\n' +
    '\tint id\n' +
    '\tint item\n' +
    '\tint price\n' +
    '\tint customer\n' +
    '}\n' +
    '\n' +
    'customer ||--|{ purchase:customer\n' +
    'customer {\n' +
    '\tint id\n' +
    '\ttext name\n' +
    '}\n' +
    '\n' +
    'item ||--|{ purchase:item\n' +
    'item {\n' +
    '\tint id\n' +
    '\ttext name\n' +
    '}\n\n';

  const lexer = new Lexer(input);
  const parser = new Parser(lexer.tokens);
  const transpilation = new MermaidTranspiler().generates(parser.statements);

  console.log(transpilation);

  t.is(transpilation, expect);
});
