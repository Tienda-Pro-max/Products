```mermaid
erDiagram
    User ||--o{ Order : places
    User ||--o{ Address : has
    User ||--o{ Review : writes
    User {
        int id PK
        string username
        string email
        string password
        string role
        datetime created_at
        datetime updated_at
    }

    Address ||--o{ Order : used_in
    Address {
        int id PK
        int user_id FK
        string street
        string city
        string state
        string country
        string postal_code
        boolean is_default
    }

    Order ||--|{ OrderItem : contains
    Order {
        int id PK
        int user_id FK
        int address_id FK
        string status
        decimal total_amount
        datetime order_date
        string payment_method
        string payment_status
    }

    OrderItem {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal unit_price
    }

    Product ||--o{ OrderItem : included_in
    Product ||--o{ Review : receives
    Product ||--o{ ProductImage : has
    Product ||--o{ ProductCategory : belongs_to
    Product {
        int id PK
        string name
        string description
        decimal price
        int stock
        int category_id FK
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    Category ||--o{ Product : contains
    Category {
        int id PK
        string name
        string description
        int parent_id FK
    }

    ProductImage {
        int id PK
        int product_id FK
        string image_url
        boolean is_main
    }

    Review {
        int id PK
        int user_id FK
        int product_id FK
        int rating
        string comment
        datetime created_at
    }
```

## Descripción de las Tablas

### User
- Almacena información de los usuarios del sistema
- Campos principales: id, username, email, password, role
- Relaciones: Orders, Addresses, Reviews

### Address
- Direcciones de envío de los usuarios
- Campos principales: id, user_id, street, city, state, country, postal_code
- Relaciones: User, Orders

### Order
- Pedidos realizados por los usuarios
- Campos principales: id, user_id, address_id, status, total_amount, order_date
- Relaciones: User, Address, OrderItems

### OrderItem
- Productos incluidos en cada pedido
- Campos principales: id, order_id, product_id, quantity, unit_price
- Relaciones: Order, Product

### Product
- Catálogo de productos de la tienda
- Campos principales: id, name, description, price, stock, category_id
- Relaciones: OrderItems, Reviews, ProductImages, Category

### Category
- Categorías de productos
- Campos principales: id, name, description, parent_id
- Relaciones: Products

### ProductImage
- Imágenes de los productos
- Campos principales: id, product_id, image_url, is_main
- Relaciones: Product

### Review
- Reseñas de productos por usuarios
- Campos principales: id, user_id, product_id, rating, comment
- Relaciones: User, Product 