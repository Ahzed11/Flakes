import { Token } from './token';

export abstract class Expr {
  public abstract accept<TR>(visitor: IVisitor<TR>): TR;
}

export interface IVisitor<TR> {
  visitLink(expr: Link): TR;
}

export class Link extends Expr {
  public readonly TableName: Token;
  public readonly FieldName: Token;

  constructor(tableName: Token, fieldName: Token) {
    super();
    this.TableName = tableName;
    this.FieldName = fieldName;
  }

  public accept<TR>(visitor: IVisitor<TR>): TR {
    return visitor.visitLink(this);
  }

  public toString(): string {
    return `${this.TableName.lexeme}.${this.FieldName.lexeme}`;
  }
}

