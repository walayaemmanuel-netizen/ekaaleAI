# MAH Services Module

## Overview

The Services module manages service offerings on the MBONGI ATTI HATTE (MAH) platform. Services differ from products in that they are delivered/performed over time and often require specialist expertise or skills.

## Features

✨ **Core Service Features:**
- 👨‍💼 Service provider management and verification
- 📋 Service listing and categorization
- ⏰ Availability and scheduling
- 💳 Service pricing and quotation management
- ⭐ Service provider ratings and reviews
- 📅 Booking and appointment management
- 🔔 Service notifications and reminders
- 📊 Service provider analytics
- 🏆 Certification and badge management

## Directory Structure

```
services/
├── models/
│   ├── Service.js              # Service schema
│   ├── ServiceProvider.js       # Service provider schema
│   ├── ServiceBooking.js        # Booking/appointment schema
│   ├── ServiceCategory.js       # Service category schema
│   ├── ServiceReview.js         # Service review schema
│   └── Availability.js          # Availability/schedule schema
├── controllers/
│   ├── serviceController.js     # Service operations
│   ├── providerController.js    # Provider management
│   ├── bookingController.js     # Booking operations
│   ├── reviewController.js      # Review management
│   └── availabilityController.js# Availability management
├── services/
│   ├── serviceService.js        # Service business logic
│   ├── bookingService.js        # Booking logic
│   ├── notificationService.js   # Notification logic
│   └── paymentService.js        # Payment processing
├── routes/
│   └── serviceRoutes.js         # Service API routes
├── validators/
│   └── serviceValidator.js      # Input validation
├── jobs/
│   └── serviceReminders.js      # Scheduled reminders
└── README.md                    # This file
```

## API Endpoints

### Services

#### Get All Services
```
GET /api/services
Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 10)
  - category: string
  - provider: string (filter by provider)
  - minPrice: number
  - maxPrice: number
  - rating: number (minimum rating)
  - search: string
Response: { data: [...], total, page, pages }
```

#### Get Service by ID
```
GET /api/services/:id
Response: {
  id, name, description, category, provider,
  price, rating, reviews, availability, images
}
```

#### Create Service (Provider)
```
POST /api/services
Body: {
  name: string,
  description: string,
  category: string,
  price: number,
  duration: number (in minutes),
  images: [string],
  tags: [string],
  isActive: boolean
}
Response: { id, name, ... }
```

#### Update Service (Provider)
```
PUT /api/services/:id
Body: { name?, description?, price?, duration?, availability? }
Response: { id, name, ... }
```

#### Delete Service (Provider)
```
DELETE /api/services/:id
Response: { success: true }
```

### Service Bookings

#### Create Booking
```
POST /api/services/:id/bookings
Body: {
  userId: string,
  startDate: Date,
  startTime: string (HH:MM),
  duration: number (minutes),
  notes: string,
  specialRequests: string
}
Response: {
  id, service, provider, customer,
  scheduledFor, duration, status, totalPrice
}
```

#### Get Bookings
```
GET /api/services/bookings
Query: { status, provider, customer, dateFrom, dateTo }
Response: [{ id, service, scheduledFor, status, ... }]
```

#### Update Booking Status
```
PUT /api/services/bookings/:id/status
Body: { status: 'confirmed' | 'completed' | 'cancelled' }
Response: { id, status, updatedAt }
```

#### Cancel Booking
```
POST /api/services/bookings/:id/cancel
Body: { reason: string }
Response: { success: true, refundAmount }
```

### Service Providers

#### Get Provider Profile
```
GET /api/services/providers/:id
Response: {
  id, name, bio, skills, certifications,
  rating, servicesCount, bookingsCount, profileImage
}
```

#### Update Provider Profile
```
PUT /api/services/providers/:id
Body: {
  bio: string,
  skills: [string],
  profileImage: string,
  bankDetails: object
}
Response: { id, name, bio, ... }
```

#### Get Provider Availability
```
GET /api/services/providers/:id/availability
Query: { dateFrom, dateTo }
Response: {
  availableSlots: [
    { date, startTime, endTime, booked },
    ...
  ]
}
```

#### Set Provider Availability
```
POST /api/services/providers/:id/availability
Body: {
  startDate: Date,
  endDate: Date,
  startTime: string,
  endTime: string,
  daysOfWeek: [0-6],
  breakTime: { startTime, endTime }
}
Response: { success: true }
```

