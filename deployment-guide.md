# FamilySports App Deployment Guide

## 1. Website Hosting Options

### Option A: Vercel (Recommended for Next.js)
- Deploy directly from GitHub
- Automatic deployments on code changes
- Built-in database hosting
- Cost: Free tier available, ~$20/month for production

### Option B: AWS/Digital Ocean
- Full control over infrastructure
- Scalable as you grow
- Cost: ~$50-200/month depending on usage

### Option C: Netlify
- Easy deployment for static sites
- Good for frontend, need separate backend hosting
- Cost: Free tier available

## 2. Database Hosting
- **Supabase**: PostgreSQL with built-in auth (~$25/month)
- **PlanetScale**: MySQL alternative (~$29/month)
- **AWS RDS**: Full control (~$50/month)

## 3. Domain & SSL
- Purchase domain from Namecheap/GoDaddy (~$15/year)
- SSL certificates (free with most hosting providers)

## 4. Environment Variables for Production
```bash
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-secure-secret"
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
GOOGLE_MAPS_API_KEY="your-google-maps-key"
```
