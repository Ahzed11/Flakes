import { Link } from './expr';
import { Token } from './token';

export abstract class Stmt {
  public abstract accept<TR>(visitor: StmtVisitor<TR>): TR;
}

export interface StmtVisitor<TR> {
  visitTableStmt(stmt: Table): TR;

  visitFieldStmt(stmt: Field): TR;
}

export class Table extends Stmt {
  public readonly tableType: Token;
  public readonly tableName: Token;
  public readonly fields: Field[];

  constructor(tableType: Token, tableName: Token, fields: Field[]) {
    super();
    this.tableType = tableType;
    this.tableName = tableName;
    this.fields = fields;
  }

  public accept<TR>(visitor: StmtVisitor<TR>): TR {
    return visitor.visitTableStmt(this);
  }

  public toString(): string {
    let s = `${this.tableType.lexeme} ${this.tableName.lexeme} {\n`;
    s = this.fields.reduce((current, field) => current + `\t${field}\n`, s);
    return s + '}';
  }
}

export class Field extends Stmt {
  public readonly type: Token;
  public readonly name: Token;
  public readonly link: Link;

  constructor(type: Token, name: Token, link: Link) {
    super();
    this.type = type;
    this.name = name;
    this.link = link;
  }

  public accept<TR>(visitor: StmtVisitor<TR>): TR {
    return visitor.visitFieldStmt(this);
  }

  public toString(): string {
    let s = `${this.type.lexeme} ${this.name.lexeme}`;
    if (this.link !== null) s += ` -> ${this.link}`;
    return s + ';';
  }
}

