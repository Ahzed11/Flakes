import test from "ava";
import { Lexer } from './lexer';
import { Parser } from './parser';
test("simple", (t) => {
  const input = "Fact apport { int id; int date; int weight; } Dimension date {int month;}"
  const expect = "Fact apport {\n" +
    "\tint id;\n" +
    "\tint date;\n" +
    "\tint weight;\n" +
    "},Dimension date {\n" +
    "\tint month;\n" +
    "}";

  const lexer = new Lexer(input);
  const parser = new Parser(lexer.tokens);
  t.is(parser.statements.toString(), expect);
})
