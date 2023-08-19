import test from "ava";

import {Lexer} from "./lexer";

test("simple", (t) => {
  const input = "Fact apport { int id; int date; int weight; } Dimension date {int month;}"
  const expect = "Line: 1 <TableType | Fact>\n" +
    "Line: 1 <Identifier | apport>\n" +
    "Line: 1 <LeftBrace | {>\n" +
    "Line: 1 <FieldType | int>\n" +
    "Line: 1 <Identifier | id>\n" +
    "Line: 1 <Semicolon | ;>\n" +
    "Line: 1 <FieldType | int>\n" +
    "Line: 1 <Identifier | date>\n" +
    "Line: 1 <Semicolon | ;>\n" +
    "Line: 1 <FieldType | int>\n" +
    "Line: 1 <Identifier | weight>\n" +
    "Line: 1 <Semicolon | ;>\n" +
    "Line: 1 <RightBrace | }>\n" +
    "Line: 1 <TableType | Dimension>\n" +
    "Line: 1 <Identifier | date>\n" +
    "Line: 1 <LeftBrace | {>\n" +
    "Line: 1 <FieldType | int>\n" +
    "Line: 1 <Identifier | month>\n" +
    "Line: 1 <Semicolon | ;>\n" +
    "Line: 1 <RightBrace | }>\n" +
    "Line: 1 <Eof | >\n"

  const lexer = new Lexer();
  lexer.scanSymbols(input);
  t.is(lexer.tokensAsString(), expect)
})
