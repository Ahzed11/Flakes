import { TokenType } from './tokenType';

export class Token {
  public readonly type: TokenType;
  public readonly lexeme: string;
  public readonly line: number;

  constructor(type: TokenType, lexeme: string, line: number) {
    this.type = type;
    this.lexeme = lexeme;
    this.line = line;
  }

  public toString(): string {
    return `Line: ${this.line} <${this.type} | ${this.lexeme}>`;
  }
}
