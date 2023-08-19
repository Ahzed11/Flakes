import { Expr, ExprVisitor, Link } from '../types/expr';
import { Field, Stmt, StmtVisitor, Table } from '../types/stmt';

export class MermaidTranspiler implements StmtVisitor<string>, ExprVisitor<void> {
  currentLinks: Link[];

  public generates(stmts: Stmt[]): string {
    let result = 'erDiagram\n\n';
    for (const stmt of stmts) {
      result += this.generate(stmt);
    }
    return result;
  }

  private generate(stmt: Stmt): string {
    return stmt.accept(this);
  }

  private evaluate(expr: Expr): void {
    if (expr !== null) {
      expr.accept(this);
    }
  }

  visitFieldStmt(stmt: Field): string {
    this.evaluate(stmt.link);
    return `\t${stmt.type.lexeme} ${stmt.name.lexeme}\n`;
  }

  visitLink(expr: Link): void {
    this.currentLinks.push(expr);
  }

  visitTableStmt(stmt: Table): string {
    this.currentLinks = [];
    let fieldsString = '';

    for (const field of stmt.fields) {
      fieldsString += this.generate(field);
    }

    let linkString = '';
    if (stmt.tableType.lexeme === 'Dimension') {
      for (const link of this.currentLinks) {
        linkString = `${stmt.tableName.lexeme} ||--|{ ${link.tableName.lexeme}:${link.fieldName.lexeme}\n`;
      }
    }

    return `${linkString}${stmt.tableName.lexeme} {\n${fieldsString}}\n\n`;
  }
}
