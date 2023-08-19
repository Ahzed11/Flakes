import { Token } from './token';

export abstract class Expr {
  public abstract accept<TR>(visitor: ExprVisitor<TR>): TR;
}

export interface ExprVisitor<TR> {
  visitLink(expr: Link): TR;
}

export class Link extends Expr {
  public readonly tableName: Token;
  public readonly fieldName: Token;

  constructor(tableName: Token, fieldName: Token) {
    super();
    this.tableName = tableName;
    this.fieldName = fieldName;
  }

  public accept<TR>(visitor: ExprVisitor<TR>): TR {
    return visitor.visitLink(this);
  }

  public toString(): string {
    return `${this.tableName.lexeme}.${this.fieldName.lexeme}`;
  }
}

