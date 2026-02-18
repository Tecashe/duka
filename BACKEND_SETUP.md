# Duka Backend Setup Guide

## Prerequisites
- Node.js 18+ installed
- A Neon PostgreSQL database (or any PostgreSQL database)

## Quick Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Setup Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Then update the values:
```env
DATABASE_URL="your-neon-connection-string"
JWT_SECRET="generate-a-random-secret-key"
```

### 3. Setup Database
```bash
# Generate Prisma Client
pnpm db:generate

# Push schema to database (creates tables)
pnpm db:push
```

### 4. Run Development Server
```bash
pnpm dev
```

## Database Commands

- `pnpm db:generate` - Generate Prisma Client
- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Prisma Studio (visual database editor)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/session` - Get current session

### Server Actions (automatically handled by Next.js)
- Store operations in `lib/actions/store.ts`
- Product operations in `lib/actions/products.ts`
- Order operations in `lib/actions/orders.ts`

## Production Deployment

### Vercel Deployment
1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `JWT_SECRET`
4. Deploy!

### Database Migration
The app uses `prisma db push` for development. For production:
```bash
npx prisma migrate dev --name init
```

## Database Schema

- **User** - User accounts with authentication
- **Store** - Each user's online store with settings
- **Product** - Products belonging to stores
- **Order** - Customer orders with status tracking
- **OrderItem** - Individual items in orders
- **OrderTimeline** - Order status history

## Features Implemented

✅ User authentication with JWT sessions
✅ Store creation and management
✅ Product CRUD operations with stock tracking
✅ Order management with status workflow
✅ M-Pesa payment tracking
✅ Delivery/Pickup options
✅ Multi-tenant subdomain routing
✅ Real-time stock updates on orders

## Next Steps

1. Add actual M-Pesa integration (webhook handlers)
2. Add email notifications (Resend or similar)
3. Add SMS notifications (Africa's Talking)
4. Add image upload (Vercel Blob or Cloudinary)
5. Add analytics dashboard
6. Add subscription billing (Stripe or similar)
