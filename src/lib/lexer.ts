import { Token } from '../types/token';
import { TokenType } from '../types/tokenType';

export class Lexer {
  private source: string;
  public tokens: Token[] = [];
  public exceptions: Error[] = [];
  private line = 1;
  private start = 0;
  private current = 0;

  public constructor(source: string) {
    this.source = source;
    this.scanSymbols();
  }

  public scanSymbols() {
    while (!this.isAtEnd()) {
      this.start = this.current;
      try {
        this.scanSymbol();
      } catch (e) {
        this.exceptions.push(e);
      }
    }

    this.tokens.push(new Token(TokenType.Eof, '', this.line));
  }

  private scanSymbol() {
    const c: string = this.advance();
    switch (c) {
      case '{':
        this.addToken(TokenType.LeftBrace);
        break;
      case '}':
        this.addToken(TokenType.RightBrace);
        break;
      case ';':
        this.addToken(TokenType.Semicolon);
        break;
      case '.':
        this.addToken(TokenType.Dot);
        break;
      case '-':
        if (this.match('>')) {
          this.addToken(TokenType.RightArrow);
        } else {
          throw new Error('Unexpected character: ' + c);
        }
        break;
      case '\n':
        ++this.line;
        break;
      case '\t':
      case ' ':
        break;
      default:
        if (this.isAlpha(c)) {
          this.identifier();
        } else {
          throw new Error('Unexpected character: ' + c);
        }
        break;
    }
  }

  private advance(): string {
    return this.source.charAt(this.current++);
  }

  private peek(): string {
    return this.isAtEnd() ? '\0' : this.source.charAt(this.current);
  }
  private addToken(tokenType: TokenType) {
    const lexeme = this.source.substring(this.start, this.current);
    this.tokens.push(new Token(tokenType, lexeme, this.line));
  }

  private match(expected: string): boolean {
    if (this.isAtEnd()) return false;

    if (this.source.charAt(this.current) !== expected) return false;

    ++this.current;
    return true;
  }

  private static isDigit(c: string): boolean {
    return c >= '0' && c <= '9';
  }

  private isAlpha(c: string): boolean {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
  }

  private isAlphaNumeric(c: string): boolean {
    return this.isAlpha(c) || Lexer.isDigit(c);
  }

  private identifier() {
    while (this.isAlphaNumeric(this.peek())) {
      this.advance();
    }

    const lexeme = this.source.substring(this.start, this.current);
    let tokenType = TokenType.Identifier;
    switch (lexeme) {
      case 'Fact':
      case 'Dimension':
        tokenType = TokenType.TableType;
        break;
      case 'int':
      case 'float':
      case 'text':
        tokenType = TokenType.FieldType;
        break;
      default:
        break;
    }

    this.addToken(tokenType);
  }

  private isAtEnd(): boolean {
    return this.current >= this.source.length;
  }
}
