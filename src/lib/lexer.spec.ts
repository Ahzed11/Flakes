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
