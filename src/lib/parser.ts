import { Link } from '../types/expr';
import { Field, Stmt, Table } from '../types/stmt';
import { Token } from '../types/token';
import { TokenType } from '../types/tokenType';

export class Parser {
  private readonly tokens: Token[];
  public readonly statements: Stmt[] = [];
  private current = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.parse();
  }

  private parse() {
    while (!this.isAtEnd()) {
      if (this.check(TokenType.Comment)) {
        this.advance();
        continue;
      }

      this.statements.push(this.table());
    }
  }

  private table(): Table {
    const tableType = this.consume(
      TokenType.TableType,
      'Expected a table type'
    );
    const tableName = this.consume(
      TokenType.Identifier,
      'Expected a table name'
    );

    this.consume(
      TokenType.LeftBrace,
      "Expected left brace after the table's name"
    );
    const block = this.block();

    return new Table(tableType, tableName, block);
  }

  private block(): Field[] {
    const fields: Field[] = [];

    while (!this.check(TokenType.RightBrace) && !this.isAtEnd()) {
      fields.push(this.field());
    }

    this.consume(TokenType.RightBrace, "Expect '}' to close the block");
    return fields;
  }

  private field(): Field {
    const fieldType = this.consume(TokenType.FieldType, 'Expected field type');
    const fieldName = this.consume(TokenType.Identifier, 'Expected field name');
    let link = null;
    let comment = null;

    if (this.match(TokenType.RightArrow)) {
      const tableName = this.consume(
        TokenType.Identifier,
        'Expected table name'
      );
      this.consume(TokenType.Dot, 'Expected a dot');
      const tableField = this.consume(
        TokenType.Identifier,
        'Expected table field'
      );
      link = new Link(tableName, tableField);
    }

    this.consume(TokenType.Semicolon, 'Expected semicolon');

    if (this.check(TokenType.Comment)) {
      comment = this.advance();
    }

    return new Field(fieldType, fieldName, link, comment);
  }

  private match(...types: TokenType[]): boolean {
    if (!types.some(this.check.bind(this))) return false;
    this.advance();
    return true;
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();

    throw new Error(message);
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;

    return this.peek().type == type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) ++this.current;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type == TokenType.Eof;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }
}
