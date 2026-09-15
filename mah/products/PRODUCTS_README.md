# MAH Products Module

## Overview

The Products module manages all product and service catalog functionality for the MBONGI ATTI HATTE (MAH) platform. This includes product creation, inventory management, pricing, and product-related operations.

## Features

✨ **Core Product Features:**
- 📦 Product CRUD operations (Create, Read, Update, Delete)
- 🏷️ Product categorization and tagging
- 💰 Dynamic pricing and discount management
- 📊 Inventory tracking and stock management
- 🖼️ Product media management (images, videos)
- ⭐ Product ratings and reviews
- 🔍 Product search and filtering
- 📈 Product analytics and performance tracking

## Directory Structure

```
products/
├── models/
│   ├── Product.js           # Product schema
│   ├── Category.js          # Product category schema
│   ├── Review.js            # Product review schema
│   └── Inventory.js         # Inventory management schema
├── controllers/
│   ├── productController.js  # Product operations
│   ├── categoryController.js # Category management
│   ├── reviewController.js   # Review management
│   └── inventoryController.js# Inventory operations
├── services/
│   ├── productService.js     # Product business logic
│   ├── priceService.js       # Pricing logic
│   └── inventoryService.js   # Inventory logic
├── routes/
│   └── productRoutes.js      # Product API routes
├── validators/
│   └── productValidator.js   # Input validation
└── README.md                 # This file
```

## API Endpoints

### Products

#### Get All Products
```
GET /api/products
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 10)
  - category: string (filter by category)
  - search: string (search query)
  - sortBy: string (price, rating, newest)
Response: { data: [...], total, page, pages }
```

#### Get Product by ID
```
GET /api/products/:id
Response: { id, name, description, price, category, rating, reviews, inventory }
```

#### Create Product (Admin)
```
POST /api/products
Body: {
  name: string,
  description: string,
  category: string,
  price: number,
  costPrice: number,
  sku: string,
  images: [string],
  stock: number,
  active: boolean
}
Response: { id, name, ... }
```

#### Update Product (Admin)
```
PUT /api/products/:id
Body: { name?, description?, price?, category?, stock?, active? }
Response: { id, name, ... }
```

#### Delete Product (Admin)
```
DELETE /api/products/:id
Response: { success: true }
```

### Product Reviews

#### Get Product Reviews
```
GET /api/products/:id/reviews
Query Parameters: { page, limit }
Response: { data: [...], total, rating }
```

#### Add Review
```
POST /api/products/:id/reviews
Body: {
  rating: number (1-5),
  comment: string,
  userId: string
}
Response: { id, rating, comment, user, createdAt }
```

### Product Categories

#### Get All Categories
```
GET /api/products/categories
Response: [{ id, name, description, icon, products_count }]
```

#### Create Category (Admin)
```
POST /api/products/categories
Body: {
  name: string,
  description: string,
  icon: string
}
Response: { id, name, ... }
```

## Database Models

### Product Model
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  category: ObjectId (ref: Category),
  price: Number,
  costPrice: Number,
  sku: String,
  images: [String],
  rating: Number,
  reviewCount: Number,
  stock: Number,
  sold: Number,
  active: Boolean,
  vendor: ObjectId,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Category Model
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  icon: String,
  parentCategory: ObjectId,
  active: Boolean,
  createdAt: Date
}
```

### Review Model
```javascript
{
  _id: ObjectId,
  product: ObjectId (ref: Product),
  user: ObjectId (ref: User),
  rating: Number (1-5),
  comment: String,
  helpful: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Business Logic

### Price Management
- Dynamic pricing based on demand
- Discount calculation (percentage or fixed amount)
- Bulk pricing for wholesale orders
- Referral discount integration

### Inventory Management
- Stock level tracking
- Automatic low stock alerts
- Reservation management for orders
- Stock reorder point configuration

### Product Analytics
- Sales tracking
- Product performance metrics
- Customer engagement metrics
- Trending products identification

## Integration Points

- **Orders**: Products are linked to orders and transactions
- **Wallet**: Product purchases affect user wallet and RUPIA points
- **Referrals**: Referral rewards based on product sales
- **Reviews**: Customer reviews and ratings
- **Inventory**: Stock management and allocation

## Error Handling

Common error responses:
- `400 Bad Request` - Invalid input data
- `404 Not Found` - Product not found
- `409 Conflict` - Inventory conflict (out of stock)
- `500 Internal Server Error` - Server error

## Example Usage

### Fetch Products with Filters
```javascript
const response = await fetch('/api/products?category=electronics&page=1&limit=20');
const { data, total } = await response.json();
```

### Create New Product
```javascript
const newProduct = await fetch('/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Smart Watch',
    description: 'Advanced fitness tracking',
    category: 'electronics',
    price: 29999,
    costPrice: 15000,
    stock: 100,
    sku: 'SW-001'
  })
});
```

### Add Product Review
```javascript
const review = await fetch('/api/products/123/reviews', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    rating: 5,
    comment: 'Excellent product!',
    userId: 'user-123'
  })
});
```

## Performance Considerations

- Implement caching for frequently accessed products
- Use pagination for large product lists
- Index products by category, price, and rating
- Implement search indexing for better search performance
- Monitor product view analytics

## Security

- Only admins can create/update/delete products
- Validate all input data
- Sanitize product descriptions
- Rate limit product creation
- Implement RBAC for product management

## Testing

See `tests/products.test.js` for unit and integration tests.

```bash
npm test -- products
```

## Future Enhancements

- [ ] Product recommendations engine
- [ ] AI-powered product descriptions
- [ ] Variant management (sizes, colors)
- [ ] Product bundles and kits
- [ ] Subscription products
- [ ] Digital product delivery
- [ ] Product versioning
- [ ] Multi-vendor marketplace

---

**Last Updated:** September 15, 2026
**Version:** 1.0.0