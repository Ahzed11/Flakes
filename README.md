# Flakes

Language and library to create datawarehouse diagrams and schemas.

## Example
This input
```
Fact purchase {
  int id;
  int item;
  int price;
  int customer;
}

Dimension customer {
  int id -> purchase.customer;
  text name;
}

Dimension item {
  int id -> purchase.item;
  text name;
}
```
will produce this ouptut
```mermaid
erDiagram

purchase {
        int id
        int item
        int price
        int customer
}

customer ||--|{ purchase:customer
customer {
        int id
        text name
}

item ||--|{ purchase:item
item {
        int id
        text name
}

```

later on the language should support the transpilation to SQL.
