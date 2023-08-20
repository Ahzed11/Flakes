import test from 'ava';

import { Lexer } from './lexer';

test('simple', (t) => {
  const input =
    'Fact deposit { int id; int date; int weight; } Dimension date {int month;}';
  const expect =
    'Line: 1 <TableType | Fact>,' +
    'Line: 1 <Identifier | deposit>,' +
    'Line: 1 <LeftBrace | {>,' +
    'Line: 1 <FieldType | int>,' +
    'Line: 1 <Identifier | id>,' +
    'Line: 1 <Semicolon | ;>,' +
    'Line: 1 <FieldType | int>,' +
    'Line: 1 <Identifier | date>,' +
    'Line: 1 <Semicolon | ;>,' +
    'Line: 1 <FieldType | int>,' +
    'Line: 1 <Identifier | weight>,' +
    'Line: 1 <Semicolon | ;>,' +
    'Line: 1 <RightBrace | }>,' +
    'Line: 1 <TableType | Dimension>,' +
    'Line: 1 <Identifier | date>,' +
    'Line: 1 <LeftBrace | {>,' +
    'Line: 1 <FieldType | int>,' +
    'Line: 1 <Identifier | month>,' +
    'Line: 1 <Semicolon | ;>,' +
    'Line: 1 <RightBrace | }>,' +
    'Line: 1 <Eof | >';

  const lexer = new Lexer(input);
  t.is(lexer.tokens.toString(), expect);
});

test('simple with comments', (t) => {
  const input =
    'Fact deposit { int id // hi\n; int date; int weight; } /* this is a \n comment */ Dimension date {int month;}';
  const expect =
    'Line: 1 <TableType | Fact>,' +
    'Line: 1 <Identifier | deposit>,' +
    'Line: 1 <LeftBrace | {>,' +
    'Line: 1 <FieldType | int>,' +
    'Line: 1 <Identifier | id>,' +
    'Line: 1 <Comment | // hi>,' +
    'Line: 2 <Semicolon | ;>,' +
    'Line: 2 <FieldType | int>,' +
    'Line: 2 <Identifier | date>,' +
    'Line: 2 <Semicolon | ;>,' +
    'Line: 2 <FieldType | int>,' +
    'Line: 2 <Identifier | weight>,' +
    'Line: 2 <Semicolon | ;>,' +
    'Line: 2 <RightBrace | }>,' +
    'Line: 2 <Comment | /* this is a \n comment */>,' +
    'Line: 3 <TableType | Dimension>,' +
    'Line: 3 <Identifier | date>,' +
    'Line: 3 <LeftBrace | {>,' +
    'Line: 3 <FieldType | int>,' +
    'Line: 3 <Identifier | month>,' +
    'Line: 3 <Semicolon | ;>,' +
    'Line: 3 <RightBrace | }>,' +
    'Line: 3 <Eof | >';

  const lexer = new Lexer(input);
  t.is(lexer.tokens.toString(), expect);
});
