import test from 'ava';

import { Lexer } from './lexer';
import { MermaidTranspiler } from './mermaidTranspiler';
import { Parser } from './parser';

test('simple', (t) => {
  const e =
    'Fact deposit { int id; int date -> date.id; int measurement -> measurement.id; } Dimension date {int id; int month;} Dimension measurement {int id; int weight; //in kilos\n}';

  const expect =
    'erDiagram\n' +
    '\n' +
    'deposit }|--|| date:"id"\n' +
    'deposit }|--|| measurement:"id"\n' +
    'deposit {\n' +
    '\tint id\n' +
    '\tint date\n' +
    '\tint measurement\n' +
    '}\n' +
    '\n' +
    'date {\n' +
    '\tint id\n' +
    '\tint month\n' +
    '}\n' +
    '\n' +
    'measurement {\n' +
    '\tint id\n' +
    '\tint weight "in kilos"\n' +
    '}\n\n';

  const lexer = new Lexer(e);
  const parser = new Parser(lexer.tokens);
  const transpilation = new MermaidTranspiler().generates(parser.statements);

  t.is(transpilation, expect);
});

test('harder', (t) => {
  const input =
    '//hi \n' +
    'Fact purchase {\n' +
    '  int id;\n' +
    '  int item -> item.id;\n' +
    '  int price;\n' +
    '  int customer -> customer.id; /*\n' +
    'this\n' +
    'is\n' +
    'a comment\n*/' +
    '}\n' +
    '\n' +
    'Dimension customer {\n' +
    '  int id;\n' +
    '  text name;\n' +
    '}\n' +
    '\n' +
    'Dimension item {\n' +
    '  int id;\n' +
    '  text name;\n' +
    '}\n';

  const expect =
    'erDiagram\n' +
    '\n' +
    'purchase }|--|| item:"id"\n' +
    'purchase }|--|| customer:"id"\n' +
    'purchase {\n' +
    '\tint id\n' +
    '\tint item\n' +
    '\tint price\n' +
    '\tint customer "\nthis\nis\na comment\n"\n' +
    '}\n' +
    '\n' +
    'customer {\n' +
    '\tint id\n' +
    '\ttext name\n' +
    '}\n' +
    '\n' +
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