### Service Reviews

#### Get Reviews
```
GET /api/services/:id/reviews
Query: { page, limit }
Response: { data: [...], total, averageRating }
```

#### Add Review
```
POST /api/services/:id/reviews
Body: {
  bookingId: string,
  rating: number (1-5),
  comment: string
}
Response: { id, rating, comment, author, createdAt }
```

### Service Categories

#### Get All Categories
```
GET /api/services/categories
Response: [{ id, name, icon, description, servicesCount }]
```

## Database Models

### Service Model
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  category: ObjectId (ref: ServiceCategory),
  provider: ObjectId (ref: ServiceProvider),
  price: Number,
  duration: Number, // in minutes
  images: [String],
  tags: [String],
  rating: Number,
  reviewCount: Number,
  bookingCount: Number,
  active: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### ServiceProvider Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  bio: String,
  skills: [String],
  certifications: [{ name, issuer, expiryDate }],
  profileImage: String,
  rating: Number,
  reviewCount: Number,
  totalBookings: Number,
  completedBookings: Number,
  responseTime: Number, // in minutes
  verified: Boolean,
  verificationDate: Date,
  bankDetails: Object,
  createdAt: Date
}
```

### ServiceBooking Model
```javascript
{
  _id: ObjectId,
  service: ObjectId (ref: Service),
  provider: ObjectId (ref: ServiceProvider),
  customer: ObjectId (ref: User),
  scheduledFor: Date,
  duration: Number,
  status: String, // 'pending', 'confirmed', 'completed', 'cancelled'
  notes: String,
  specialRequests: String,
  totalPrice: Number,
  paymentStatus: String, // 'pending', 'completed', 'refunded'
  rating: Number,
  review: String,
  cancelledBy: String, // 'provider' or 'customer'
  cancellationReason: String,
  refundAmount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Business Logic

### Booking Management
- Automatic confirmation workflow
- Automatic reminder notifications (24h, 1h before)
- Cancellation with refund logic
- Rating and review after completion
- Conflict detection and prevention

### Provider Management
- Verification process for new providers
- Rating and review system
- Availability scheduling
- Earnings tracking and payouts
- Performance metrics

### Pricing
- Dynamic pricing based on demand
- Seasonal pricing adjustments
- Promotional codes and discounts
- Package pricing
- Referral discounts

## Integration Points

- **Users**: Service providers and customers
- **Payments**: Payment processing for bookings
- **Wallet**: RUPIA points earning from bookings
- **Referrals**: Referral rewards for service bookings
- **Notifications**: Email/SMS reminders for bookings
- **Ratings**: Service provider ratings and reviews

## Error Handling

Common error responses:
- `400 Bad Request` - Invalid input data
- `404 Not Found` - Service or booking not found
- `409 Conflict` - Time slot not available
- `422 Unprocessable Entity` - Booking validation failed
- `500 Internal Server Error` - Server error

## Example Usage

### Search Services
```javascript
const response = await fetch('/api/services?category=plumbing&minPrice=500&maxPrice=5000');
const { data } = await response.json();
```

### Book a Service
```javascript
const booking = await fetch('/api/services/123/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user-456',
    startDate: '2026-09-20',
    startTime: '10:00',
    duration: 60,
    notes: 'Please bring all required tools'
  })
});
const { id, totalPrice } = await booking.json();
```

### Get Provider Schedule
```javascript
const availability = await fetch('/api/services/providers/789/availability?dateFrom=2026-09-15&dateTo=2026-09-30');
const { availableSlots } = await availability.json();
```

## Performance Considerations

- Cache popular services
- Index bookings by provider and customer
- Use pagination for large service lists
- Implement search indexing
- Monitor booking frequency
- Implement queue management for high-demand services

## Security

- Verify service providers before activation
- Validate booking times against availability
- Implement payment security
- Protect provider personal information
- Rate limit booking creation
- Implement RBAC for provider operations

## Testing

See `tests/services.test.js` for unit and integration tests.

```bash
npm test -- services
```

## Future Enhancements

- [ ] Video conferencing for virtual services
- [ ] Service package management
- [ ] Recurring bookings/subscriptions
- [ ] Waitlist management
- [ ] Group bookings
- [ ] Service rating insights for providers
- [ ] Automated invoice generation
- [ ] Insurance and liability coverage

---

**Last Updated:** September 15, 2026
**Version:** 1.0.0